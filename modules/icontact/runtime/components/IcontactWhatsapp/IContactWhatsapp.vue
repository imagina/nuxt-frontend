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
})
const icontactStore = useIcontactStore()
const items = computed(() => icontactStore.getItems('WHATSAPP'))
</script>

<template>
  <!-- Whatsapp -->
  <div v-if="items.length" class="component-whatsapp">
    <div class="flex">
      <div class="icon-whatsapp">
        <Icon v-if="showIcons" :name="phoneIcon" :class="classIcons" />
      </div>
      <div class="content-whatsapp">
        <template v-for="(item, index) in items" :key="index">
          <span v-if="withHyphen && index>0">&nbsp;-&nbsp;</span>
          <a aria-label="whatsapp" :href="`https://wa.me/+${item.countryCode}${item.value}?text=${item.message}`" target="_blank" :class="classLinkPhone">
            <span>+{{ item.countryCode }}</span> {{ item.value }}
          </a>
        </template>
      </div>
    </div>
  </div>
</template>
