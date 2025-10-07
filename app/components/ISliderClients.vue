<script setup>
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
});
</script>
<template>
  <section class="bg-clients">
    <UContainer class="py-10">
      <div class="text-center">
        <div class="text-tertiary tracking-[.25em] text-[16px] leading-[16px] lg:text-[18px] lg:leading-[18px] font-bold uppercase mb-2" >
          Lazos estrechados
        </div>
        <div class="text-primary text-[25px] leading-[25px] lg:text-[35px] lg:leading-[35px] font-bold mb-10" >
          Nuestros Clientes
        </div>
      </div>
      <IsliderCarousel
        :system-name="name"
         arrows-position="outside-between-middle"
        :carousel-props="{
          dots: false,
          arrows: true,
          loop: true,
          autoplay: true,
          ui: {
            item: 'basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-[20%] xl:basis-1/6',
          },
        }">
        <template #item="{ item }">
          <div class="mb-8">
          <NuxtLink :to="item.uri ?? item.url">
                <IMediaRender
                  :media="item.files.slideimage"
                  :alt="item.title"
                  aspect-ratio="aspect-4/3"
                  :ui="{
                    wrapper: '',
                    container: 'rounded-2xl ',
                    media: 'object-cover rounded-2xl',
                  }"
                />
              </NuxtLink>
          </div>
        </template>
      </IsliderCarousel>
    </UContainer>
  </section>
</template>
<style scoped>
.bg-clients {
  border-top: 1px solid #0000001F;
  background: #F2F2F2;

}
</style>
