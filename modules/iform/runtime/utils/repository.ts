import type {Form} from "#iform/types/forms";

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
  async create (body: Record<string, unknown>, headers: HeadersInit = {}): Promise<boolean>
  {
    const {$apiFetch} = useNuxtApp()
    return $apiFetch(`${baseUrl}/leads`, {
      method: 'POST',
      body,
      headers,
    })
  }
}
