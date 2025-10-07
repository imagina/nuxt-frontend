import type {PageData} from "#ipage/types/pages";

const baseUrl = '/ipage/v1'

export const ipagePagesRepository = {
  async index (params = {}): Promise<{ data: PageData[] }>
  {
    const {$apiFetch} = useNuxtApp()
    return $apiFetch<{ data: PageData[] }>(`${baseUrl}/pages`, {method: 'GET', params})
  },
  async show (slug: string, params = {}): Promise<{ data: PageData }>
  {
    const {$apiFetch} = useNuxtApp()
    return $apiFetch<{ data: PageData }>(
      `${baseUrl}/pages/${slug}`, {method: 'GET', params})
  }
}
