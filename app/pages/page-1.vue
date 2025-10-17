<script lang="ts">
export const pageMeta = {layout: 'blank'}
</script>

<script setup lang="ts">
import type { PageData } from '#ipage/types/pages'
defineProps<{ page: PageData }>()

const { homes } = useHomePages()
const settingStore = useIsettingStore()
const logoColbitumen = settingStore.get('isite::logo1')

const desktopNavProps = {
  orientation: 'vertical',
  variant: 'link',
  class: '!h-auto max-w-none mt-4',
  ui: {
    list: 'flex-col gap-1 w-full',
    link: 'text-[20px] leading-[25px] text-center flex items-center justify-center uppercase rounded-full border-2 border-white/80 py-2 px-10 text-white hover:text-white font-semibold tracking-wide shadow-lg backdrop-blur hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70',
    linkLabel: '!whitespace-normal !overflow-visible !text-clip break-words text-center',
  }
}

</script>

<template>

  <div class="relative w-full h-screen py-20">
    <IMediaRender :media="page?.files?.mainimage"
                  :alt="page?.title" aspect-ratio="auto"
                  :ui="{  wrapper: '', container:'', media: 'absolute inset-0  object-cover' }"/>
    <div class="absolute inset-0 h-full bg-black/50"></div>
    <!-- Contenido -->
    <div class="relative mx-auto max-w-7xl px-6 lg:px-12 h-full">
      <div class="h-full flex items-center justify-center">
        <div class="max-w-9/10 text-center text-white">
          <!-- Logo / título principal -->
          <div class="mb-10 text-center">
            <IMediaRender
              :media="logoColbitumen"
              alt="logo"
              aspect-ratio="auto"
              :ui="{
              wrapper: '',
              container: 'h-[70px]',
              media: ' object-contain ',
            }"
            />
          </div>
          <!-- Botones con logos -->
          <nav class="w-full space-y-5 max-w-[300px] mx-auto">
            <template v-for="(item, i) in homes" :key="i">
              <NuxtLink
                :to="item?.slug"
                class="group flex items-center justify-center rounded-full bg-white shadow-xl ring-1 ring-black/10 backdrop-blur transition hover:translate-y-[-1px] hover:shadow-2xl"
              >
                <IMediaRender
                  :media="item?.files?.mainimage"
                  :alt="item?.metaTitle"
                  aspect-ratio="auto"
                  :ui="{
                  wrapper: '  ',
                  container: ' h-[79px] rounded-full',
                  media: ' object-contain p-2',
                }"
                />
              </NuxtLink>
            </template>
          </nav>
          <div class="w-full space-y-5 max-w-[300px] mx-auto">
            <imenu-menu system-name="boton-principal" :with-drawer="false" :desktop-nav-props="desktopNavProps"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
