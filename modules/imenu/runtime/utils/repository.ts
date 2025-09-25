// import type {Menu} from "#imenu/types/menus";

// const baseUrl = '/imenu/v1'

// export const imenuMenusRepository = {
//   async show(id: string | number, params: Record<string, any> = {}): Promise<{ data: Menu }> {
//     const { $apiFetch } = useNuxtApp()
//     return $apiFetch<{ data: Menu }>(`${baseUrl}/menus/${id}`, {
//       method: 'GET',
//       params: params
//     })
//   }
// }


import type {Menu} from "#imenu/types/menus";

export const imenuMenusRepository = {
  async show(id: string | number, params: Record<string, unknown> = {}): Promise<{ data: Menu }> {
    const baseUrl = '/imenu/v1'

    return await $fetch(`/api/proxy${baseUrl}/menus/${id}`, {
      method: 'GET',
      query: {...params}
    })
  }
}


