import type {DateValidation} from "#irentcar/types/reservation";
import type {Office} from "#irentcar/types/office";
import type {Gamma} from "#irentcar/types/gamma";

const baseUrl = '/irentcar/v1'

export const irentcarReservationRepository = {
  async dateValidation (params: Record<string, unknown>): Promise<{ data: DateValidation }>
  {
    const {$apiFetch} = useNuxtApp()
    return $apiFetch<{ data: DateValidation }>(`${baseUrl}/reservations/validation/date`, {
      method: 'GET',
      params
    })
  },
  async availableGammas (params: Record<string, unknown>): Promise<{ data: Gamma[] }>
  {
    const {$apiFetch} = useNuxtApp()
    return $apiFetch<{ data: Gamma[] }>(`${baseUrl}/reservations/available/gammas`, {
      method: 'GET',
      params
    })
  }
}

export const irentcarOfficeRepository = {
  async index (params: Record<string, unknown> = {}): Promise<{ data: Office[] }>
  {
    const {$apiFetch} = useNuxtApp()
    return $apiFetch<{ data: Office[] }>(`${baseUrl}/offices`, {
      method: 'GET',
      params
    })
  }
}

