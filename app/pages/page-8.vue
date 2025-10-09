<script lang="ts">
export const pageMeta = {layout: 'master-comercializadora'}
</script>

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
  <div :class="`page-${page?.id}`">
    <!-- Inicio comercializadora -->
    <ISliderMain name="principal_comercializadora"></ISliderMain>

    <!-- H1 -->
    <section class="home bg-tertiary py-10">
      <UContainer>
        <div class="page-body-h1" v-html="page?.body"></div>
      </UContainer>
    </section>

    <!-- Carousel Soluciones Integrales -->
    <UContainer class="py-10">
      <div class="text-center">
        <div class="text-primary text-[30px] leading-[30px] lg:text-[40px] lg:leading-[40px] font-bold mb-5">
          Nuestras Soluciones Integrales
          <span class="mt-3 block h-1 w-24 mx-auto rounded bg-tertiary"></span>
        </div>
        <div class="text-secondary text-[16px] leading-[18px] lg:text-[20px] lg:leading-[22px] font-bold mb-10" >
          Duis sit amet lectus quis quam accumsan hendrerit. Aenean ultricies dignissim tellus elementum condimentum. Mauris convallis quis mi eu pulvinar.
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
          <div class="mb-6">
            <div class="rounded-2xl bg-white  transition p-3 hover:-translate-y-0.5 ">
              <NuxtLink :to="item.href">
                <IMediaRender
                  :media="item.image"
                  :alt="item.title"
                  aspect-ratio="aspect-16/9"
                  :ui="{
                    wrapper: '',
                    container: 'rounded-2xl ',
                    media: 'object-cover rounded-2xl',
                  }"
                />
              </NuxtLink>

              <!-- Contenido -->
              <div class="p-6">
                <NuxtLink :to="item.href">
                  <h3 class="line-clamp-2 min-h-[44px] text-primary font-bold text-[22px] leading-[22px]">
                    {{ item.title }}
                  </h3>
                </NuxtLink>
                <p class="line-clamp-4 mt-3 mb-8 text-[17px] text-justify leading-[19px]">
                  {{ item.summary }}
                </p>
                <div class="text-right">
                  <UButton
                    :to="item.href"
                    class=" text-tertiary bg-white hover:bg-white active:bg-white hover:font-extrabold text-[18px] leading-[18px]"
                    loading-auto
                    variant="soft"
                    icon="material-symbols:arrow-right-alt"
                    label="Leer Más"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
      </ICarousel>
    </UContainer>

    <!-- Info conocenos -->
    <IsliderCarousel
      system-name="comercializadora_conocenos"
      dots-position="inside-left-middle"
      :carousel-props="{
        dots: false,
        autoplay: true,
        loop: false,
        active: false,
      }">
      <template #item="{ item }">
        <section class="relative py-15 mb-15">
          <div class="absolute inset-0 lg:inset-y-0 lg:left-0 lg:w-1/3 bg-secondary rounded-e-2xl"></div>
          <div class="relative max-w-7xl mx-auto px-4 flex flex-col-reverse lg:flex-row justify-end items-center gap-20 lg:gap-50">
            <!-- Image column -->
            <div class="w-full lg:w-2/5 lg:-mr-[140px]">
              <IMediaRender
                :media="item.files.slideimage"
                :alt="item.title"
                aspect-ratio="auto"
                :ui="{
                  wrapper: '',
                  container: '',
                  media: 'rounded-2xl lg:aspect-4/5 aspect-16/9 shadow-lg object-cover',
                }"
                 />
            </div>
            <!-- Text column -->
            <div class="w-full lg:w-1/2 space-y-6">
              <p class="text-tertiary font-semibold text-[16px] leading-[16px] lg:text-[18px] lg:leading-[18px] mb-2" >
              {{item.summary }}
            </p>
            <h2 class="font-bold text-[25px] leading-[25px] lg:text-[35px] lg:leading-[35px] mb-8">
              {{ item.title }}
              <span class="mt-3 block h-1 w-24 rounded bg-tertiary"></span>
            </h2>
            <div class="space-y-2 mb-6 text-justify text-[18px] leading-[22px] custom-html" v-html="item.customHtml" ></div>
            <UButton
              :label="item.caption"
              :to="item.uri ?? item.url"
              class="px-5 py-3 bg-tertiary rounded-full text-[18px] leading-[18px]"
              loading-auto
            />
            </div>
          </div>
        </section>
      </template>
    </IsliderCarousel>

    <!-- Carousel Esto te puede interesar -->
    <section class="bg-[#F4F8F8]">
      <UContainer class="py-10">
        <div class="text-center">
          <div class="text-primary text-[30px] leading-[30px] lg:text-[40px] lg:leading-[40px] font-bold mb-5">
            Esto te puede Interesar
            <span class="mt-3 block h-1 w-24 mx-auto rounded bg-tertiary"></span>
          </div>
        </div>
        <ICarousel
          :items="soluciones"
          :carousel-props="{
            dots: true,
            loop: true,
            align: 'start',
            autoplay: true,
            ui: {
              item: 'basis-1/2 md:basis-1/3 lg:basis-1/4',
              dot: 'w-[13px] h-[13px] rounded-full data-[state=active]:bg-tertiary',
            },
          }"
          dots-position="outside-bottom-middle"
          arrows-position="inside-between-middle"
        >
          <template #item="{ item, index }">
            <div class="mb-8">
              <div class=" bg-white transition hover:-translate-y-0.5 ">
                <NuxtLink :to="item.href">
                  <IMediaRender
                    :media="item.image"
                    :alt="item.title"
                    aspect-ratio="aspect-16/9"
                    :ui="{
                      wrapper: '',
                      container: ' ',
                      media: 'object-cover ',
                    }"
                  />
                </NuxtLink>

                <!-- Contenido -->
                <div class="p-6">
                  <h3 class=" text-primary line-clamp-2 min-h-[44px] text-primary font-bold text-[22px] leading-[22px]">
                    {{ item.title }}
                  </h3>
                  <p class="line-clamp-4 mt-3 mb-8 text-[16px] leading-[19px] text-secondary">
                    {{ item.summary }}
                  </p>

                  <UButton
                    :to="item.href"
                    class="px-5 py-3 bg-tertiary rounded-full text-[14px] leading-[14px] uppercase"
                    loading-auto
                    label="Ver más"
                  />
                </div>
              </div>
            </div>
          </template>
        </ICarousel>
      </UContainer>
    </section>

    <!-- Banner Contacto -->
    <ISliderHome name="comercializadora_banner"></ISliderHome>


    <!-- Carousel Clientes -->
    <ISliderClients name="colbitumen_clientes"></ISliderClients>


  </div>
</template>
<style scoped>
@reference "~/assets/css/main.css";
:deep(.page-body-h1 h1 ){
  @apply font-extrabold text-white text-center text-[22px] tracking-[1.8px] uppercase;
}
.bg-gradiente-gray {
  background: linear-gradient(0deg, #F3F2F2 0%, #F2F2F2 77%);
}
</style>
