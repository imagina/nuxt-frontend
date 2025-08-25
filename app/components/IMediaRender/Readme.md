# IMediaRender Component

A flexible media renderer that supports **YouTube videos, local videos, and responsive images**.

---

## Props

- `media` **(MediaFile | null)**:  
  The media object to render.
  - Renders a **YouTube iframe** if `youtubeId` is provided.
  - Renders a **Video element** if `isVideo` is `true`.
  - Otherwise renders a **Picture (image)**.

- `alt` **(string, optional)**:  
  Alternative text for the image.

- `title` **(string, optional)**:  
  Title attribute for the image or video.

- `fetchPriority` **("high" | "low" | "auto")**:  
  Priority for image loading.

- `autoplayVideo` **(boolean, default: false)**:  
  Autoplay local videos.

- `loopVideo` **(boolean, default: false)**:  
  Loop local videos.

- `mutedVideo` **(boolean, default: false)**:  
  Mute local videos.

- `withVideoControls` **(boolean, default: false)**:  
  Show native video controls.

- `aspectRatio` **(string, optional)**:  
  Aspect ratio utility class.  
  Examples: `"aspect-video"`, `"aspect-square"`, `"aspect-[4/3]"`.

- `ui` **(object, optional)**:  
  Tailwind class overrides:
  - `wrapper`: wrapper container.
  - `container`: inner aspect-ratio container.
  - `media`: applied to `<iframe>`, `<video>`, or `<img>`.

---

## MediaFile Type

```ts
export interface MediaFile {
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
```

## Example — Basic Usage

#### YouTube Video
```vue
<script setup lang="ts">
import IMediaRender from '~/components/IMediaRender/IMediaRender.vue'
import type { MediaFile } from '~/components/IMediaRender/IMediaRender'

const media: MediaFile = {
  youtubeId: 'dQw4w9WgXcQ'
}
</script>

<template>
  <IMediaRender :media="media" aspect-ratio="aspect-video" />
</template>
```

#### Responsive Image
```vue
<script setup lang="ts">
  import IMediaRender from '~/components/IMediaRender/IMediaRender.vue'
  import type { MediaFile } from '~/components/IMediaRender/IMediaRender'

  const media: MediaFile = {
    isImage: true,
    url: '/images/hero.jpg',
    thumbnails: {
      smallThumb: '/images/hero-small.jpg',
      mediumThumb: '/images/hero-medium.jpg',
      largeThumb: '/images/hero-large.jpg',
      extraLargeThumb: '/images/hero-xl.jpg'
    }
  }
</script>

<template>
  <IMediaRender
    :media="media"
    alt="Hero image"
    title="Landing Page"
    aspect-ratio="aspect-[4/3]"
    :ui="{ wrapper: 'rounded-xl shadow-lg overflow-hidden' }"
  />
</template>

```
