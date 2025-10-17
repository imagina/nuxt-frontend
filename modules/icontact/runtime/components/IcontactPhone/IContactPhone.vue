<script setup>

const props = defineProps({
  showPhone: { type: Boolean, default: true },
  phoneWithIcon: { type: Boolean, default: true },
  showIcons: { type: Boolean, default: true },
  phoneIcon: { type: String, default: 'fa-regular fa-phone' },
  classIcons: { type: String, default: 'self-center mr-2' },
  classTitle: { type: String, default: 'font-bold' },
  classLinkPhone: { type: String, default: 'inline-block' },
  classComponent: { type: String, default: '' },
  withHyphen: { type: Boolean, default: true },
  layoutInline: { type: Boolean, default: false },
  filterText: { type: String, default: '' },
})

const icontactStore = useIcontactStore()
const allItems = computed(() => icontactStore.getItems('PHONE') ?? []);

// normaliza para comparar sin acentos ni mayúsculas
const normalize = (s) =>
  (s ?? '')
    .toString()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()

// items filtrados por systemName (substring match)
const items = computed(() => {
  const list = (allItems.value || []).filter((it) => it?.isEnable == 1)
  const q = normalize(props.filterText?.trim())
  if (!q) return list
  return list.filter((it) => normalize(it?.systemName).includes(q))
})
</script>

<template>
  <!-- Phone -->
  <div v-if="items.length" class="component-phone" :class="classComponent">
    <template v-if="layoutInline">
      <div v-for="(item, index) in items" :key="index" class="flex">
        <i v-if="showIcons" :class="[phoneIcon,classIcons]"/>
        <a aria-label="phone" :href="`tel:${item.value}`" target="_blank" :class="classLinkPhone"  rel="noopener">
            <span :class="classTitle">{{item.title}}</span> <span>+{{ item.countryCode }}</span> {{ item.value }}
          </a>
      </div>
    </template>
    <div v-else class="flex">
      <i v-if="showIcons" :class="[phoneIcon,classIcons]"/>
      <div class="content-phone">
         <template v-for="(item, index) in items" :key="index">
          <span v-if="withHyphen && index>0">&nbsp;-&nbsp;</span>
          <a aria-label="phone" :href="`tel:${item.value}`" target="_blank" :class="classLinkPhone"  rel="noopener">
            <span :class="classTitle">{{item.title}}</span> <span>+{{ item.countryCode }}</span> {{ item.value }}
          </a>
        </template>
      </div>
    </div>
  </div>
</template>
