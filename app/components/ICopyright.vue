<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const settingStore = useIsettingStore()

const name =  settingStore.get('isite::siteName')

const props = defineProps({
  withIconCopyright: { type: Boolean, default: false },
  withTextCopyright: { type: Boolean, default: true },
  withYear: { type: Boolean, default: true },
  withTitleCopyright: { type: Boolean, default: true },
  withSiteName: { type: Boolean, default: true },
  classes: { type: String, default: 'flex justify-center items-center' },
})

const year = new Date().getFullYear()
const { t } = useI18n()

const siteName = computed(() => props.name)

// Traducciones
const copyrightTitle = ref('Copyright')
const copyrightText = ref('Todos los derechos reservados.')

</script>

<template>
  <ClientOnly>
    <p :class="`copyright ${classes}`" >
        <span v-if="withTitleCopyright"> {{ copyrightTitle }} &nbsp;</span>
        <Icon v-if="withIconCopyright" name="solar:copyright-linear" class="mr-1" />
        <span v-if="withYear"> {{ year }} &nbsp;</span>
        <span v-if="withSiteName"> {{ name }} </span>
        <span v-if="withTextCopyright">. {{ copyrightText }} </span>
    </p>
  </ClientOnly>
</template>
