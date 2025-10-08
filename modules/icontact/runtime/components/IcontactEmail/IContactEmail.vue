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
})
const icontactStore = useIcontactStore()
const items = computed(() => icontactStore.getItems('EMAIL'))

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
