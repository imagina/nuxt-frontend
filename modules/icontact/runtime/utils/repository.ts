import type {Item} from "#icontact/types/contact";

const baseUrl = '/icontact/v1'

export const icontactItemsRepository = {
  async index (params: Record<string, any> = {}): Promise<{ data: Item[] }>
  {
    const {$apiFetch} = useNuxtApp()
    return $apiFetch<{ data: Item[] }>(`${baseUrl}/items`, {
      method: 'GET',
      params: params
    })
  }
}
