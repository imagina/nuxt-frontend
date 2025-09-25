import {
  defineEventHandler,
  getRouterParam,
  getRequestURL,
  readBody,
  getRequestHeaders,
  setResponseHeaders,
} from 'h3'
import { cachedEventHandler } from 'nitropack/runtime'
import { $fetch } from 'ofetch'
import { useRuntimeConfig } from '#imports'

// Universal proxy with cache for all API calls
const proxyHandler = defineEventHandler(async (event) => {
  const {
    public: { apiBase },
  } = useRuntimeConfig()

  if (!apiBase) {
    throw new Error('API_BASE is not configured in runtimeConfig.public.apiBase')
  }

  // Build target URL
  const path = getRouterParam(event, 'path') || ''
  const reqUrl = getRequestURL(event)
  const search = reqUrl.search || ''
  const target = `${apiBase.replace(/\/$/, '')}/${path}${search}`

  // Get method and body
  const method = event.method || 'GET'
  let body = undefined
  if (!['GET', 'HEAD'].includes(method)) {
    body = await readBody(event)
  }

  // Forward request headers
  const incomingHeaders = getRequestHeaders(event)
  const { host, connection, ...forwardHeaders } = incomingHeaders

  // Make request to external API
  const response = await $fetch.raw(target, {
    method,
    body,
    headers: forwardHeaders as Record<string, string>,
  })

  // Forward response headers
  const resHeaders: Record<string, string> = {}
  for (const [key, value] of Object.entries(response.headers)) {
    if (!value) continue
    const lowerKey = key.toLowerCase()
    if (['cache-control', 'etag', 'last-modified'].includes(lowerKey)) {
      resHeaders[lowerKey] = Array.isArray(value) ? value.join(',') : value
    }
  }
  // Add default cache control if not present
  if (!resHeaders['cache-control']) {
    resHeaders['cache-control'] = 'max-age=60, stale-while-revalidate=120'
  }
  setResponseHeaders(event, resHeaders)

  // Return response data
  return response._data
})

// Export with cache (GET only)
export default cachedEventHandler(proxyHandler, {
  maxAge: 900, // Cache TTL in seconds
  staleMaxAge: 900, // Stale while revalidate time
  // Generate cache key from path and query
  getKey: (event) => {
    const path = getRouterParam(event, 'path') || ''
    const search = getRequestURL(event).search || ''
    return `${event.method}:${path}${search}`
  },
})
