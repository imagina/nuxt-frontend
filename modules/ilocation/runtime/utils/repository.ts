import type {Locatable} from "#ilocation/types/locatable";

const baseUrl = '/ilocation/v1'

export const ilocationLocatablesRepository = {
  async index (params: Record<string, any> = {}): Promise<{ data: Locatable[] }>
  {
    return $fetch<{ data: Locatable[] }>(`/api/proxy${baseUrl}/locatables`, {
      method: 'GET',
      params: params
    })
  }
}
