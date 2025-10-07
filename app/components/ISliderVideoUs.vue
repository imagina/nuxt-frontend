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
        ui: {
          viewport: 'w-full',
          container: 'w-full',
        }
      }">
      <template #item="{ item }">
        <!-- Video -->
        <UContainer>
          <div class="grid items-center gap-10 grid-cols-12 py-20 justify-center">
            <!-- Texto -->
            <div class="col-span-12 lg:col-span-8 lg:col-start-3">
              <div class="text-center">
                <div class="text-primary text-[30px] leading-[30px] lg:text-[40px] lg:leading-[40px] font-bold mb-10">
                  {{ item.title }}
                  <span class="mt-3 block h-1 w-24 mx-auto rounded bg-tertiary"></span>
                </div>
              </div>
              <IMediaRender
                :media="{youtubeId:item.externalImageUrl}" :alt="item.title"
                :ui="{
                  wrapper: 'aspect-16/9',
                  container: 'rounded-xl ',
                  media: 'object-cover rounded-xl w-[200px]',
                }"
              />
            </div>
          </div>
        </UContainer>
      </template>
  </IsliderCarousel>
</template>
