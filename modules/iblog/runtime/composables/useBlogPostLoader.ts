import type { BlogPost } from '#iblog/types/pages'
import { iblogPostsRepository } from '#iblog/utils/repository'

export function useBlogPostLoader (slugPost: string, slugCategory?: string) {
  // objeto reactivo en lugar de ref(null)
  const post = reactive<Partial<BlogPost>>({})
  const hasPost = computed(() => Boolean((post as any).id))

  const pending = ref(true)
  const error = ref<any>(null)

  const load = async () => {
    pending.value = true
    error.value = null
    try {
      const res = await iblogPostsRepository.show(slugPost, {
        filter: { field: 'slug' },
        include: 'translations,files',
        categorySlug: slugCategory,
        category_slug: slugCategory
      })

      // Sobrescribe el objeto reactivo sin cambiar su referencia
      Object.assign(post, res.data as BlogPost)

      // SEO
      const t = post.title || post.es?.title || slugPost
      const desc =
        post.summary ||
        post.es?.summary ||
        (post as any).metaDescription ||
        post.es?.metaDescription ||
        ''
      const img = post.files?.mainimage?.url

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
  return { post, hasPost, pending, error, reload: load, _p }
}
