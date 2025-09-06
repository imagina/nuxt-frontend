import type {Form} from "#iform/types/forms";
import {toFormData} from '#iform/utils/toFormData'

const baseUrl = '/iform/v1'

export const iformFormsRepository = {
  async show (id: string | number, params: Record<string, unknown> = {}): Promise<{ data: Form }>
  {
    const {$apiFetch} = useNuxtApp()
    return $apiFetch<{ data: Form }>(`${baseUrl}/forms/${id}`, {
      method: 'GET',
      params: params
    })
  }
}

export const iformLeadsRepository = {
  async create (
    body: Record<string, unknown> | FormData,
    headers: HeadersInit = {}
  ): Promise<boolean>
  {
    const {$apiFetch} = useNuxtApp()
    const payload = body instanceof FormData ? body : toFormData(body)
    return $apiFetch(`${baseUrl}/leads`, {
      method: 'POST',
      body: payload,
      headers,
    })
  }
}
