import type {Locatable} from "#ilocation/types/locatable";

const baseUrl = '/ilocation/v1'

export const ilocationLocatablesRepository = {
  async index (params: Record<string, any> = {}): Promise<{ data: Locatable[] }>
  {
    const {$apiFetch} = useNuxtApp()
    return $apiFetch<{ data: Locatable[] }>(`${baseUrl}/locatables`, {
      method: 'GET',
      params: params
    })
  }
}
