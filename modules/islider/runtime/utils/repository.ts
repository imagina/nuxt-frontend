import type {Slider} from "#islider/types/slider";

const baseUrl = '/islider/v1'

export const isliderSliderRepository = {
  async show (criteria: string | number, params: Record<string, unknown> = {}): Promise<{ data: Slider }>
  {
    const {$apiFetch} = useNuxtApp()
    return $apiFetch<{ data: Slider }>(`${baseUrl}/sliders/${criteria}`, {
      method: 'GET',
      params: params,
      credentials: 'omit'
    })
  }
}
