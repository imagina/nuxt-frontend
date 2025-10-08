import {ipagePagesRepository} from '#ipage/utils/repository'
import type {PageData} from '#ipage/types/pages'

function throwError (statusCode: 404 | 500): never
{
  const statusMessage = statusCode === 404 ? 'Page Not Found' : 'Unexpected Error';
  //showError({statusCode: code, statusMessage})
  throw createError({statusCode, statusMessage})
}

function setPageSeoMeta (page: PageData | undefined)
{

  const settingStore = useIsettingStore()
  const siteName = settingStore.get('isite::siteName') ?? ''

  useSeoMeta({
    // 🧭 Principales
    title: () => `${page?.title ?? ''} | ${siteName}`,
    description: () => page?.ogDescription ?? '',

    // 🧱 Open Graph
    ogTitle: () => page?.title ?? '',
    ogDescription: () => page?.ogDescription ?? '',
    ogImage: () => page?.files?.mainimage?.url ?? '',
    ogType: 'website',

    // 🐦 Twitter
    twitterTitle: () => page?.title ?? '',
    twitterDescription: () => page?.ogDescription ?? '',
    twitterImage: () => page?.files?.mainimage?.url ?? '',
    twitterCard: 'summary_large_image',
  })
}

export interface UsePageLoader {
  slug?: string
  keepLoading?: boolean
}

export async function usePageLoader (params?: UsePageLoader): Promise<{ page: PageData }>
{
  const route = useRoute()
  const getRouteBaseName = useRouteBaseName()
  const app = useNuxtApp()
  const slug = (params?.slug ?? route.params.slug ?? getRouteBaseName(route) ?? '').toString()
  if (!slug) throwError(404)

  //Request the page data
  const {data, error} = await useAsyncData(
    () => `page-loader-${slug}`,
    () => ipagePagesRepository.show(slug, {
      filter: {field: 'slug'},
      include: 'translations,files'
    })
  )

  //Handle Errors
  if (error.value?.statusCode == 404) throwError(error.value.statusCode)
  if (error.value) throwError(500)

  const page = data.value?.data//Get page data
  if (!page) throwError(404)
  //app.runWithContext(() => setPageSeoMeta(page))// Set the SEO
  if (!params?.keepLoading) useIcoreRouterLoading().stop()

  return {page}
}
