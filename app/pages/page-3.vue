<script setup lang="ts">
import type { PageData } from '#ipage/types/pages'
defineProps<{ page: PageData }>()


const buttonProps = {
  size: 'xl',
  class: 'justify-center bg-secondary  text-white hover:bg-primary hover:text-white transition'
}
const ui = {
  root: '',
  actions: 'col-span-12 mt-2',
  title: 'hidden',
  description: 'hidden',
}
</script>

<template>
  <div>
    <!-- Contacto -->
     <IBreadcrumb
      :title="page.title ?? '...'"
      :ui="{ link: 'font-bold text-gray-3' }">
      <template #extraUp>
        <IsliderCarousel
          system-name="publi_contacto"
          dots-position="inside-left-middle"
          item-theme="ItemTheme2"
          :carousel-props="{
          dots: true,
          autoplay: true,
          loop: true,
          ui: {
            item: 'h-[260px] sm:h-[360px] md:h-[400px]',
            dot: 'w-[16px] h-[16px] rounded-full bg-[#FFFFFF80] data-[state=active]:bg-secondary'
          } }"
        />
      </template>
    </IBreadcrumb>
    <div class="bg-gray-2">
      <UContainer class="py-10 px-4 sm:px-6 lg:px-10 contacto">
        <h1 class="page-title hidden">{{ page.title }}</h1>
        <div class="page-body mb-9" v-html="page.body"></div>
        <div class="flex flex-col gap-10 lg:flex-row">
          <div class="min-w-0 lg:basis-1/2">
            <IformForm
              :button-props="buttonProps"
              :ui="ui" system-name="contact_form" />
          </div>
          <div class="min-w-0 lg:basis-1/2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63623.92796860637!2d-74.13125156112116!3d4.683603391468811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9aeed5ded35d%3A0xf23844a180342b9c!2sAlquiler%20de%20Carros%20Bogot%C3%A1%20-%20ABC%20RENT%20A%20CAR!5e0!3m2!1ses!2sve!4v1755888820280!5m2!1ses!2sve"
              class=" h-[550px] w-full rounded-lg"
              style="border:0;"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </UContainer>
    </div>
  </div>
</template>
<style scoped>
@reference "~/assets/css/main.css";

.contacto .page-body {
  /* Énfasis y enlaces */
  & :deep(:is(strong,a)) { @apply text-primary; }
}

:deep(input), :deep(textarea) {
  min-height: 40px;
  width: 100%;
  font-size: 16px;
  border: 1px solid rgba(0, 0, 0, 0.15);
}
</style>
