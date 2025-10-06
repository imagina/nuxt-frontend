// plugins/router-loading.client.ts
import {useIcoreRouterLoading} from "#icore/stores/icoreRouterLoading";

export default defineNuxtPlugin(
  {
    name: 'IcoreRouterLoading',
    setup ()
    {
      const router = useRouter()
      const loadingStore = useIcoreRouterLoading()
      router.beforeEach(() => loadingStore.start())
      router.afterEach(() => setTimeout(loadingStore.stop, 3000))
      router.onError(() => loadingStore.stop())
    }
  })
