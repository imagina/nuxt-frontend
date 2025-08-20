import { defineStore } from "pinia";
import type { Setting } from "#isetting/types/settings";
import { isettingSettingsRepository } from "#isetting/utils/repository";

export const useIsettingStore = defineStore("isettingStore", {
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
      const { data } = await isettingSettingsRepository.index();
      this.settings = data;
      this.loaded = true;
    },
  },
});
