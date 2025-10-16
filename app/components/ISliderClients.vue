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
    <UContainer class="py-12">
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
        prev-icon="material-symbols-light:chevron-left"
        next-icon="material-symbols-light:chevron-right"
        :prev="{
          size: 'auto',
          class: 'rounded-none border-0 ring-0 shadow-none !bg-transparent hover:bg-transparent focus:outline-none focus:ring-0',
          ui: { leadingIcon: 'h-15 w-10 text-[#A1ACBD]' }
        }"
        :next="{
          size: 'auto',
          class: 'rounded-none border-0 ring-0 shadow-none !bg-transparent hover:bg-transparent focus:outline-none focus:ring-0',
          ui: { leadingIcon: 'h-15 w-10 text-[#A1ACBD]' }
        }"
        :carousel-props="{
          dots: false,
          arrows: true,
          loop: true,
          autoplay: true,
          align: 'start',
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
                wrapper: 'bg-white p-3 rounded-2xl',
                container: 'rounded-2xl ',
                media: 'object-contain ',
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
