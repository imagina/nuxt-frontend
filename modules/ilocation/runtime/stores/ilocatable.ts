import {defineStore} from "pinia";
import type {Locatable} from "#ilocation/types/locatable";
import {ilocationLocatablesRepository} from "#ilocation/utils/repository";

export const useIlocationStore = defineStore(
  "ilocation-locatables",
  {
    state: () => ({
      locatables: [] as Locatable[],
      loaded: false,
    }),

    getters: {
      getLocatables: (state) =>
        (systemName?: string): Locatable[] =>
        {
          let locatables = state.locatables
          if (systemName) locatables = locatables.filter(i => i.systemName === systemName)
          return locatables
        },
    },

    actions: {
      async fetchGlobalLocatables ()
      {
        const {data} = await ilocationLocatablesRepository.index({
          include: 'translations',
        });
        this.locatables = data;
        this.loaded = true;
      },
    },
  });
