import type { PageData } from '#ipage/types/pages'
import {ipagePagesRepository} from '#ipage/utils/repository'

export const useHomePages = () => {
  const key = 'switch-home-pages'
  const { data, pending, error } = useAsyncData<{ data: PageData[] }>(
    key,
    () => ipagePagesRepository.index({
      filter: { slug: { operator: 'like', value: '%inicio-%' } },
      include: 'translations,files',
      sort: 'createdAt'
    })
  )

  const homes = computed(() => data.value?.data ?? [])

  return { data, homes, pending, error }
}
