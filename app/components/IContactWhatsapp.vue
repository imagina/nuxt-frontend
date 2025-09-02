<script setup>

const props = defineProps({
  whatsapp: { type: Array, required: true },
  showPhone: { type: Boolean, default: true },
  phoneWithIcon: { type: Boolean, default: true },
  showIcons: { type: Boolean, default: true },
  phoneIcon: { type: String, default: 'ri:whatsapp-line' },
  classIcons: { type: String, default: 'self-center mr-2' },
  classTitle: { type: String, default: 'font-bold' },
  classLinkPhone: { type: String, default: 'inline-block' },
  classComponent: { type: String, default: '' },
  withHyphenPhone: { type: Boolean, default: true },
})
</script>

<template>
  <!-- Whatsapp -->
  <div v-if="showPhone && whatsapp" class="component-whatsapp">
    <div class="flex">
      <div class="icon-whatsapp">
        <Icon v-if="showIcons" :name="phoneIcon" :class="classIcons" />
      </div>
      <div class="content-whatsapp">
        <template v-for="(phone, index) in whatsapp" :key="index">
          <span v-if="withHyphenPhone && index>0">&nbsp;-&nbsp;</span>
          <a aria-label="whatsapp" :href="`https://wa.me/${phone.callingCode}${phone.number}?text=${phone.message}`" target="_blank" :class="classLinkPhone">
            <span>{{ phone.callingCode }}</span> {{phone.number }}
          </a>
        </template>
      </div>
    </div>
  </div>
</template>
