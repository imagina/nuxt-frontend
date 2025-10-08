<script setup lang="ts">

const props = defineProps({
  showAddress: { type: Boolean, default: true },
  showIcons: { type: Boolean, default: true },
  addressWithIcon: { type: Boolean, default: true },
  addressIcon: { type: String, default: 'fa-regular fa-location-dot' },
  addressWithTitle: { type: Boolean, default: true },
  classIcons: { type: String, default: 'self-center mr-2 text-white' },
  classTitle: { type: String, default: 'font-bold mr-2' },
  classLinkAddress: { type: String, default: 'inline-block' },
  classComponent: { type: String, default: '' },
  withHyphen: { type: Boolean, default: true },
  layoutInline: { type: Boolean, default: false },
})

const ilocationStore = useIlocationStore()
const locatables = ilocationStore.getLocatables()
</script>

<template>
  <!-- Dirección  -->
  <div v-if="locatables.length" class="component-address" :class="classComponent">
    <template v-if="layoutInline">
      <div v-for="(locatable, index) in locatables" :key="index" class="flex">
        <i v-if="showIcons" :class="[addressIcon, classIcons]" />
        <a
          :href="`https://google.com.co/maps/search/${encodeURIComponent(locatable.address)}`"
          target="_blank"
          rel="noopener"
          :class="classLinkAddress"
          class="leading-snug"
        >
          <span v-if="addressWithTitle" :class="classTitle">{{ locatable.title }}</span>
          <span> {{ locatable.address }}.</span>
        </a>
      </div>
    </template>
    <div v-else class="flex">
      <i v-if="showIcons"  :class="[addressIcon,classIcons]" />
      <div class="content-address">
        <template v-for="(locatable, index) in locatables" :key="index">
          <span v-if="withHyphen && index>0">&nbsp;-&nbsp;</span>
          <a
            :href="`https://google.com.co/maps/search/${encodeURIComponent(locatable.address)}`"
            target="_blank"
            rel="noopener"
            :class="classLinkAddress"
            class="leading-snug"
          >
            <span v-if="addressWithTitle" :class="classTitle">{{ locatable.title }}</span>
            <span> {{ locatable.address }}.</span>
          </a>
        </template>
      </div>
    </div>


  </div>
</template>
