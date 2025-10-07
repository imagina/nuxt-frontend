<script setup lang="ts">
import type { PageData } from '#ipage/types/pages'
defineProps<{ page: PageData }>()

const soluciones = [
  {
    id: 1,
    title: "Normalizados",
    summary:
      "Asfaltos de alta calidad, fabricados bajo normas técnicas nacionales e internacionales. Brindan estabilidad y desempeño confiable en proyectos viales urbanos y carreteras de alto tránsito.",
    image: { isImage: true, url: "/images/requisitos.jpg" },
    href: "/soluciones/normalizados",
  },
  {
    id: 2,
    title: "Asfalto Modificado con Polímeros",
    summary:
      "Diseñado para mayor resistencia y durabilidad, mejora la elasticidad y reduce costos de mantenimiento en condiciones de tráfico y clima exigentes.",
    image: { isImage: true, url: "/images/requisitos.jpg" },
    href: "/soluciones/asfalto-modificado-con-polimeros",
  },
  {
    id: 3,
    title: "Asfaltos Modificados con GCR y Plásticos Posconsumo",
    summary:
      "Una solución sostenible que reutiliza caucho y plásticos reciclados, ofreciendo pavimentos más resistentes y responsables con el medio ambiente.",
    image: { isImage: true, url: "/images/requisitos.jpg" },
    href: "/soluciones/asfaltos-modificados-gcr-plasticos-posconsumo",
  },
  {
    id: 4,
    title: "Asfaltos Modificados con GCR y Plásticos Posconsumo",
    summary:
      "Una solución sostenible que reutiliza caucho y plásticos reciclados, ofreciendo pavimentos más resistentes y responsables con el medio ambiente.",
    image: { isImage: true, url: "/images/requisitos.jpg" },
    href: "/soluciones/asfaltos-modificados-gcr-plasticos-posconsumo",
  },
    {
    id: 5,
    title: "Asfaltos Modificados con GCR y Plásticos Posconsumo",
    summary:
      "Una solución sostenible que reutiliza caucho y plásticos reciclados, ofreciendo pavimentos más resistentes y responsables con el medio ambiente.",
    image: { isImage: true, url: "/images/requisitos.jpg" },
    href: "/soluciones/asfaltos-modificados-gcr-plasticos-posconsumo",
  },
    {
    id: 6,
    title: "Asfaltos Modificados con GCR y Plásticos Posconsumo",
    summary:
      "Una solución sostenible que reutiliza caucho y plásticos reciclados, ofreciendo pavimentos más resistentes y responsables con el medio ambiente.",
    image: { isImage: true, url: "/images/requisitos.jpg" },
    href: "/soluciones/asfaltos-modificados-gcr-plasticos-posconsumo",
  },
    {
    id: 7,
    title: "Asfaltos Modificados con GCR y Plásticos Posconsumo",
    summary:
      "Una solución sostenible que reutiliza caucho y plásticos reciclados, ofreciendo pavimentos más resistentes y responsables con el medio ambiente.",
    image: { isImage: true, url: "/images/requisitos.jpg" },
    href: "/soluciones/asfaltos-modificados-gcr-plasticos-posconsumo",
  },
];

</script>

<template>
  <div>
    <!-- Inicio colbitumen -->
    <ISliderMain name="principal_colombiana">
      <template #curve>
        <svg class="pointer-events-none absolute left-0 bottom-[-1px] block w-full h-20 text-white"
          viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,0 C360,120 1080,120 1440,0 L1440,120 L0,120 Z" fill="currentColor" />
        </svg>
      </template>
    </ISliderMain>

    <!-- Carousel Soluciones -->
    <UContainer class="py-10">
      <div class="text-center">
        <div class="text-tertiary tracking-[.25em] text-[16px] leading-[16px] lg:text-[18px] lg:leading-[18px] font-bold uppercase mb-2">
          CONOCE NUESTRAS
        </div>
        <div class="text-primary text-[25px] leading-[25px] lg:text-[35px] lg:leading-[35px] font-bold mb-10" >
          Soluciones Integrales
        </div>
      </div>
      <ICarousel
        :items="soluciones"
        :carousel-props="{
          dots: true,
          loop: true,
          autoplay: true,
          ui: {
            item: 'basis-1/2 md:basis-1/3',
            dot: 'w-[13px] h-[13px] rounded-full data-[state=active]:bg-tertiary',
          },
        }"
        dots-position="outside-bottom-middle"
        arrows-position="inside-between-middle"
      >
        <template #item="{ item, index }">
          <div class="mb-10">
            <div class="m-4 rounded-2xl bg-white shadow-lg  transition p-3 hover:-translate-y-0.5 ">
              <NuxtLink :to="item.href">
                <IMediaRender
                  :media="item.image"
                  :alt="item.title"
                  aspect-ratio="aspect-4/3"
                  :ui="{
                    wrapper: '',
                    container: 'rounded-2xl ',
                    media: 'object-cover rounded-2xl',
                  }"
                />
              </NuxtLink>

              <!-- Contenido -->
              <div class="p-6 text-center">
                <h3 class="line-clamp-2 min-h-[44px] text-primary font-bold text-[22px] leading-[22px]">
                  {{ item.title }}
                </h3>
                <p class="line-clamp-4 mt-3 mb-8 text-[17px] leading-[19px]">
                  {{ item.summary }}
                </p>

                <UButton
                  :to="item.href"
                  class="px-5 py-3 bg-tertiary rounded-full text-[18px] leading-[18px]"
                  loading-auto
                  label="Ver más"
                />
              </div>
            </div>
          </div>
        </template>
      </ICarousel>
    </UContainer>

    <!-- H1 -->
    <section class="home py-5">
      <UContainer>
        <div class="page-body-h1" v-html="page?.body"></div>
      </UContainer>
    </section>

    <!-- Slider con video -->
    <ISliderVideo name="colbitumen_conocenos"></ISliderVideo>

    <!-- Valores Slider -->
    <section class="bg-gradiente-gray">
      <UContainer class="py-20">
        <div class="text-center">
          <div class="text-tertiary tracking-[.25em] text-[16px] leading-[16px] lg:text-[18px] lg:leading-[18px] font-bold uppercase mb-2" >
            CONOCE NUESTROS
          </div>
          <div class="text-primary text-[25px] leading-[25px] lg:text-[35px] lg:leading-[35px] font-bold mb-10" >
            Nuestros Valores
          </div>
        </div>
        <IsliderCarousel system-name="colbitumen-valores"
          dots-position="outside-bottom-middle"
          :carousel-props="{
            dots: true,
            autoplay: true,
            loop: true,
            ui: {
                item: 'basis-1/2 md:basis-1/3',
                dot: 'w-[13px] h-[13px] rounded-full data-[state=active]:bg-tertiary',
              },
          }">
          <template #item="{ item, index }">
            <article class="">
              <IMediaRender
                :media="item.files.slideimage" :alt="item.title"
                aspect-ratio="aspect-4/3"
                :ui="{
                  wrapper: '',
                  container: 'h-[65px] w-[65px] rounded-full',
                  media: 'object-cover rounded-full',
                }"
              />
              <!-- Contenido -->
              <div class="p-6 text-center">
                <h3 class="line-clamp-2 min-h-[44px] text-primary font-bold text-[26px] leading-[26px]">
                  {{ item.title }}
                </h3>
                <p class="mt-3 mb-8 text-[16px] leading-[20px]">
                  {{ item.summary }}
                </p>
              </div>
            </article>
          </template>
        </IsliderCarousel>
      </UContainer>
    </section>

    <!-- Banner Contacto -->
    <ISliderHome name="colbitumen_contacto"></ISliderHome>

    <!-- Carousel Soluciones -->
    <UContainer class="py-10">
      <div class="text-center">
        <div class=" text-tertiary tracking-[.25em] text-[16px] leading-[16px] lg:text-[18px] lg:leading-[18px] font-bold uppercase mb-2" >
          CONOCE NUESTRO COMPROMISO
        </div>
        <div class="text-primary text-[25px] leading-[25px] lg:text-[35px] lg:leading-[35px] font-bold mb-10" >
          Compromiso con la Excelencia
        </div>
      </div>
        <IsliderCarousel system-name="colbitumen_excelencia"
          dots-position="outside-bottom-middle"
          :carousel-props="{
            dots: true,
            loop: true,
            autoplay: true,
            ui: {
              item: '',
              dot: 'w-[13px] h-[13px] rounded-full data-[state=active]:bg-tertiary',
            },
          }">
          <template #item="{ item, index }">
            <div class="grid items-center gap-10 lg:grid-cols-12 pb-10">
              <div class="lg:col-span-6">
                <IMediaRender
                  :media="item.files.slideimage" :alt="item.title"
                  aspect-ratio="aspect-4/3"
                  :ui="{
                    wrapper: '',
                    container: 'rounded-2xl ',
                    media: 'object-cover rounded-2xl',
                  }"
                />
              </div>
              <div class="lg:col-span-6">
                <h2 class="font-bold text-[25px] leading-[25px] lg:text-[32px] lg:leading-[32px] mb-3">
                  {{ item.title }}
                </h2>
                <div
                  class="space-y-2 mb-4 text-justify text-[18px] leading-[22px] custom-html"
                  v-html="item.customHtml"
                ></div>
              </div>
            </div>
          </template>
        </IsliderCarousel>
    </UContainer>

    <!-- Carousel Clientes -->
    <ISliderClients name="colbitumen_clientes"></ISliderClients>


  </div>
</template>
<style scoped>
@reference "~/assets/css/main.css";
:deep(.page-body-h1 h1 ){
  @apply font-extrabold text-center text-[22px] tracking-[1.8px] uppercase;
}

.bg-gradiente-gray {
  background: linear-gradient(0deg, #F3F2F2 0%, #F2F2F2 77%);
}
</style>
