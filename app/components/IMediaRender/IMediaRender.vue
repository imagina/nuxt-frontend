<script setup lang="ts">
import type {IMediaRenderProps} from './IMediaRender'

type Effect =
  | 'none'
  | 'zoom'
  | 'grayscale'
  | 'tilt'
  | 'pan'

const props = defineProps<IMediaRenderProps & {
  effect?: Effect
}>()

const effect = computed<Effect>(() => props.effect ?? 'none')

/**
 * Clases para el contenedor (iframe/video)
 * y para la imagen (img) — separadas por si quieres matizar
 */
const mediaEffectWrapperClass = computed(() => {
  switch (effect.value) {
    case 'zoom':
      return 'transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.03]'
    case 'tilt':
      return 'transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.03] group-hover:-rotate-1'
    case 'pan':
      return 'transition-transform duration-700 ease-out will-change-transform group-hover:translate-x-1.5'
    case 'grayscale':
      return ''
    default:
      return ''
  }
})

const mediaEffectImgClass = computed(() => {
  switch (effect.value) {
    case 'zoom':
      return 'transition-transform duration-500 ease-out will-change-transform group-hover:scale-105'
    case 'tilt':
      return 'transition-transform duration-500 ease-out will-change-transform group-hover:scale-105 group-hover:-rotate-1'
    case 'pan':
      return 'transition-transform duration-700 ease-out will-change-transform group-hover:translate-x-2'
    case 'grayscale':
      return 'transition duration-500 ease-out will-change-filter filter grayscale group-hover:grayscale-0'
    default:
      return ''
  }
})
</script>

<template>
  <div :class="['w-full flex justify-center', ui?.wrapper]">
    <div :class="[
        aspectRatio || 'aspect-video',
        'group overflow-hidden',
        ui?.container,
        mediaEffectWrapperClass
      ]">
      <!-- YOUTUBE -->
      <iframe
        v-if="media?.youtubeId"
        class="w-full h-full"
        :class="ui?.media"
        :src="`https://www.youtube.com/embed/${media?.youtubeId}?rel=0&modestbranding=1`"
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        loading="lazy"
      />

      <!-- VIDEO LOCAL -->
      <video
        v-else-if="media?.isVideo"
        class="w-full h-full"
        :class="ui?.media"
        :autoplay="autoplayVideo"
        :loop="loopVideo"
        :muted="mutedVideo"
        :controls="withVideoControls"
        playsinline
        preload="metadata"
      >
        <source :src="media?.url" type="video/mp4">
        Tu navegador no soporta video HTML5.
      </video>

      <!-- IMAGEN -->
      <picture v-else class="w-full h-full block">
        <source
          v-if="media?.thumbnails?.extraLargeThumb"
          :srcset="media.thumbnails.extraLargeThumb"
          media="(min-width: 1280px)"
        >
        <source
          v-if="media?.thumbnails?.largeThumb"
          :srcset="media.thumbnails.largeThumb"
          media="(min-width: 1024px)"
        >
        <source
          v-if="media?.thumbnails?.mediumThumb"
          :srcset="media.thumbnails.mediumThumb"
          media="(min-width: 640px)"
        >
        <source
          v-if="media?.thumbnails?.smallThumb"
          :srcset="media.thumbnails.smallThumb"
          media="(max-width: 639px)"
        >

        <img
          :src="media?.url"
          :alt="alt"
          :title="title"
          class="w-full h-full"
          :class="[ui?.media, mediaEffectImgClass]"
          loading="lazy"
          decoding="async"
          :fetchpriority="fetchPriority"
          sizes="100vw"
        >
      </picture>
    </div>
  </div>
</template>
