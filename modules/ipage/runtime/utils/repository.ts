// import type {PageData} from "#ipage/types/pages";

// const baseUrl = '/ipage/v1'

// export const ipagePagesRepository = {
//   async show (slug: string, params = {}): Promise<{ data: PageData }>
//   {
//     const {$apiFetch} = useNuxtApp()
//     return $apiFetch<{ data: PageData }>(
//       `${baseUrl}/pages/${slug}`, {method: 'GET', params})
//   },
// }

import type { PageData } from "#ipage/types/pages";

const baseUrl = "/ipage/v1";

export const ipagePagesRepository = {
  async show(slug: string, params = {}): Promise<{ data: PageData }> {
    //const {$apiFetch} = useNuxtApp()

    return await $fetch(`/api/proxy${baseUrl}/pages/${slug}`, {
      method: "GET",
      query: { ...params },
    });
  },
};
