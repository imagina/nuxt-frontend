<script setup lang="ts">
import IContactWhatsapp from "#icontact/components/IcontactWhatsapp/IContactWhatsapp.vue";
import IContactSocial from "#icontact/components/IcontactSocial/IContactSocial.vue";
import type {DropdownMenuItem} from "#ui/components/DropdownMenu.vue";

const settingStore = useIsettingStore()
const logo = settingStore.get('isite::logo1')
const siteName = settingStore.get('isite::siteName')
const authUser  = computed(() => useIuserAuthStore().user)
const isLoggedIn = computed(() => !!authUser.value?.id)
const items = computed<DropdownMenuItem[]>(() =>
  isLoggedIn.value
    ? [
        { label: 'Mis Reservas', icon: 'i-lucide:calendar-check', to: '/rent-car/reservations' },
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
            <IContactSocial class-social="fixed right-0 top-[30%] z-[1000]"
                            class-link-social="transition hover:text-[26px] hidden sm:flex shadow-lg bg-white h-[30px] w-[35px] text-[20px]  lg:h-[45px] lg:w-[50px] lg:text-[25px] rounded-l-lg my-1 items-center justify-center"/>
            <IContactWhatsapp class-icons="flex items-center justify-center text-white"
                              class-link-phone="inline-block text-[18px] text-w"/>
          </div>
        </div>
        <div class="menus">
          <div class="flex items-center">
            <div class="menu">
              <imenu-menu system-name="main-menu" :title="siteName"/>
            </div>
            <UDropdownMenu :items="items" :popper="{ placement: 'bottom-start', strategy: 'fixed' }">
              <UButton icon="i-material-symbols:person"  color="neutral" variant="ghost" />
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
  font-size: 14px;
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
