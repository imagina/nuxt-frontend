<script setup lang="ts">
const settingStore = useIsettingStore()
const logo = settingStore.get('isite::logo1')
const whatsapp = [ { callingCode: '+57', number: '3118060834', message: ''} ]
</script>
<template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-4 sm:px-6 lg:px-10">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-4">
          <div class="logo ">
            <IMediaRender
              :media="logo" alt="Logo"
              aspect-ratio="auto"
              :ui="{
                wrapper: '',
                container: 'h-[34px] w-[144px]',
                media: 'object-contain' }"
              />
          </div>
          <div class="pl-4 border-l border-gray-300">
            <IContactWhatsapp :whatsapp="whatsapp"
                              classIcons="flex items-center justify-center text-white"
                              classLinkPhone="inline-block text-[18px] text-w"/>
          </div>
        </div>
        <div class="menu">
          <imenu-menu system-name="main-menu"/>
        </div>
      </div>
    </div>
  </header>
</template>
<style scoped>
@reference "~/assets/css/main.css";

.menu > :deep(nav) a  {
  color: var(--color-primary);
  text-transform: uppercase;
  font-weight: 600;
  font-style: SemiBold;
  font-size: 14px;
  letter-spacing: .2;
}
.menu > :deep(nav) a:hover {
  color: var(--color-secondary);
}
:deep(.component-whatsapp .flex) {
  @apply items-center justify-center gap-2;
}
:deep(.component-whatsapp .text-w span) {
  @apply font-bold;
}
:deep(.component-whatsapp .icon-whatsapp) {
  @apply h-[32px] w-[32px] rounded-full bg-whatsapp flex items-center justify-center;
}
</style>
