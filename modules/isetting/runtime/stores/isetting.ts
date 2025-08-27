import {defineStore} from "pinia";
import type {Setting, SettingValue, MediaFile} from "#isetting/types/settings";
import {isettingSettingsRepository} from "#isetting/utils/repository";

export const useIsettingStore = defineStore(
  "isetting-settings",
  {
    state: () => ({
      settings: [] as Setting[],
      loaded: false,
    }),

    getters: {
      get: (state) =>
      {
        return (systemName: string): SettingValue | MediaFile | undefined =>
        {
          const setting = state.settings.find((s) => s.systemName === systemName)
          //etting not found
          if (!setting) return undefined
          // Translatable settings return the value as is (object with translations)
          if (setting.isTranslatable) return setting.value
          // Media settings return the main image file or undefined
          if (setting.dataConfig.isMedia) return setting.files?.mainimage
          // Other settings return the plain value
          return setting.plainValue
        }
      },
    },

    actions: {
      async fetchSettings ()
      {
        const {data} = await isettingSettingsRepository.index({
          include: 'translations,files',
        });
        this.settings = data;
        this.loaded = true;
      },
    },
  });
