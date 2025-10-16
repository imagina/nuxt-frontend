<script setup lang="ts">
const route = useRoute()
defineProps<{ item: any }>()

// el slugCategory actual desde la URL de la categoría
const slugCategory = computed(() => route.params.slugCategory as string)
</script>

<template>
  <article class="rounded-2xl mb-10 transition hover:-translate-y-0.5">
    <NuxtLink :to="`/iblog/${slugCategory}/${item.slug}`">
      <!-- :media="item.files?.mainimage" -->
      <IMediaRender
        :media="{ url: '/images/default.jpg'}"
        :alt="item?.title ?? 'Image'"
        aspect-ratio="aspect-4/3"
        :ui="{
          wrapper: '',
          container: 'rounded-2xl',
          media: 'object-cover rounded-2xl',
        }"
      />
    </NuxtLink>
    <!-- Contenido -->
    <div class="content-post mt-6">
       <NuxtLink :to="`/iblog/${slugCategory}/${item.slug}`" >
        <h3 class="line-clamp-2 lg:min-h-[44px] text-primary font-bold text-[16px] leading-[16px] sm:text-[18px] sm:leading-[18px] lg:text-[22px] lg:leading-[22px]">
          {{ item.title }}
        </h3>
      </NuxtLink>
      <p class="line-clamp-4 mt-2 lg:mt-3 mb-5 lg:mb-8 text-[14px] leading-[16px] lg:text-[17px] lg:leading-[19px]">
        {{ item.summary }}
      </p>

      <UButton
        :to="`/iblog/${slugCategory}/${item.slug}`"
        class="px-4 py-2 lg:px-5 lg:py-3 bg-tertiary rounded-full text-[15px] leading-[15px] lg:text-[18px] lg:leading-[18px]"
        loading-auto
        label="Ver más"
      />
    </div>

  </article>
</template>
