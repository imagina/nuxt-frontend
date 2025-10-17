<script setup>

const props = defineProps({
  showEmail: {type: Boolean, default: true},
  showIcons: {type: Boolean, default: true},
  emailWithIcon: {type: Boolean, default: true},
  emailIcon: {type: String, default: 'fa-regular fa-envelope'},
  emailWithTitle: {type: Boolean, default: true},
  classIcons: {type: String, default: 'self-center mr-2 text-white'},
  classTitle: {type: String, default: 'font-bold'},
  classLinkEmail: {type: String, default: 'inline-block'},
  classComponent: { type: String, default: '' },
  withHyphen: {type: Boolean, default: true},
  layoutInline: { type: Boolean, default: false },
  filterText: { type: String, default: '' },
})

const icontactStore = useIcontactStore()
const allItems = computed(() => icontactStore.getItems("EMAIL") ?? []);

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
  <!-- Email -->
  <div v-if="items.length" class="component-email" :class="classComponent">
    <template v-if="layoutInline">
      <div v-for="(item, index) in items" :key="index.id" class="flex">
        <i v-if="showIcons" :class="[emailIcon,classIcons]"/>
        <a aria-label="email" :href="`mailto:${item.value}`" target="_blank" class="wrap-anywhere" :class="classLinkEmail"  rel="noopener">
          <span :class="classTitle">{{ item.title }}</span> {{ item.value }}
        </a>
      </div>
    </template>
    <div v-else class="flex">
      <i v-if="showIcons" :class="[emailIcon,classIcons]"/>
      <div class="content-email">
        <template v-for="(item, index) in items" :key="index">
          <span v-if="withHyphen && index>0">&nbsp;-&nbsp;</span>
          <a aria-label="email" :href="`mailto:${item.value}`" target="_blank" class="wrap-anywhere" :class="classLinkEmail"  rel="noopener">
            <span :class="classTitle">{{ item.title }}</span> {{ item.value }}
          </a>
        </template>
      </div>
    </div>
  </div>
</template>
