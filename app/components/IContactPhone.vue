<script setup>

const props = defineProps({
  phones: { type: Array, required: true },
  showPhone: { type: Boolean, default: true },
  phoneWithIcon: { type: Boolean, default: true },
  showIcons: { type: Boolean, default: true },
  phoneIcon: { type: String, default: 'fa6-solid:phone' },
  classIcons: { type: String, default: 'self-center mr-2 text-white' },
  classTitle: { type: String, default: 'font-bold' },
  classLinkPhone: { type: String, default: 'inline-block' },
  classComponent: { type: String, default: '' },
  withHyphenPhone: { type: Boolean, default: true },
})
</script>

<template>
  <!-- Teléfono -->
  <div v-if="showPhone && phones" class="component-phone">
    <div class="flex">
      <Icon v-if="showIcons" :name="phoneIcon" :class="classIcons" />
      <div class="content-phone">
        <template v-for="(phone, index) in phones" :key="index">
          <span v-if="withHyphenPhone && index>0">&nbsp;-&nbsp;</span>
          <a :href="`tel:${phone}`" target="_blank" :class="classLinkPhone">
            {{ phone }}
          </a>
        </template>
      </div>
    </div>
  </div>
</template>
