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
  withHyphenEmail: {type: Boolean, default: true},
})
const icontactStore = useIcontactStore()
const items = computed(() => icontactStore.getItems('EMAIL'))

</script>

<template>
  <!-- Email -->
  <div v-if="items.length" class="component-email">
    <div class="flex">
      <i v-if="showIcons" :class="[emailIcon,classIcons]"/>
      <div class="content-email">
        <template v-for="(item, index) in items" :key="index">
          <span v-if="withHyphenEmail && index>0">&nbsp;-&nbsp;</span>
          <a :href="`mailto:${item.value}`" target="_blank" class="wrap-anywhere" :class="classLinkEmail">
            <span :class="classTitle">{{ item.title }}</span> {{ item.value }}
          </a>
        </template>
      </div>
    </div>
  </div>
</template>
