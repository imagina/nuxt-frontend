<script setup>

const props = defineProps({
  showPhone: { type: Boolean, default: true },
  phoneWithIcon: { type: Boolean, default: true },
  showIcons: { type: Boolean, default: true },
  phoneIcon: { type: String, default: 'ri:whatsapp-line' },
  classIcons: { type: String, default: 'self-center mr-2' },
  classTitle: { type: String, default: 'font-bold' },
  classLinkPhone: { type: String, default: 'inline-block' },
  classComponent: { type: String, default: '' },
  withHyphen: { type: Boolean, default: true },
  filterText: { type: String, default: '' },
})

const icontactStore = useIcontactStore()
const allItems = computed(() => icontactStore.getItems('WHATSAPP') ?? []);

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
  <!-- Whatsapp -->
  <div v-if="items.length" class="component-whatsapp" :class="classComponent">
    <template v-if="layoutInline">
      <div v-for="(item, index) in items" :key="index" class="flex">
        <div class="icon-whatsapp">
          <Icon v-if="showIcons" :name="phoneIcon" :class="classIcons" />
        </div>
        <a aria-label="whatsapp" rel="noopener" :href="`https://wa.me/+${item.countryCode}${item.value}?text=${item.message}`" target="_blank" :class="classLinkPhone">
          <span>+{{ item.countryCode }}</span> {{ item.value }}
        </a>
      </div>
    </template>
    <div v-else class="flex">
      <div class="icon-whatsapp">
        <Icon v-if="showIcons" :name="phoneIcon" :class="classIcons" />
      </div>
      <div class="content-whatsapp">
        <template v-for="(item, index) in items" :key="index">
          <span v-if="withHyphen && index>0">&nbsp;-&nbsp;</span>
          <a aria-label="whatsapp" rel="noopener" :href="`https://wa.me/+${item.countryCode}${item.value}?text=${item.message}`" target="_blank" :class="classLinkPhone">
            <span>+{{ item.countryCode }}</span> {{ item.value }}
          </a>
        </template>
      </div>
    </div>
  </div>
</template>
