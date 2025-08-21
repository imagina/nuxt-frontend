<script setup lang="ts">
interface MediaFile {
  youtubeId?: string
  isImage?: boolean
  isVideo?: boolean
  url?: string
  thumbnails?: {
    smallThumb?: string
    mediumThumb?: string
    largeThumb?: string
    extraLargeThumb?: string
  }
}

const props = defineProps<{
  media: MediaFile | null
  alt?: string
  title?: string
  fetchPriority?: "high" | "low" | "auto"
  autoplayVideo?: boolean
  loopVideo?: boolean
  mutedVideo?: boolean
  withVideoControls?: boolean
  aspectRatio?: string // "aspect-video", "aspect-square", "aspect-[4/3]"
  ui?: {
    wrapper?: string        // contenedor externo
    container?: string      // div con aspect ratio
    media?: string          // img, video, iframe
  }
}>()
</script>

<template>
  <div :class="['w-full flex justify-center', ui?.wrapper]">
    <div :class="['w-full', aspectRatio || 'aspect-video', ui?.container]">
      <!-- YOUTUBE -->
      <iframe
        v-if="media?.youtubeId"
        class="w-full h-full object-contain rounded-2xl shadow"
        :class="ui?.media"
        :src="`https://www.youtube.com/embed/${media?.youtubeId}?rel=0&modestbranding=1`"
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        loading="lazy"
      ></iframe>

      <!-- VIDEO LOCAL -->
      <video
        v-else-if="media?.isVideo"
        class="w-full h-full object-contain rounded-2xl shadow"
        :class="ui?.media"
        :autoplay="autoplayVideo"
        :loop="loopVideo"
        :muted="mutedVideo"
        :controls="withVideoControls"
        playsinline
        preload="metadata"
      >
        <source :src="media?.url" type="video/mp4" />
        Tu navegador no soporta video HTML5.
      </video>

      <!-- IMAGEN -->
      <picture v-else class="w-full h-full">
        <source v-if="media?.thumbnails?.extraLargeThumb"
                :srcset="media.thumbnails.extraLargeThumb"
                media="(min-width: 1280px)" />
        <source v-if="media?.thumbnails?.largeThumb"
                :srcset="media.thumbnails.largeThumb"
                media="(min-width: 1024px)" />
        <source v-if="media?.thumbnails?.mediumThumb"
                :srcset="media.thumbnails.mediumThumb"
                media="(min-width: 640px)" />
        <source v-if="media?.thumbnails?.smallThumb"
                :srcset="media.thumbnails.smallThumb"
                media="(max-width: 639px)" />

        <img
          :src="media?.url"
          :alt="alt"
          :title="title"
          class="w-full h-full object-contain rounded-2xl shadow"
          :class="ui?.media"
          loading="lazy"
          decoding="async"
          :fetchpriority="fetchPriority"
          sizes="100vw"
        />
      </picture>
    </div>
  </div>
</template>
