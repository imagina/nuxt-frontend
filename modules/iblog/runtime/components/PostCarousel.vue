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
            container: 'gap-8',
            item: 'basis-1/2 md:basis-1/3 lg:basis-1/4 ',
            dot: 'w-[13px] h-[13px] rounded-full data-[state=active]:bg-tertiary',
          },
        }"
        dots-position="outside-bottom-middle"
        arrows-position="inside-between-middle"
      >
        <template #item="{ item, index }">
          <div class="mb-8">
            <div class="rounded-2xl  transition hover:-translate-y-0.5 ">
              <NuxtLink :to="`/iblog/${item.category.slug}/${item.slug}`">
                <IMediaRender
                  :media="item.files.mainimage"
                  :alt="item.title"
                  aspect-ratio="aspect-4/3"
                  :ui="{
                    wrapper: '',
                    container: 'rounded-2xl ',
                    media: 'object-cover rounded-2xl',
                  }"
                />
              </NuxtLink>

              <!-- Contenido -->
              <div class="py-6">
                <NuxtLink :to="`/iblog/${item.category.slug}/${item.slug}`" >
                  <h3 class="line-clamp-2 lg:min-h-[44px] text-primary font-bold text-[16px] leading-[16px] sm:text-[18px] sm:leading-[18px] lg:text-[22px] lg:leading-[22px]">
                    {{ item.title  }}
                  </h3>
                </NuxtLink>
                <p class="line-clamp-4 mt-3 mb-8 text-[16px] leading-[19px] text-secondary">
                  {{ item.summary }}
                </p>

                <UButton
                  :to="`/iblog/${item.category.slug}/${item.slug}`"
                  class="px-4 py-2 lg:px-5 lg:py-3 bg-tertiary rounded-full text-[15px] leading-[15px] lg:text-[18px] lg:leading-[18px]"
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

