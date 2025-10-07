<script setup lang="ts">
import type { PageData } from '#ipage/types/pages'
import IPostList from '../components/IPostList.vue';

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

const posts = [{},{},{},{}]
</script>

<template>
  <div :class="`page-${page?.id}`">
    <!-- Inicio Laboratorio -->
    <ISliderMain name="principal_laboratorio">
      <template #curve>
        <svg
          class="pointer-events-none absolute left-0 bottom-0 block w-full h-20 text-[#F3F3F3]"
          viewBox="0 0 1920 230"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M1920 0V230H0V0L429.3 158.87C554.95 205.37 690.71 217.57 822.63 194.22L1920 0Z"
                fill="#F3F3F3"/>
        </svg>
      </template>
    </ISliderMain>

    <!-- Carousel Soluciones -->
    <section class="bg-[#F3F3F3] py-10">
      <UContainer>
        <IsliderCarousel system-name="laboratorio_conocenos"
            dots-position="outside-bottom-middle"
            :carousel-props="{
              dots: false,
              loop: false,
              active: false,
              autoplay: false,

            }">
            <template #item="{ item, index }">
              <div class="grid items-center gap-10 lg:grid-cols-12 pb-10">
                <div class="lg:col-span-6">
                  <p class=" text-tertiary font-semibold text-[16px] leading-[16px] lg:text-[18px] lg:leading-[18px] mb-2" >
                    {{item.summary }}
                  </p>
                  <h2 class="font-bold text-[25px] leading-[25px] lg:text-[35px] lg:leading-[35px] mb-3" >
                    {{ item.title }}
                  </h2>
                  <div class="space-y-2 mb-6 text-justify text-[18px] leading-[22px] custom-html" v-html="item.customHtml" ></div>
                  <UButton
                    :label="item.caption"
                    :to="item.uri ?? item.url"
                    class="px-5 py-3 bg-tertiary rounded-full text-[18px] leading-[18px]"
                    loading-auto
                  />
                </div>
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
              </div>
            </template>
          </IsliderCarousel>
      </UContainer>
    </section>

    <!-- H1 -->
    <section class="bg-[#F3F3F3] home py-5">
      <UContainer>
        <div class="page-body-h1" v-html="page?.body"></div>
      </UContainer>
    </section>

    <!-- Servicios Slider -->
    <section class="pt-10">
      <div class="text-center">
        <div class="text-tertiary tracking-[.25em] text-[16px] leading-[16px] lg:text-[18px] lg:leading-[18px] font-bold  mb-2" >
          Conoce que tenemos para ti
        </div>
        <div class="text-primary text-[25px] leading-[25px] lg:text-[35px] lg:leading-[35px] font-bold mb-10" >
          Soluciones Integrales
        </div>
      </div>
      <ICarousel
        :items="soluciones"
        :carousel-props="{
          dots: false,
          loop: true,
          align: 'start',
          autoplay: true,
          ui: {
            item: 'basis-1/2 md:basis-1/3 lg:basis-1/4 shrink-0 p-0',
            root: 'p-0 m-0',
            container: 'gap-0 ms-0',
            viewport: 'm-0',
          },
        }">
        <template #item="{ item, index }">
           <NuxtLink :to="item.href">
            <div class="relative w-full overflow-hidden h-[300px] lg:h-[500px]">
              <IMediaRender
                :media="item.image"
                :alt="item.title"
                aspect-ratio="auto"
                :ui="{ media: 'absolute inset-0 w-full h-full object-cover' }" />
              <div class="absolute inset-0  bg-sombra"></div>
              <!-- Contenido -->
              <div class="relative h-full">
                <div class="h-full flex items-end justify-center text-center text-white px-4">
                    <h2 class="font-bold text-[25px] leading-[25px] lg:text-[32px] lg:leading-[32px] mb-10">
                      {{ item.title }}
                    </h2>
                </div>
              </div>
            </div>
          </NuxtLink>
        </template>
      </ICarousel>
      <div class="text-center py-8">
         <UButton
            to="#"
            class="px-5 py-3 bg-tertiary rounded-full text-[18px] leading-[18px]"
            loading-auto
            label="Ver Todos"
          />
      </div>
    </section>

    <!-- Instalaciones -->
    <IsliderCarousel system-name="laboratorio_instalaciones"
      dots-position="outside-bottom-middle"
      :carousel-props="{
        dots: false,
        loop: false,
        active: false,
        autoplay: false,
          ui: {
            root: ' mb-0',
            viewport: 'mb-0',
          },
      }">
      <template #item="{ item, index }">
        <div class="grid items-center gap-10 lg:grid-cols-12  bg-primary">
          <!-- Texto -->
          <div class="lg:col-span-6 p-20">
            <p class="text-tertiary font-semibold text-[16px] leading-[16px] lg:text-[18px] lg:leading-[18px] mb-2" >
              {{item.summary }}
            </p>
            <h2 class="text-white font-bold text-[25px] leading-[25px] lg:text-[35px] lg:leading-[35px] mb-3" >
              {{ item.title }}
            </h2>
            <div class="text-white space-y-2 mb-6 text-justify text-[18px] leading-[22px] custom-html" v-html="item.customHtml" ></div>
            <UButton
              :label="item.caption"
              :to="item.uri ?? item.url"
              class="px-5 py-3 bg-tertiary rounded-full text-[18px] leading-[18px]"
              loading-auto
            />
          </div>
          <!-- Imagen -->
          <div class="lg:col-span-6 relative w-full h-full">
              <IMediaRender
                :media="item.files.slideimage"
                :alt="item.title"
                aspect-ratio="auto"
                :ui="{
                  wrapper: '',
                  container: ' ',
                  media: 'object-cover inset-0   absolute ',
                }"
              />
          </div>
        </div>
      </template>
    </IsliderCarousel>

    <!-- Carousel Post -->
    <UContainer class="py-20">

      <h2 class=" text-primary mb-10 text-center text-[20px] leading-[20px] lg:text-[38px] lg:leading-[38px] font-extrabold" >
        Esto te puede Interesar
      </h2>

      <IList
        :items="posts"
        :itemComponent="IPostList"
        grid-cols="grid-cols-1 gap-6 lg:gap-8 md:grid-cols-2"
      />

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
.bg-sombra {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
}
</style>
