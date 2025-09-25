import type {Setting} from "#isetting/types/settings";

const baseUrl = '/isetting/v1'

export const isettingSettingsRepository = {
  async index (params = {}): Promise<{ data: Setting[] }>
  {
    return $fetch<{ data: Setting[] }>(
      `/api/proxy${baseUrl}/settings/get/all`, {method: 'GET', params})
  },
}
