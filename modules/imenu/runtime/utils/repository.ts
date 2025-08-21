import type {Menu} from "#imenu/types/menus";

const baseUrl = '/imenu/v1'

export const imenuMenusRepository = {
  async show(id: string | number, params: Record<string, any> = {}): Promise<{ data: Menu }> {
    const { $apiFetch } = useNuxtApp()
    return $apiFetch<{ data: Menu }>(`${baseUrl}/menus/${id}`, {
      method: 'GET',
      params: params
    })
  }
}
