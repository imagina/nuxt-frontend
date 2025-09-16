<script setup>

const props = defineProps({
  phone: { type: Array, required: true },

  showPhone: { type: Boolean, default: true },
  phoneWithIcon: { type: Boolean, default: true },
  showIcons: { type: Boolean, default: true },
  phoneIcon: { type: String, default: 'fa-solid fa-phone' },
  classIcons: { type: String, default: 'self-center mr-2 text-white' },
  classTitle: { type: String, default: 'font-bold' },
  classLinkPhone: { type: String, default: 'inline-block' },
  classComponent: { type: String, default: '' },
  withHyphenPhone: { type: Boolean, default: true },
})
</script>

<template>
  <!-- Teléfono -->
  <div v-if="showPhone && phone" class="component-phone">
    <div class="flex">
      <i v-if="showIcons"  :class="[phoneIcon,classIcons]" />
      <div class="content-phone">
        <span></span>
        <template v-for="(phone, index) in phone" :key="index">
          <span v-if="withHyphenPhone && index>0">&nbsp;-&nbsp;</span>
          <a :href="`tel:${phone}`" target="_blank" :class="classLinkPhone">
            <span :class="classTitle">{{phone.title}}</span> {{ phone.value }}
          </a>
        </template>
      </div>
    </div>
  </div>
</template>
