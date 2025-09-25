import type {Item} from "#icontact/types/contact";

export const icontactItemsRepository = {
  async index (params: Record<string, unknown> = {}): Promise<{ data: Item[] }>
  {
    const baseUrl = '/icontact/v1'
    return await $fetch(`/api/proxy${baseUrl}/items`, {
      method: 'GET',
      query: params
    })
  }
}
