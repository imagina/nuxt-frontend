import { defineEventHandler, getRouterParam, getRequestURL, readBody } from 'h3'
import { cachedEventHandler } from 'nitropack/runtime'
import { $fetch } from 'ofetch'
import { useRuntimeConfig } from '#imports'

const proxyHandler = defineEventHandler(async (event) => {
  const { public: { apiBase } } = useRuntimeConfig()

  const path = getRouterParam(event, 'path') || ''
  const reqUrl = getRequestURL(event)
  const search = reqUrl.search || ''
  const target = `${apiBase!.replace(/\/$/, '')}/${path}${search}`

  const method = event.method || 'GET'

  let body = undefined
  if (method !== 'GET' && method !== 'HEAD') {
    body = await readBody(event)
  }


  return await $fetch(target, { method, body })
})

export default cachedEventHandler(proxyHandler, {
  maxAge: 60,
  getKey: (event) => {
    const path = getRouterParam(event, 'path') || ''
    const search = getRequestURL(event).search || ''
    return `${path}${search}`
  }
})
