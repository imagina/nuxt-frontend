import {defineStore} from "pinia";
import type {Item, ItemTypes} from "#icontact/types/contact";
import {icontactItemsRepository} from "#icontact/utils/repository";

export const useIcontactStore = defineStore(
  "icontact-items",
  {
    state: () => ({
      items: [] as Item[],
      loaded: false,
      types: {
        'PHONE': 0,
        'WHATSAPP': 1,
        'EMAIL': 2,
        'FACEBOOK': 3,
        'TWITTER': 4,
        'INSTAGRAM': 5,
        'TIKTOK': 6,
        'YOUTUBE': 7,
        'LINKEDIN': 8,
        'GOOGLE': 9,
        'PINTEREST': 10,
        'FLICKR': 11,
      } as const satisfies Record<ItemTypes, number>
    }),

    getters: {
      getItems: (state) =>
        (typeName?: ItemTypes, systemName?: string): Item[] =>
        {
          let items = state.items
          if (typeName) items = items.filter(i => i.typeId === state.types[typeName])
          if (systemName) items = items.filter(i => i.systemName === systemName)
          return items
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
