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

<style>
@reference "~/assets/css/main.css";

.nosotros .page-body {
  font-family: DM Sans;
  @apply font-normal text-[18px] leading-[20px] md:text-[20px] md:leading-[30px] text-justify;
}
.nosotros .page-body .grid {
  @apply gap-10
}
.nosotros .page-body :is(h1, h2, h3, h4) {
  @apply font-semibold mb-[15px];
}
.nosotros .page-body  :is(h1, h2) {
  @apply text-[30px] leading-[40px] md:text-[40px] md:leading-[50px];
}
.nosotros .page-body h3  {
@apply text-[20px] leading-[25px] md:text-[30px]  md:leading-[40px];
}
.nosotros .page-body h4 {
@apply text-[16px] leading-[20px] md:text-[20px]  md:leading-[30px];
}
.nosotros .page-body ul {
  @apply list-disc pl-5 mt-[15px];
}
.nosotros .page-body ul li {
  @apply list-item mb-2;
}
.nosotros .page-body ol {
  @apply list-decimal pl-5 mt-[15px];
}
.nosotros .page-body ol li {
  @apply list-item mb-2;
}
.nosotros .page-body :is(strong, a) {
  @apply text-primary;
}
.nosotros .page-body hr {
  @apply border-t border-t-[#00000026];
}
</style>
