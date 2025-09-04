<script setup lang="ts">
import type { PageData } from '#ipage/types/pages'
defineProps<{ page: PageData }>()

</script>

<template>
  <div>
    <!-- Requisitos -->
     <IBreadcrumb
      :title="page.title ?? '...'"
      :ui="{ link: 'font-bold text-gray-3' }">
      <template #extraUp>
        <IsliderCarousel
          system-name="publi_servicio"
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
        }"
        />
      </template>
    </IBreadcrumb>
    <section class="container mx-auto py-10 px-4 sm:px-6 lg:px-10 requisitos">
      <h1 class="page-title hidden">Requisitos</h1>
      <div class="page-body" v-html="page.body"></div>
    </section>
  </div>
</template>
<style scoped>
@reference "~/assets/css/main.css";

.requisitos .page-body {
  font-family: 'DM Sans', ui-sans-serif, system-ui;
  @apply font-normal text-[18px] leading-[20px] md:text-[20px] md:leading-[30px];

  /* imágenes */
  & :deep(img) { object-fit: cover; border-radius: 30px; }

  /* grid */
  & :deep(:is(.grid)) { @apply gap-10; }

  /* títulos */
  & :deep(:is(h1,h2,h3,h4)) { @apply font-semibold mb-[15px]; }
  & :deep(:is(h1,h2)) { @apply text-[30px] leading-[40px] md:text-[40px] md:leading-[50px]; }
  & :deep(:is(h3)) { @apply text-[20px] leading-[25px] md:text-[30px] md:leading-[40px]; }
  & :deep(:is(h4)) { @apply text-[16px] leading-[20px] md:text-[20px] md:leading-[30px]; }

  /* listas */
  & :deep(:is(ul)) { @apply list-disc pl-5 mt-[15px]; }
  & :deep(:is(ul li)) { @apply list-item mb-2; }
  & :deep(:is(ol)) { @apply list-decimal pl-5 mt-[15px]; }
  & :deep(:is(ol li)) { @apply list-item mb-2; }

  /* énfasis y enlaces */
  & :deep(:is(strong,a)) { @apply text-primary; }

  /* separador */
  & :deep(:is(hr)) {
    @apply border-t;
    border-color: #00000026;
  }

  /* --- Accordion cards --- */

  & :deep(details.collapsible-item){
    margin: 12px 0;
    border: 1.5px solid #fda4af;      /* borde rosa */
    border-radius: 12px;
    background: #fff;
    overflow: hidden;
    transition: background .2s, border-color .2s, box-shadow .2s;
  }

  & :deep(details.collapsible-item[open]){
    background: #ffffff;
    border-color: #fda4af;
  }

  /* ocultar marcador nativo */
  & :deep(details.collapsible-item > summary::-webkit-details-marker){ display: none; }
  & :deep(details.collapsible-item > summary::marker){ content: ""; }

  /* cabecera */
  & :deep(details.collapsible-item > summary.collapsible-item-title){
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    font-weight: 600;
    color: #111827;
    cursor: pointer;
    list-style: none;
  }

  /* icono FA izquierdo */
  & :deep(details.collapsible-item > summary .fa-solid),
  & :deep(details.collapsible-item > summary .fa-regular){
    font-size: 20px;
    color: #e11d48;                    /* rosa fuerte */
    margin-right: 6px;
  }

  /* chevron derecho */
  & :deep(details.collapsible-item > summary.collapsible-item-title::after){
    content: "";
    margin-left: auto;
    width: 8px; height: 8px;
    border: 2px solid currentColor;
    border-left: 0; border-top: 0;
    transform: rotate(45deg);
    opacity: .7;
    transition: transform .2s ease, opacity .2s ease;
  }
  & :deep(details.collapsible-item[open] > summary.collapsible-item-title::after){
    transform: rotate(-135deg);
    opacity: 1;
  }

  /* cuerpo */
  & :deep(details.collapsible-item .collapsible-item-body){
    padding: 0 20px 16px 48px;          /* sangría bajo el título */
    color: #374151;
    line-height: 1.7;
  }
  & :deep(details.collapsible-item .collapsible-item-body p){ margin: 0; }

  /* hover cuando está cerrado */
  & :deep(details.collapsible-item:not([open])):hover{
    background: #fff7f8;
    border-color: #fda4af;
  }
}
</style>
