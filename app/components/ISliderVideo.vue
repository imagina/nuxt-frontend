<script setup>

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
});
</script>
<template>
  <IsliderCarousel
    :system-name="name"
    :carousel-props="{
    dots: false,
    autoplay: true,
    loop: false,
    active: false,
  }">
    <template #item="{ item }">
      <UContainer>
        <div class="grid items-center gap-10 lg:grid-cols-12 py-20">
          <!-- Texto -->
          <div class="lg:col-span-6">

            <IMediaRender
              :media="{youtubeId:item.externalImageUrl}" :alt="item.title"
              :ui="{
                wrapper: 'aspect-16/9',
                container: 'rounded-xl ',
                media: 'object-cover rounded-xl ',
              }"
            />
          </div>

          <!-- Imagen -->
          <div class="lg:col-span-6">
            <p class="text-tertiary font-semibold text-[16px] leading-[16px] lg:text-[18px] lg:leading-[18px] mb-2" >
              {{item.summary }}
            </p>
            <h2 class="font-bold text-[25px] leading-[25px] lg:text-[35px] lg:leading-[35px] mb-3" >
              {{ item.title }}
            </h2>
            <div class="space-y-2 mb-6 text-justify text-[18px] leading-[22px] custom-html" v-html="item.customHtml" ></div>
            <UButton
              :label="item.caption"
              :to="item.uri ?? item.url"
              class="px-5 py-3 bg-tertiary rounded-full text-[18px] leading-[18px]"
              loading-auto
            />
          </div>
        </div>
      </UContainer>
    </template>
  </IsliderCarousel>
</template>
