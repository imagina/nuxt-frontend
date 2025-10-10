<script lang="ts">
export const pageMeta = {layout: 'master-laboratorio'}
</script>

<script setup lang="ts">
import type { PageData } from '#ipage/types/pages'
defineProps<{ page: PageData }>()



</script>

<template>
  <!-- Nosotros Laboratorio -->
  <IBreadcrumb
      homeLink="/inicio-laboratorio"
      :title="page.title ?? '...'"
      :ui="{ link: 'font-bold text-gray-3' }">
  </IBreadcrumb>
  <UContainer :class="`page-${page?.id}`" class="pt-20 nosotros">
    <h1 class="page-title hidden">{{ page.title }}</h1>
    <div class="page-body-img">
      <!-- Imagen primero -->
      <IMediaRender
        :media="page.files.mainimage"
        :alt="page.title"
        aspect-ratio="auto"
        :ui="{
          wrapper: 'float-right w-full lg:w-1/2 h-[450px] ml-10 mb-10',
          media: 'w-full h-full object-cover rounded-2xl',
        }"
      />
      <div class="page-body text-justify" v-html="page.body"></div>
    </div>
  </UContainer>

  <div class="w-full h-2"></div>

  <!-- Slider con video us -->
  <ISliderVideoUs name="laboratorio_nosotros_video"></ISliderVideoUs>

  <!-- Nuestros Equipos -->
  <ITimelineHistory
    name="laboratorio_nuestros_equipos"
    title="Nuestros Equipos"
    subtitle="Pruebas con la mejor calidad"
  />

  <!-- Slider Acreditaciones -->
  <ISliderColumnTwo
    name="laboratorio_acreditaciones"
    title="NUESTRAS"
    subtitle="Acreditaciones"
  />

  <!-- Carousel Clientes -->
  <ISliderClients name="colbitumen_clientes"></ISliderClients>

</template>
<style scoped>
:deep(.page-body) {
  & h2 { position: relative; }
  & h2:before {
    content: "";
    display: block;
    background-color: var(--color-tertiary);
    width: 96px;
    height: 4px;
    position: absolute;
    bottom: -18px;
  }
}
</style>
