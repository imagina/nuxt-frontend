<script setup>

const props = defineProps({
  showAddress: { type: Boolean, default: true },
  showIcons: { type: Boolean, default: true },
  addressWithIcon: { type: Boolean, default: true },
  addressIcon: { type: String, default: 'fa-regular fa-location-dot' },
  addressWithTitle: { type: Boolean, default: true },
  classIcons: { type: String, default: 'self-center mr-2 text-white' },
  classTitle: { type: String, default: 'font-bold' },
  classLinkAddress: { type: String, default: 'inline-block' },
  withHyphenAddress: { type: Boolean, default: true },
})

const ilocationStore = useIlocationStore()
const locatables = ilocationStore.getLocatables()
</script>

<template>
  <!-- Dirección  -->
  <div v-if="locatables.length" class="component-address">
    <div class="flex">
      <i v-if="showIcons"  :class="[addressIcon,classIcons]" />
      <div class="content-address">
        <template v-for="(locatable, index) in locatables" :key="index">
          <span v-if="withHyphenAddress && index>0">&nbsp;-&nbsp;</span>
          <a :href="`https://google.com.co/maps/search/${locatable.address}`" target="_blank" :class="classLinkAddress">
            <span :class="classTitle">{{locatable.title}}</span> {{ locatable.address }}
          </a>
        </template>
      </div>
    </div>
  </div>
</template>
