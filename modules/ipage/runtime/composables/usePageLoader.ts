import {ref, shallowRef} from 'vue'
import {ipagePagesRepository} from '#ipage/utils/repository'
import type {PageData} from '#ipage/types/pages.js'

export async function usePageLoader (slug: string)
{
  const page = ref<PageData>()
  const PageComponent = shallowRef()
  let pageMeta: Record<string, any> | undefined

  const {data, error} = await useAsyncData(`page-${slug}`, () =>
    ipagePagesRepository.show(slug, {
      filter: {field: 'slug'},
      include: 'translations,files'
    })
  )

  if (error.value)
  {
    if (error.value?.statusCode === 404)
    {
      showError({statusCode: 404, statusMessage: 'Page Not Found'})
    }
    showError({statusCode: 500, statusMessage: 'Unexpected Error'})
  }
  page.value = data.value?.data

  // Get all available component files in this folder
  const components = import.meta.glob('@/pages/*.vue')
  const componentPath = `/pages/page-${page.value?.id}.vue`

  if (components[componentPath])
  {
    const mod = await (components[componentPath] as () => Promise<any>)()
    pageMeta = mod.pageMeta
    PageComponent.value = defineAsyncComponent(() => Promise.resolve(mod.default))
  } else
  {
    PageComponent.value = defineAsyncComponent(() => import('#ipage/pages/default-page.vue'))
  }

  return {page, PageComponent, pageMeta}
}
