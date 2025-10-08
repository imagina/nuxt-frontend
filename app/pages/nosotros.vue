<script setup lang="ts">
const {page} = await usePageLoader()
</script>
<template>
  <div>
    <!-- Nosotros -->
    <IBreadcrumb
      :title="page.title ?? '...'"
      :ui="{ link: 'font-bold text-gray-3' }">
      <template #extraUp>
        <IsliderCarousel
          system-name="publi_nosotros"
          item-theme="ItemTheme2"
          dots-position="inside-left-middle"
          :carousel-props="{
          dots: true,
          autoplay: true,
          loop: true,
          ui: {
            item: 'h-[260px] sm:h-[360px] md:h-[400px]',
            dot: 'w-[16px] h-[16px] rounded-full bg-[#FFFFFF80] data-[state=active]:bg-secondary'
          }
        }"/>
      </template>
    </IBreadcrumb>
    <section class="container mx-auto py-10 px-4 sm:px-6 lg:px-10 nosotros">
      <h1 class="page-title hidden">{{ page?.title }}</h1>
      <div class="page-body" v-html="page?.body"></div>
    </section>
    <!-- Form Contacto -->
    <FormContact/>
  </div>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.nosotros .page-body {


  & :deep(img) {
    object-fit: cover;
    border-radius: 30px;
  }

  /* grid dentro del HTML inyectado */

  & :deep(:is(.grid)) {
    @apply gap-10;
  }

  /* Énfasis y enlaces */

  & :deep(:is(strong,a)) {
    @apply text-primary;
  }

  /* Separador */

  & :deep(:is(hr)) {
    @apply border-t;
    border-color: #00000026;
  }
}
</style>
