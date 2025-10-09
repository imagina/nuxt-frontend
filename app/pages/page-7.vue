<script lang="ts">
export const pageMeta = {layout: 'master-asfalcargo'}
</script>

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
    <!-- Inicio Asfalcargo -->
    <ISliderMain name="principal-asfalcargo">
      <template #curve>
        <svg class="pointer-events-none absolute left-0 bottom-[-1px] block w-full h-20 text-white"
          viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,0 C360,120 1080,120 1440,0 L1440,120 L0,120 Z" fill="currentColor" />
        </svg>
      </template>
    </ISliderMain>

    <!-- H1 -->
    <section class="home py-5">
      <UContainer>
        <div class="page-body-h1" v-html="page?.body"></div>
      </UContainer>
    </section>

    <!-- Slider con video -->
    <ISliderVideo name="asfalcargo_conocenos"></ISliderVideo>

    <!-- Servicios -->
    <section class="bg-primary py-10">
      <UContainer>
        <IsliderCarousel system-name="asfalcargo_info_home"
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
          <div class="grid items-center gap-10 lg:grid-cols-12">
            <!-- Texto -->
            <div class="lg:col-span-6 py-10">
              <p class="text-white font-semibold text-[16px] leading-[16px] lg:text-[18px] lg:leading-[18px] mb-2" >
                {{item.summary }}
              </p>
              <h2 class="text-tertiary font-bold text-[25px] leading-[25px] lg:text-[35px] lg:leading-[35px] mb-3" >
                {{ item.title }}
              </h2>
              <div class="text-white space-y-2 mb-6 text-justify font-normal text-[18px] leading-[20px] md:text-[20px] md:leading-[30px] custom-html" v-html="item.customHtml" ></div>
            </div>
            <!-- Imagen -->
            <div class="lg:col-span-6">
                <IMediaRender
                  :media="item.files.slideimage"
                  :alt="item.title"
                  aspect-ratio="aspect-1/1"
                  :ui="{
                    wrapper: '',
                    container: ' rounded-2xl',
                    media: 'object-cover rounded-2xl',
                  }"
                />
            </div>
          </div>
        </template>
        </IsliderCarousel>
      </UContainer>
    </section>

    <!-- Slider reseñas -->
    <section class="bg-resenias pt-20 pb-10">
      <UContainer>
        <h2 class=" text-primary mb-10 text-center text-[20px] leading-[20px] lg:text-[38px] lg:leading-[38px] font-extrabold" >
          Reseñas de Nuestros Clientes
        </h2>
        <IsliderCarousel system-name="asfalcargo_reseñas_clientes"
          dots-position="outside-bottom-middle"
          :carousel-props="{
            dots: true,
            loop: true,
            align: 'start',
            autoplay: true,
            ui: {
              item: 'snap-start grow-0 shrink-0 basis-full lg:basis-1/2',
              dot: 'w-[13px] h-[13px] rounded-full data-[state=active]:bg-tertiary',
            },
          }">
          <template #item="{ item, index }">
            <div class="h-10"></div>
            <article class="relative rounded-2xl bg-white shadow-md ring-1 ring-gray-100 p-10 sm:p-8">
              <!-- círculo comillas -->
              <div class="absolute -top-6 left-1/2 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-red-500 shadow-md">
                <span class="text-white text-xl leading-none"><i class="fa-solid fa-quote-left"></i></span>
              </div>

              <div class="space-y-4 text-[15px] leading-relaxed text-gray-700" v-html="item.customHtml"></div>

              <div class="mt-6 text-center">
                <span class="mx-auto mb-2 block h-1 w-6 rounded bg-red-500"></span>
                <p class="font-semibold text-slate-900">{{ item.title }}</p>
              </div>
            </article>
          </template>
        </IsliderCarousel>
      </UContainer>
    </section>

    <!-- Carousel Post historias de carretera -->
    <UContainer class="pt-10 pb-20">
      <h2 class=" text-primary mb-10 text-center text-[20px] leading-[20px] lg:text-[38px] lg:leading-[38px] font-extrabold" >
        Historias de Carreteras
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
.bg-resenias {
  background: linear-gradient(180deg, #EEEEEE 50%, #FFFFFF 100%);

}
:deep(.custom-html) {

  /* Listas */
  & :is(ul) { @apply list-disc pl-5 mt-[15px]; }
  & :is(ul li) { @apply list-item mb-2; }
  & :is(ol) { @apply list-decimal pl-5 mt-[15px]; }
  & :is(ol li) { @apply list-item mb-2; }

   /* --- Accordion cards --- */
  & details.collapsible-item {
    overflow: hidden;
    color: #ffffff;
    transition: background .2s, border-color .2s, box-shadow .2s;
  }

  & details.collapsible-item[open] {
    border-color: var(--color-tertiary);
  }

  /* ocultar marcador nativo */
  & details.collapsible-item > summary::-webkit-details-marker { display: none; }
  & details.collapsible-item > summary::marker { content: ""; }

  /* cabecera */
  & details.collapsible-item > summary.collapsible-item-title {
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
  & details.collapsible-item > summary .fa-solid,
  & details.collapsible-item > summary .fa-regular {
    font-size: 20px;
    color: var(--color-tertiary);
    margin-right: 6px;
  }

  /* chevron derecho */
  & details.collapsible-item > summary.collapsible-item-title::after {
    content: "";
    margin-left: auto;
    width: 8px; height: 8px;
    border: 2px solid currentColor;
    border-left: 0; border-top: 0;
    transform: rotate(45deg);
    opacity: .7;
    transition: transform .2s ease, opacity .2s ease;
  }
  & details.collapsible-item[open] > summary.collapsible-item-title::after {
    transform: rotate(-135deg);
    opacity: 1;
  }

  /* cuerpo */
  & details.collapsible-item .collapsible-item-body {
    padding: 0 20px 16px 48px;
    color: #374151;
    line-height: 1.7;
  }
  & details.collapsible-item .collapsible-item-body p { margin: 0; }

  /* hover cuando está cerrado */
  & details.collapsible-item:not([open]):hover{
    background: #eeeeee;
    border-color: var(--color-tertiary);
  }

}

</style>
