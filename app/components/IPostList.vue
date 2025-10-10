<script setup >
const props = defineProps({
  post: {
    type: Object,
    default: () => []
  }
})
</script>
<template>
  <article class="rounded-2xl">
    <div class="flex gap-4">
      <NuxtLink to="#">
        <IMediaRender
          :media="post.files?.mainimage ?? { url: '/images/default.jpg'}"
          :alt="post?.title ?? 'Image'"
          aspect-ratio="aspect-16/9"
          :ui="{
            wrapper: '',
            container: 'rounded-2xl w-40 lg:w-64',
            media: 'object-cover rounded-2xl ',
          }"
        />
      </NuxtLink>

      <div class="min-w-0">
        <p class="text-[12px] text-gray-500">Noviembre 24, 2030</p>
        <h3 class="mt-1 font-semibold text-slate-900 leading-snug">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </h3>
        <p class="mt-2 text-sm text-gray-600 leading-relaxed
                  overflow-hidden text-ellipsis"
          style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">
          Acta de la reunión sostenida en el despacho de la ministra de educación, sobre la situación
          de la educación del departamento del Chocó…
        </p>

        <a href="#"
          class="mt-3 inline-flex items-center rounded-full bg-red-500 px-4 py-2 text-white text-xs sm:text-sm font-semibold shadow
                  hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400">
          Leer Más
        </a>
      </div>
    </div>
  </article>
</template>

