import type {CreateReservationData, DateValidation, Reservation} from "#irentcar/types/reservation";
import type {Office} from "#irentcar/types/office";
import type {GammaOffice} from "#irentcar/types/gammaOffice";
import type {Type} from "#irentcar/types/static";
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
  async availableGammas (params: Record<string, unknown>): Promise<{ data: GammaOffice[] }>
  {
    const {$apiFetch} = useNuxtApp()
    return $apiFetch<{ data: GammaOffice[] }>(`${baseUrl}/reservations/available/gammas`, {
      method: 'GET',
      params
    })
  },
  async preview (body: CreateReservationData): Promise<{ data: Reservation }>
  {
    const {$authApiFetch} = useNuxtApp()
    return $authApiFetch<{ data: Reservation }>(`${baseUrl}/reservations/preview`, {
      method: 'POST',
      body: {attributes: body}
    })
  },
  async create (body: CreateReservationData): Promise<{ data: Reservation }>
  {
    const {$authApiFetch} = useNuxtApp()
    return $authApiFetch<{ data: Reservation }>(`${baseUrl}/reservations`, {
      method: 'POST',
      body: {attributes: body}
    })
  },
  async irentcarReservations (params: Record<string, unknown> = {}): Promise<{ data: Reservation[] }>
  {
    const {$authApiFetch} = useNuxtApp()
    return $authApiFetch<{ data: Reservation[] }>(`${baseUrl}/reservations`, {
      method: 'GET',
      params
    })
  },
  async irentcarDeleteReservation (criteria: number): Promise<void>
  {
    const {$authApiFetch} = useNuxtApp()
    return $authApiFetch<void>(`${baseUrl}/reservations/${criteria}`, {
      method: 'DELETE'
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

export const irentcarGammaRepository = {
  async index (params: Record<string, unknown> = {}): Promise<{ data: Gamma[] }>
  {
    const {$apiFetch} = useNuxtApp()
    return $apiFetch<{ data: Gamma[] }>(`${baseUrl}/gammas`, {
      method: 'GET',
      params
    })
  }
}

export const irentcarStaticRepository = {
  async indexVehiculeType (params: Record<string, unknown> = {}): Promise<{ data: Type[] }>
  {
    const {$apiFetch} = useNuxtApp()
    return $apiFetch<{ data: Type[] }>(`${baseUrl}/vehicle-types`, {
      method: 'GET',
      params
    })
  },
  async indexTransmissionType (params: Record<string, unknown> = {}): Promise<{ data: Type[] }>
  {
    const {$apiFetch} = useNuxtApp()
    return $apiFetch<{ data: Type[] }>(`${baseUrl}/transmission-types`, {
      method: 'GET',
      params
    })
  },
  async indexFuelType (params: Record<string, unknown> = {}): Promise<{ data: Type[] }>
  {
    const {$apiFetch} = useNuxtApp()
    return $apiFetch<{ data: Type[] }>(`${baseUrl}/fuel-types`, {
      method: 'GET',
      params
    })
  }
}

