<script lang="ts">
export const pageMeta = { layout: 'blank'}
</script>

<script setup lang="ts">
import type {PageData} from "#ipage/types/pages";

defineProps<{ page: PageData }>()
const settingStore = useIsettingStore()
const logoColbitumen = settingStore.get('isite::logo1')
const logoLaboratorio = settingStore.get('isite::logo2')
const logoAsfalcargo = settingStore.get('isite::logo3')
const logoComercializadora = settingStore.get('isite::logoIadmin')
const items = [
  {src: logoColbitumen, alt: "Colbitumen", href: "inicio-colbitumen",},
  {src: logoLaboratorio, alt: "Laboratorio Colbitumen", href: "inicio-laboratorio",},
  {src: logoComercializadora, alt: "Comercializadora Internacional", href: "inicio-comercializadora",},
  {src: logoAsfalcargo, alt: "Asfalcargo", href: "inicio-asfalcargo",},
  {outline: true, label: "TRABAJA CON NOSOTROS", href: "/trabaja-con-nosotros"},
];

</script>

<template>

  <div class="relative w-full py-20">
    <IMediaRender :media="page.files.mainimage"
                  :alt="page.title" aspect-ratio="auto"
                  :ui="{ media: 'absolute inset-0 w-full h-full object-cover' }"/>
    <div class="absolute inset-0  bg-black/50"></div>
    <!-- Contenido -->
    <div class="relative mx-auto max-w-7xl px-6 lg:px-12 h-full">
      <div class="h-full flex items-center justify-center">
        <div class="max-w-9/10 text-center text-white">
          <!-- Logo / título principal -->
          <div class="mb-5 text-center">
            <IMediaRender
              :media="logo"
              alt="logo"
              aspect-ratio="aspect-16/9"
              :ui="{
              wrapper: '',
              container: 'h-[120px]',
              media: '!h-[120px] object-contain ',
            }"
            />
          </div>

          <!-- Botones con logos -->
          <nav class="w-full space-y-5 max-w-[300px]">
            <template v-for="(item, i) in items" :key="i">
              <NuxtLink
                v-if="item.outline"
                :to="item.href || '#'"
                class="text-[20px] leading-[25px] text-center flex items-center justify-center rounded-full border-2 border-white/80 px-6 py-2 text-white font-semibold tracking-wide shadow-lg backdrop-blur hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                {{ item.label }}
              </NuxtLink>

              <NuxtLink
                v-else
                :to="item.href || '#'"
                class="group flex items-center justify-center rounded-full bg-white/95 shadow-xl ring-1 ring-black/10 backdrop-blur transition hover:translate-y-[-1px] hover:shadow-2xl"
              >
                <IMediaRender
                  :media="item.src"
                  alt="logo"
                  aspect-ratio="aspect-16/9"
                  :ui="{
                  wrapper: '  ',
                  container: ' h-[79px]',
                  media: ' object-contain',
                }"
                />
              </NuxtLink>
            </template>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>
