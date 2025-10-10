import { iblogCategoriesRepository, iblogPostsRepository } from '#iblog/utils/repository'

export function useBlogCategoryLoader (slugCategory: string) {
  const category = ref<any>(null)
  const rawPosts = ref<any[]>([])
  const posts = computed(() => {
    const cid = Number(category.value?.id ?? -1)
    // cinturón y tirantes: filtramos por categoryId en cliente
    return rawPosts.value.filter(p => Number(p.categoryId) === cid)
  })

  const pending = ref(true)
  const error = ref<any>(null)

  const load = async (page = 1) => {
    pending.value = true
    error.value = null
    try {
      // 1) categoría por slug
      const catRes = await iblogCategoriesRepository.show(slugCategory, {
        filter: { field: 'slug' },
        include: 'translations,files'
      })
      category.value = catRes.data

      // 2) posts (enviamos varias variantes de filtro y luego filtramos por categoryId)
      const listRes = await iblogPostsRepository.index('', {
        include: 'translations,files',
        page,
        filter: {
          categoryId: category.value?.id,   // la que vemos en tu JSON
          category_id: category.value?.id,
          category: category.value?.id,
          categorySlug: slugCategory,
          category_slug: slugCategory
        }
      })
      const d: any = listRes.data
      rawPosts.value = Array.isArray(d) ? d : (d?.items || d?.posts || [])

      // SEO
      const t = category.value?.title || category.value?.es?.title || slugCategory
      const desc = category.value?.description || category.value?.es?.description || `Artículos de ${t}`
      const img = category.value?.files?.mainimage?.url

      useSeoMeta({
        title: t,
        ogTitle: t,
        description: desc,
        ogDescription: desc,
        twitterTitle: t,
        twitterDescription: desc,
        ogImage: img,
        twitterImage: img
      })
    } catch (e: any) {
      error.value = e
    } finally {
      pending.value = false
    }
  }

  const _p = load()
  return { category, posts, rawPosts, pending, error, reload: load, _p }
}
