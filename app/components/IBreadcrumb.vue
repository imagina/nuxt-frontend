<script setup lang="ts">
import { computed } from 'vue'
import type { BreadcrumbItem } from '@nuxt/ui'

interface Props {
  variant?: 'bar' | 'hero'
  align?: 'left' | 'center'
  showTrail?: boolean

  title?: string
  crumbs?: BreadcrumbItem[]
  homeLabel?: string
  homeLink?: string

  background?: string
  ui?: Record<string, any>

  height?: string
  overlay?: string
  containerClass?: string

  media?: any
  mediaUi?: Record<string, any>

  extraBefore?: BreadcrumbItem[]
  extraAfter?: BreadcrumbItem[]
  includeTitle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'bar',
  align: 'center',
  showTrail: true,
  title: 'Página',
  homeLabel: 'Inicio',
  homeLink: '/',

  background: 'bg-gray-100 py-5',
  ui: () => ({}),

  height: 'h-[280px]',
  overlay: 'bg-black/50',
  containerClass: '',
  media: null,
  mediaUi: () => ({ media: 'absolute inset-0 w-full h-full object-cover' }),

  extraBefore: () => [],
  extraAfter: () => [],
  includeTitle: true
})

const items = computed<BreadcrumbItem[]>(() => {
  if (props.crumbs?.length) return props.crumbs
  const base: BreadcrumbItem[] = [{ label: props.homeLabel, to: props.homeLink }]
  if (props.extraBefore?.length) base.push(...props.extraBefore)
  if (props.includeTitle !== false) base.push({ label: props.title })
  if (props.extraAfter?.length) base.push(...props.extraAfter)
  return base
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

    <!-- HERO -->
    <section v-if="variant === 'hero'" class="relative isolate overflow-hidden" :class="height">
      <div class="absolute inset-0 -z-10">
        <slot name="background" />
        <IMediaRender
          v-if="!$slots.background && media"
          :media="media"
          aspect-ratio="auto"
          :ui="mediaUi"
        />
      </div>

      <div class="absolute inset-0 -z-10" :class="overlay"></div>

      <UContainer :class="['h-full flex', containerClass]">
        <div class="m-auto flex w-full max-w-4xl flex-col gap-3 text-white" :class="alignClasses">
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {{ title }}
          </h1>

          <!-- UI3: usa keys separatorIcon / link -->
          <UBreadcrumb
            v-if="showTrail"
            :items="items"
            :ui="{
              list: align === 'center' ? 'justify-center' : 'justify-start',
              link: 'text-white/90 hover:text-white',          // enlaces blancos
              separatorIcon: 'text-white',                     // chevron blanco
              ...ui
            }"
          >
            <!-- Deja pasar un separador custom si el consumidor lo define -->
            <template #separator>
              <slot name="separator" />
            </template>
          </UBreadcrumb>
        </div>
      </UContainer>
    </section>

    <!-- BARRA -->
    <div v-else :class="background">
      <UContainer>
        <div class="flex flex-col gap-2">
          <UBreadcrumb
            v-if="showTrail"
            :items="items"
            :ui="{
              link: 'text-gray-700 hover:text-gray-900',
              separatorIcon: 'text-gray-400',
              ...ui
            }"
          >
            <template #separator>
              <slot name="separator" />
            </template>
          </UBreadcrumb>
        </div>
      </UContainer>
    </div>

    <div v-if="$slots.extraDown">
      <slot name="extraDown" />
    </div>
  </div>
</template>
