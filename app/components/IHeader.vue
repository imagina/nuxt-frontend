<script setup lang="ts">
const settingStore = useIsettingStore()
const logo = settingStore.get('isite::logo1')
const siteName = settingStore.get('isite::siteName')
const whatsapp = [ { callingCode: '+57', number: '3118060834', message: ''} ]


const authUser  = computed(() => useIuserAuthStore().user)

const isLoggedIn = computed(() => !!authUser.value?.id)
const items = computed<DropdownItem[]>(() =>
  isLoggedIn.value
    ? [
        { label: 'Cerrar sesión', icon: 'i-lucide:log-out', to: '/auth/logout' }
      ]
    : [
        { label: 'Ingresar',    icon: 'i-lucide:log-in', to: '/auth/login'},
      ]
)

</script>
<template>
  <header class="bg-white shadow-md">
    <UContainer>
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-4">
          <div class="logo">
            <NuxtLink to="/">
            <IMediaRender
              @click="$router.push('/')"
              :media="logo" alt="Logo"
              aspect-ratio="auto"
              :ui="{
                wrapper: 'cursor-pointer',
                container: 'h-[34px] w-[144px]',
                media: 'object-contain' }"
              />
            </NuxtLink>
          </div>
          <div class="pl-4 border-l border-gray-300 hidden sm:block">
            <IContactWhatsapp :whatsapp="whatsapp"
                              classIcons="flex items-center justify-center text-white"
                              classLinkPhone="inline-block text-[18px] text-w"/>
          </div>
        </div>
        <div class="menus">
          <div class="flex items-center">
            <div class="menu">
              <imenu-menu system-name="main-menu" :title="siteName"/>
            </div>
            <UDropdownMenu :items="items" :popper="{ placement: 'bottom-start', strategy: 'fixed' }">
              <UButton icon="i-material-symbols:person"  color="neutral"  variant="ghost" />
            </UDropdownMenu>
          </div>
        </div>
      </div>
    </UContainer>
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
