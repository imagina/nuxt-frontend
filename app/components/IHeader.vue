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
        </div>
        <div class="menus">
          <div class="flex items-center">
            <div class="menu">
              <imenu-menu system-name="main-menu" :title="siteName"/>
            </div>
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
</style>
