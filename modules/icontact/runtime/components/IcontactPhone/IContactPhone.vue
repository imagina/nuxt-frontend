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
})
const icontactStore = useIcontactStore()
const items = computed(() => icontactStore.getItems('PHONE'))
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
