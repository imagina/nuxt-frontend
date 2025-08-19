import { defineStore } from "pinia";
import type { Setting } from "#isetting/types/settings";
import { isettingMenusRepository } from "#isetting/utils/repository";

export const useIsettingStore = defineStore("isetting", {
  state: () => ({
    settings: [] as Setting[],
    loaded: false,
  }),

  getters: {
    getBySystemName: (state) => {
      return (systemName: string): Setting | undefined =>
        state.settings.find((s) => s.systemName === systemName);
    },
  },

  actions: {
    async fetchSettings() {
      const { data } = await isettingMenusRepository.index();

      console.warn(">>>>>>> Settings fetched:", this.loaded); // Debug log
      this.settings = data;
      this.loaded = true;
    },
  },
});
