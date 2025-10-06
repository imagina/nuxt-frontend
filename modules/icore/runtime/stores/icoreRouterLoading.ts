import {defineStore} from "pinia";

export const useIcoreRouterLoading = defineStore(
  "icore-router-loading",
  {
    state: () => ({
      isLoading: false,
    }),
    actions: {
      start ()
      {
        this.isLoading = true
      },
      stop ()
      {
        this.isLoading = false
      },
    },
  });
