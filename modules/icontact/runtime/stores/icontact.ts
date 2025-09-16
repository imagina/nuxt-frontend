import {defineStore} from "pinia";
import type {Item} from "#icontact/types/contact";
import {icontactItemsRepository} from "#icontact/utils/repository";

export const useIcontactStore = defineStore(
  "icontact-items",
  {
    state: () => ({
      items: [] as Item[],
      loaded: false,
    }),

    getters: {
      get: (state) =>
      {
        return state.items
      },
    },

    actions: {
      async fetchGlobalContacts ()
      {
        const {data} = await icontactItemsRepository.index({
          include: 'translations',
        });
        console.log(data)
        this.items = data;
        this.loaded = true;
      },
    },
  });
