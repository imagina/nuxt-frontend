<script setup lang="ts">
import type { PageData } from '#ipage/types/pages'
defineProps<{ page: PageData }>()

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
      <h1 class="page-title hidden">{{ page.title }}</h1>
      <div class="page-body" v-html="page.body"></div>
    </section>
    <!-- Form Contacto -->
    <FormContact />
  </div>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.nosotros .page-body {
  font-family: 'DM Sans', ui-sans-serif, system-ui;
  @apply font-normal text-[18px] leading-[20px] md:text-[20px] md:leading-[30px];

  & :deep(img) { object-fit: cover; border-radius: 30px; }

  /* grid dentro del HTML inyectado */
  & :deep(:is(.grid)) { @apply gap-10; }

  /* Títulos */
  & :deep(:is(h1,h2,h3,h4)) { @apply font-semibold mb-[15px]; }
  & :deep(:is(h1,h2)) { @apply text-[30px] leading-[40px] md:text-[40px] md:leading-[50px]; }
  & :deep(:is(h3)) { @apply text-[20px] leading-[25px] md:text-[30px] md:leading-[40px]; }
  & :deep(:is(h4)) { @apply text-[16px] leading-[20px] md:text-[20px] md:leading-[30px]; }

  /* Listas */
  & :deep(:is(ul)) { @apply list-disc pl-5 mt-[15px]; }
  & :deep(:is(ul li)) { @apply list-item mb-2; }
  & :deep(:is(ol)) { @apply list-decimal pl-5 mt-[15px]; }
  & :deep(:is(ol li)) { @apply list-item mb-2; }

  /* Énfasis y enlaces */
  & :deep(:is(strong,a)) { @apply text-primary; }

  /* Separador */
  & :deep(:is(hr)) {
    @apply border-t;
    border-color: #00000026;
  }
}
</style>
