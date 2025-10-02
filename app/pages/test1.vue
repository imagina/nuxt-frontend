<script setup lang="ts">
import CSliderHome from '~/components/CSliderHome.vue';

const img = {
  isImage: true,
  url: "/images/requisitos.jpg",
};

const logo = {
  isImage: true,
  url: "/images/Logo-colbitumen.png",
};

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

const presentacionColbitumen = {
  summary: "Colbitumen S.A.S. Soluciones que impulsan la industria",
  title:
    "Más de 25 años de trayectoria en la transformación, comercialización y transporte de servicios asfálticos.",
  customHtml: `
    <p>En Colbitumen S.A.S. llevamos más de 25 años de experiencia en transporte y 18 en la transformación y comercialización de soluciones asfálticas que impulsan el desarrollo vial e industrial de Colombia.</p>
    <p>Nuestra fortaleza está en la innovación, la sostenibilidad y la asistencia técnica especializada, que nos permiten acompañar a nuestros clientes con productos confiables y un servicio integral.</p>
    <p>Descubre en este video quiénes somos, qué hacemos y cómo construimos progreso sobre el asfalto.</p>
  `,
  caption: "Conócenos",
  href: "/conocenos",
  video: "EZyLWaDrtbs",
};
</script>

<template>
  <!-- Colbitumen -->
  <CSliderMain>
     <template #curve>
      <svg
      class="pointer-events-none absolute left-0 bottom-[-1px] block w-full h-20 text-white"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,0 C360,120 1080,120 1440,0 L1440,120 L0,120 Z"
        fill="currentColor"
      />
    </svg>
     </template>
  </CSliderMain>

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
  <section class="home bg-quaternary py-5">
    <UContainer>
      <div class="page-body-h1">
        <h1>
          Innovamos y transformamos la industria con soluciones asfálticas
          sostenibles.
        </h1>
      </div>
    </UContainer>
  </section>

  <!-- Slider con video -->
  <UContainer>
    <div class="grid items-center gap-10 lg:grid-cols-12 py-20">
      <!-- Texto -->
      <div class="lg:col-span-6">
        <IMediaRender
          :media="img"
          alt="hola"
          aspect-ratio="aspect-4/3"
          :ui="{
            wrapper: '',
            container: 'rounded-xl',
            media: 'object-cover rounded-xl',
          }"
        />
      </div>

      <!-- Imagen -->
      <div class="lg:col-span-6">
        <p class="font-semibold text-[16px] leading-[16px] lg:text-[18px] lg:leading-[18px] mb-2" >
          {{ presentacionColbitumen.summary }}
        </p>
        <h2 class="font-bold text-[25px] leading-[25px] lg:text-[35px] lg:leading-[35px] mb-3" >
          {{ presentacionColbitumen.title }}
        </h2>
        <div class="space-y-2 mb-6 text-justify text-[18px] leading-[22px] custom-html" v-html="presentacionColbitumen.customHtml" ></div>
        <UButton
          :to="presentacionColbitumen.href"
          class="px-5 py-3 bg-tertiary rounded-full text-[18px] leading-[18px]"
          loading-auto
          label="Ver más"
        />
      </div>
    </div>
  </UContainer>

  <!-- Valores Slider -->
  <section class="bg-gradiente-gray">
    <UContainer class="py-10">
      <div class="text-center">
        <div class="text-tertiary tracking-[.25em] text-[16px] leading-[16px] lg:text-[18px] lg:leading-[18px] font-bold uppercase mb-2" >
          CONOCE NUESTROS
        </div>
        <div class="text-primary text-[25px] leading-[25px] lg:text-[35px] lg:leading-[35px] font-bold mb-10" >
          Nuestros Valores
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
            dot: 'w-[13px] h-[13px] rounded-full data-[state=active]:bg-primary',
          },
        }"
        dots-position="outside-bottom-middle"
        arrows-position="inside-between-middle"
      >
        <template #item="{ item, index }">
          <article class="">
            <IMediaRender
              :media="item.image"
              :alt="item.title"
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
      </ICarousel>
    </UContainer>
  </section>

  <CSliderHome></CSliderHome>

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
    <ICarousel
      :items="soluciones"
      :carousel-props="{
        dots: true,
        loop: true,
        autoplay: true,
        ui: {
          item: '',
          dot: 'w-[13px] h-[13px] rounded-full data-[state=active]:bg-primary',
        },
      }"
      dots-position="outside-bottom-middle"
      arrows-position="inside-between-middle"
    >
      <template #item="{ item, index }">
        <div class="grid items-center gap-10 lg:grid-cols-12 pb-10">
          <div class="lg:col-span-6">
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
          </div>
          <div class="lg:col-span-6">
            <h2 class="font-bold text-[25px] leading-[25px] lg:text-[32px] lg:leading-[32px] mb-3">
              {{ presentacionColbitumen.title }}
            </h2>
            <div
              class="space-y-2 mb-4 text-justify text-[18px] leading-[22px] custom-html"
              v-html="presentacionColbitumen.customHtml"
            ></div>
          </div>
        </div>
      </template>
    </ICarousel>
  </UContainer>

  <!-- Carousel Clientes -->
  <CClients :items-c="soluciones"></CClients>

</template>
<style>
@reference "~/assets/css/main.css";
.bg-gradiente-gray {
  background: linear-gradient(0deg, #f3f2f2 0%, #f2f2f2 77%);
}

.page-body-h1 h1 {
  @apply text-center text-[18px] tracking-[1.8px] uppercase my-6;
}


</style>

