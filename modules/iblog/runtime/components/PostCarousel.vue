<script setup lang="ts">
const props = defineProps({
  posts: { type: Array, default: () => [] },
  title: { type: String, default: () => '' },
  background: { type: String, default: () => '' }
})
</script>
<template>
  <div :class="background" class="pt-20 pb-10">
    <UContainer>
      <div class="text-center">
        <div v-if="title" class="text-primary text-[30px] leading-[30px] lg:text-[40px] lg:leading-[40px] font-bold mb-10">
          {{ title }}
        </div>
      </div>
      <ICarousel
        :items="posts"
        :carousel-props="{
          dots: true,
          loop: true,
          align: 'start',
          autoplay: true,
          ui: {
            item: 'basis-1/2 md:basis-1/3 lg:basis-1/4',
            dot: 'w-[13px] h-[13px] rounded-full data-[state=active]:bg-tertiary',
          },
        }"
        dots-position="outside-bottom-middle"
        arrows-position="inside-between-middle"
      >
        <template #item="{ item, index }">
          <div class="mb-8">
            <div class=" bg-white transition hover:-translate-y-0.5 ">
              <NuxtLink :to="item.href">
                <IMediaRender
                  :media="item.image"
                  :alt="item.title"
                  aspect-ratio="aspect-16/9"
                  :ui="{
                    wrapper: '',
                    container: ' ',
                    media: 'object-cover ',
                  }"
                />
              </NuxtLink>

              <!-- Contenido -->
              <div class="p-6">
                <h3 class=" text-primary line-clamp-2 min-h-[44px] text-primary font-bold text-[22px] leading-[22px]">
                  {{ item.title }}
                </h3>
                <p class="line-clamp-4 mt-3 mb-8 text-[16px] leading-[19px] text-secondary">
                  {{ item.summary }}
                </p>

                <UButton
                  :to="item.href"
                  class="px-5 py-3 bg-tertiary rounded-full text-[14px] leading-[14px] uppercase"
                  loading-auto
                  label="Ver más"
                />
              </div>
            </div>
          </div>
        </template>
      </ICarousel>
    </UContainer>
  </div>
</template>

