import type {CreateReservationData, DateValidation, Reservation} from "#irentcar/types/reservation";
import type {Office} from "#irentcar/types/office";
import type {GammaOffice} from "#irentcar/types/gammaOffice";
import type {Type} from "#irentcar/types/static";
import type {Gamma} from "#irentcar/types/gamma";
import type {GammaOfficeExtra} from "#irentcar/types/extra";

const baseUrl = '/irentcar/v1'

export const irentcarReservationRepository = {
  async dateValidation (params: Record<string, unknown>): Promise<{ data: DateValidation }>
  {
    return await $fetch(`/api/proxy${baseUrl}/reservations/validation/date`, {
      method: 'GET',
      query: params
    })
  },
  async availableGammas (params: Record<string, unknown>): Promise<{ data: GammaOffice[] }>
  {
    return await $fetch(`/api/proxy${baseUrl}/reservations/available/gammas`, {
      method: 'GET',
      query: params
    })
  },
  async preview (body: CreateReservationData): Promise<{ data: Reservation }>
  {
    return await $fetch(`/api/proxy${baseUrl}/reservations/preview`, {
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
  async index (params: Record<string, unknown> = {}): Promise<{ data: Reservation[] }>
  {
    return await $fetch(`/api/proxy${baseUrl}/reservations`, {
      method: 'GET',
      query: params
    })
  },
  async update (criteria: number, body: Record<string, unknown>, params: Record<string, unknown> = {}): Promise<void>
  {
    const {$authApiFetch} = useNuxtApp()
    return $authApiFetch(`${baseUrl}/reservations/${criteria}`, {
      method: 'PUT', body: {attributes: body}, params
    })
  }
}

export const irentcarOfficeRepository = {
  async index (params: Record<string, unknown> = {}): Promise<{ data: Office[] }>
  {
    return await $fetch(`/api/proxy${baseUrl}/offices`, {
      method: 'GET',
      query: params
    })
  }
}

export const irentcarGammaRepository = {
  async index (params: Record<string, unknown> = {}): Promise<{ data: Gamma[] }>
  {
    return await $fetch(`/api/proxy${baseUrl}/gammas`, {
      method: 'GET',
      query: params
    })
  }
}

export const irentcarStaticRepository = {
  async indexVehiculeType (params: Record<string, unknown> = {}): Promise<{ data: Type[] }>
  {
    return await $fetch(`/api/proxy${baseUrl}/vehicle-types`, {
      method: 'GET',
      query: params
    })
  },
  async indexTransmissionType (params: Record<string, unknown> = {}): Promise<{ data: Type[] }>
  {
    return await $fetch(`/api/proxy${baseUrl}/transmission-types`, {
      method: 'GET',
      query: params
    })
  },
  async indexFuelType (params: Record<string, unknown> = {}): Promise<{ data: Type[] }>
  {
    return await $fetch(`/api/proxy${baseUrl}/fuel-types`, {
      method: 'GET',
      query: params
    })
  }
}

export const irentcarGammaOfficeExtraRepository = {
  async index (params: Record<string, unknown> = {}): Promise<{ data: GammaOfficeExtra[] }>
  {
    return await $fetch(`/api/proxy${baseUrl}/gamma-office-extra`, {
      method: 'GET',
      query: params
    })
  }
}

