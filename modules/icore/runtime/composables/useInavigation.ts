import type {LocationQueryRaw} from 'vue-router'

export function useInavigation ()
{
  const localePath = useLocalePath()

  function goTo (route: { name: string, query: LocationQueryRaw })
  {
    const path = localePath(route)
    return navigateTo(path)
  }

  return {goTo}
}
