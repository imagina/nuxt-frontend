import type {Setting} from "#isetting/types/settings";

const baseUrl = '/isetting/v1'

export const isettingMenusRepository = {
  async index (params = {}): Promise<{ data: Setting[] }>
  {
    const {$apiFetch} = useNuxtApp()
    return $apiFetch<{ data: Setting[] }>(
      `${baseUrl}/settings/get/all`, {method: 'GET', params})
  },
}
