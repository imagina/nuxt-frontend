import {ref, shallowRef} from 'vue'
import {ipagePagesRepository} from '#ipage/utils/repository'
import type {PageData} from '#ipage/types/pages.js'

export async function usePageLoader (slug: string)
{
  const page = ref<PageData>()
  const PageComponent = shallowRef()

  const {data, error} = await useAsyncData(`page-${slug}`, () =>
    ipagePagesRepository.show(slug, {
      filter: {field: 'slug'},
      include: 'translations'
    })
  )

  if (error.value)
  {
    if (error.value?.statusCode === 404)
    {
      throw createError({statusCode: 404, statusMessage: 'Page Not Found'})
    }
    throw createError({statusCode: 500, statusMessage: 'Unexpected Error'})
  }

  page.value = data.value?.data

  // Get all available component files in this folder
  const components = import.meta.glob('@/pages/*.vue')
  const componentPath = `/pages/page-${page.value?.id}.vue`

  if (components[componentPath])
  {
    PageComponent.value = defineAsyncComponent(
      components[componentPath] as unknown as () => Promise<Component>
    )
  } else
  {
    PageComponent.value = defineAsyncComponent(() => import('#ipage/pages/default-page.vue'))
  }

  return {page, PageComponent}
}
