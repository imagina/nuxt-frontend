import type {PageData} from "#iblog/types/pages";

const baseUrl = '/iblog/v1'

export const iblogPostsRepository = {
  async show (slug: string, params = {}): Promise<{ data: PageData }>
  {
    const {$apiFetch} = useNuxtApp()
    return $apiFetch<{ data: PageData }>(
      `${baseUrl}/posts/${slug}`, {method: 'GET', params})
  },

  async index (slug: string, params = {}): Promise<{ data: PageData }>
  {
    const {$apiFetch} = useNuxtApp()
    return $apiFetch<{ data: PageData }>(
      `${baseUrl}/posts`, {method: 'GET', params})
  },
}

export const iblogCategoriesRepository = {
  async show (slug: string, params = {}): Promise<{ data: PageData }>
  {
    const {$apiFetch} = useNuxtApp()
    return $apiFetch<{ data: PageData }>(
      `${baseUrl}/categories/${slug}`, {method: 'GET', params})
  },

  async index (slug: string, params = {}): Promise<{ data: PageData }>
  {
    const {$apiFetch} = useNuxtApp()
    return $apiFetch<{ data: PageData }>(
      `${baseUrl}/categories`, {method: 'GET', params})
  },
}
