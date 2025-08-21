import type {Menu, MenuIndexResponse} from "#imenu/types/menus";

const baseUrl = '/imenu/v1'

export const imenuMenusRepository = {
  // Trae 1 menú por ID con sus items
  async show(id: number, params: Record<string, any> = {}): Promise<{ data: Menu }> {
    const { $apiFetch } = useNuxtApp()
    return $apiFetch<{ data: Menu }>(`${baseUrl}/menus/${id}`, {
      method: 'GET',
      params: { include: 'menuItems', ...params }
    })
  },

  // Index: lista de menús (sin items)
  async index(params: Record<string, any> = {}): Promise<MenuIndexResponse> {
    const { $apiFetch } = useNuxtApp()
    return $apiFetch<MenuIndexResponse>(`${baseUrl}/menus`, {
      method: 'GET',
      params
    })
  }
}

/* export const imenuMenusRepository = {
  async show (criteria: string, params = {}): Promise<{ data: Menu }>
  {
    const {$apiFetch} = useNuxtApp()
    return $apiFetch<{ data: Menu }>(
      `${baseUrl}/menus/${criteria}`, {method: 'GET', params})
  },
}
*/
