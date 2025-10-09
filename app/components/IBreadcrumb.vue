<script setup lang="ts">
import { computed } from 'vue'
import type { BreadcrumbItem } from '@nuxt/ui'

interface Props {
  /* Layout */
  variant?: 'bar' | 'hero'
  align?: 'left' | 'center'
  showTrail?: boolean

  /* Contenido */
  title?: string
  crumbs?: BreadcrumbItem[]
  homeLabel?: string

  /* Apariencia (bar) */
  background?: string
  ui?: Record<string, any>

  /* Apariencia (hero) */
  height?: string
  overlay?: string
  containerClass?: string

  /* (opcional) si prefieres no usar slot y pasar el media directo */
  media?: any
  mediaUi?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'bar',
  align: 'center',
  showTrail: true,
  title: 'Página',
  homeLabel: 'Inicio',

  background: 'bg-gray-100 py-5',
  ui: () => ({}),

  height: 'h-[280px]',
  overlay: 'bg-black/50',
  containerClass: '',
  media: null,
  mediaUi: () => ({ media: 'absolute inset-0 w-full h-full object-cover' })
})

const items = computed<BreadcrumbItem[]>(() => {
  if (props.crumbs?.length) return props.crumbs
  return [{ label: props.homeLabel, to: '/' }, { label: props.title }]
})

const alignClasses = computed(() =>
  props.align === 'left' ? 'items-start text-left' : 'items-center text-center'
)
</script>

<template>
  <div>
    <div v-if="$slots.extraUp">
      <slot name="extraUp" />
    </div>

    <!-- HERO con fondo (por slot o media) -->
    <section v-if="variant === 'hero'" class="relative isolate overflow-hidden" :class="height">
      <!-- Fondo: 1) slot `background`  2) `media` (IMediaRender interno) -->
      <div class="absolute inset-0 -z-10">
        <slot name="background" />
        <IMediaRender
          v-if="!$slots.background && media"
          :media="media"
          aspect-ratio="auto"
          :ui="mediaUi"
        />
      </div>

      <!-- Overlay -->
      <div class="absolute inset-0 -z-10" :class="overlay"></div>

      <!-- Contenido -->
      <UContainer :class="['h-full flex', containerClass]">
        <div class="m-auto flex w-full max-w-4xl flex-col gap-3 text-white" :class="alignClasses">
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {{ title }}
          </h1>
          <UBreadcrumb
            v-if="showTrail"
            :items="items"
            :ui="{
              ol: align === 'center' ? 'justify-center' : '',
              link: 'text-white/90 hover:text-white',
              divider: 'text-white/70',
              ...ui
            }"
          />
        </div>
      </UContainer>
    </section>

    <!-- BARRA simple -->
    <div v-else :class="background">
      <UContainer>
        <div class="flex flex-col gap-2">
          <UBreadcrumb v-if="showTrail" :items="items" :ui="ui" />
        </div>
      </UContainer>
    </div>
  </div>
</template>

