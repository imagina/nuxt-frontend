<script setup lang="ts">
import { useBlogPostLoader } from '#iblog/composables/useBlogPostLoader'

const route = useRoute()
const slugCategory = route.params.slugCategory as string
const slugPost = route.params.slugPost as string
setPageLayout((route.meta as any)?.layout || 'master')

const { post, pending, error } = useBlogPostLoader(slugPost, slugCategory)

// ahora puedes hacer esto sin .value:
const title = computed(() => post.title || post.es?.title || slugPost)
const summary = computed(() => post.summary || post.es?.summary || '')
const htmlContent = computed(() =>
  post.content ?? post.body ?? post.description ?? post.es?.description ?? ''
)
const mainImageUrl = computed(() => post.files?.mainimage?.url || null)

const dump = (v: any) => { try { return JSON.stringify(v, null, 2) } catch { return String(v) } }

// texto de la categoría (puedes usar el que ya tengas cargado)
const categoryLabel = computed(() =>  post.category?.title || post.category?.es?.title)

const categoryCrumb = computed<BreadcrumbItem>(() => ({
  label: categoryLabel.value,
  to: `/iblog/${slugCategory}`
}))


type GalImg = { src: string; alt?: string }

const images: GalImg[] = [
  { src: '/images/requisitos.jpg',  alt: 'Camión 1' },
  { src: '/images/photo.jpg',  alt: 'Patio 1' },
  { src: '/images/requisitos.jpg',  alt: 'Tanque lateral' },
  { src: '/images/photo.jpg',  alt: 'Camión 2' },
  { src: '/images/requisitos.jpg',  alt: 'Patio 2' },
  { src: '/images/photo.jpg',  alt: 'Detalle tanque' },
  { src: '/images/requisitos.jpg',  alt: 'Camión 3' },
  { src: '/images/photo.jpg',  alt: 'Vista baja' },
  { src: '/images/requisitos.jpg',  alt: 'Camión 4' },
  { src: '/images/photo.jpg', alt: 'Operario' },
]
</script>

<template>
  <!-- SKELETON LINDO MIENTRAS CARGA -->
  <div v-if="pending">
    <div class="mx-auto h-15 w-full bg-gray-200 animate-pulse"></div>
    <UContainer class="pt-20">
      <div class="text-center space-y-3 mb-10">
        <div class="mx-auto h-3 w-64 rounded-full bg-gray-200 animate-pulse"></div>
        <div class="mx-auto h-3 w-96 rounded-full bg-gray-200 animate-pulse"></div>
      </div>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mb-10">
        <div v-for="n in 2" :key="n" class="rounded-2xl overflow-hidden bg-white">
          <div class="p-4 space-y-3">
            <div class="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
            <div class="h-3 w-5/6 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
  <!-- CONTENIDO -->
  <article v-else :class="`iblog post post-${post.id} category-${slugCategory}`">
    <IBreadcrumb
      :title="title"
      :extra-before="[categoryCrumb]"
      :ui="{ link: 'font-bold text-gray-3' }">
    </IBreadcrumb>
    <UContainer class="pt-20">
      <h1 class="page-title hidden"> {{ title }} </h1>
      <div class="page-body text-justify mb-20" v-html="htmlContent"></div>

      <!-- Galery -->
      <div class="w-full max-w-3/4 mx-auto mb-20" >
        <div class="columns-2 sm:columns-3 lg:columns-4 gap-4 [column-fill:balance]">
          <figure
            v-for="(img, i) in images"
            :key="img.src + i"
            class="mb-4 break-inside-avoid rounded-xl overflow-hidden"
          >
            <img
              :src="img.src"
              :alt="img.alt"
              class="w-full h-auto align-top transition-transform duration-300 hover:scale-[1.02]"
              loading="lazy"
              decoding="async"
              sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
            />
          </figure>
        </div>
      </div>
    </UContainer>
  </article>
</template>
