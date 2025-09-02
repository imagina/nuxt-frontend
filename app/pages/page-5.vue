<script setup lang="ts">
import type { PageData } from '#ipage/types/pages'
defineProps<{ page: PageData }>()
const impBody = "<div class=\"btgrid\">\n<div class=\"grid grid-cols-12 gap-10 items-center\">\n<div class=\"col-span-12 lg:col-span-6\">\n<div class=\"content\">\n<p><img alt=\"\" src=\"/images/img-quienes-somos.jpg\" style=\"width: 100%; height: 450px; border-radius: 30px; object-fit: cover;\" /></p>\n</div>\n</div>\n\n<div class=\"col-span-12 lg:col-span-6\">\n<div class=\"content\">\n<h2>Requisitos</h2>\n\n<p>En caso que la persona que vaya a conducir no sea el due&ntilde;o de la tarjeta de cr&eacute;dito, este ser&aacute; llamado Conductor Adicional y necesitar&aacute; tener una licencia de conducci&oacute;n v&aacute;lida y vigente.</p>\n</div>\n</div>\n</div>\n</div>\n\n<div class=\"btgrid\">\n<div class=\"grid grid-cols-12 gap-10\">\n<div class=\"col-span-12 lg:col-span-6\">\n<div class=\"content\">\n<h2>Persona Natural</h2>\n\n<p>El conductor principal es quien firma el contrato y deber&aacute; presentar los siguientes documentos a su nombre:</p>\n\n<ul>\n\t<li>C&eacute;dula de ciudadania / Pasaporte vigente</li>\n\t<li>Licencia de conducir nacional o extranjera</li>\n\t<li>Tarjeta de cr&eacute;dito con relieve y fondos para deposito de garantia entre $1.600.000 y $2.600.000</li>\n\t<li>Edad del conductor m&iacute;nimo 23 a&ntilde;os</li>\n</ul>\n</div>\n</div>\n\n<div class=\"col-span-12 lg:col-span-6\">\n<div class=\"content\">\n<h2>Persona Jur&iacute;dica</h2>\n\n<p>El representante legal de la compa&ntilde;&iacute;a es quien firma el contrato, deber&aacute; presentar los siguientes documentos a nombre propio o de la compa&ntilde;&iacute;a:</p>\n\n<ul>\n\t<li>C&aacute;mara de comercio no mayor a 15 d&iacute;as</li>\n\t<li>Registro &Uacute;nico Tributario (RUT) actualizado</li>\n\t<li>Carta de intenci&oacute;n firmada por el representante legal solicitando el servicio y aceptando los T&eacute;rminos y Condiciones</li>\n\t<li>C&eacute;dula de ciudadan&iacute;a / Pasaporte vigente</li>\n\t<li>Licencia de conducci&oacute;n nacional o extranjera</li>\n\t<li>Tarjeta de cr&eacute;dito con relieve y fondos para deposito de garant&iacute;a entre $1.600.000 y $2.600.000</li>\n</ul>\n</div>\n</div>\n</div>\n</div>\n\n<p>&nbsp;</p>"
const titles = { title: 'Nuestros Servicios', subtitle: 'Todo en un sólo lugar' };
const image =  { isImage: true, url: '/images/requisitos.jpg'}

const items = [
  {
    title: 'Servicio 24/7',
    content:
      'Nuestro clientes disponen de una asistencia de 24 horas de manera permanente durante los 365 días al año. Así mismo de nuestro contact center mantenemos sistemas de comunicación bidireccional continua.',
    icon: 'mdi:infinity'
  },
  { title: 'Entrega a domicilio', icon: 'material-symbols:location-on-outline', content: 'Lorem Ipsum is simply dummy text' },
  { title: 'Alquiler de trayecto único', icon: 'tabler:route', content: 'Lorem Ipsum is simply dummy text' },
  { title: 'Conductor elegido: Bilingüe o Escolta.', icon: 'material-symbols:person-check-outline', content: 'Lorem Ipsum is simply dummy text' },
  { title: 'Seguros y coberturas', icon: 'mdi:shield-half-full', content: 'Lorem Ipsum is simply dummy text' },
  { title: 'Servicios adicionales', icon: 'ion:extension-puzzle-outline', content: 'Lorem Ipsum is simply dummy text' },
]

// Clases para que se vea como el diseño
const ui = {
  root: 'space-y-4',
  item: 'rounded-xl border border-rose-200 bg-white',
  trigger: 'px-4 py-3 flex items-center gap-3 text-slate-700 rounded-xl data-[state=open]:rounded-b-none ',
  label: 'font-semibold',
  icon: 'h-5 w-5 text-slate-400 transition-transform data-[state=open]:rotate-180',
  content: 'px-4 pb-4 pt-1 text-[15px] leading-relaxed text-slate-600 rounded-b-xl'
}

</script>

<template>
  <div>
    <!-- Requisitos -->
     <IBreadcrumb
      :title="page.title ?? '...'"
      :ui="{ link: 'font-bold text-gray-3' }">
      <template #extraUp>
        <IsliderCarousel
          system-name="slider_home"
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
      <div class="page-body" v-html="impBody"></div>
      <div class="grid grid-cols-12 gap-10 items-center">
        <div class="col-span-12 md:col-span-6 mb-8">
          <div class="text-secondary text-[16px] lg:text-[20px] leading-[23px] font-bold uppercase mb-0 ">{{titles.subtitle}}</div>
          <div class="text-primary text-[30px] lg:text-[45px]  font-semibold mb-10 ">{{titles.title}}</div>

          <UAccordion :items="items" :ui="ui" :multiple="false">
            <!-- Cabecera personalizada con el Icon -->
            <template #leading="{ item }">
              <span class="flex h-9 w-9 items-center justify-center rounded-full text-secondary" >
                <Icon :name="item.icon" class="h-7 w-7" />
              </span>
              {{ item.title }}
            </template>
          </UAccordion>

        </div>
        <div class="col-span-12 md:col-span-6 mb-8">
          <IMediaRender
            :media="image" alt="imagen"
            aspect-ratio="auto"
            :ui="{
              wrapper: 'h-[750px] w-full',
              container: '',
              media: 'object-cover rounded-4xl' }"
            />
        </div>
      </div>
    </section>
  </div>
</template>
<style>
.requisitos .page-body {
  font-family: DM Sans;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  text-align: justify;

  & h1, & h2, & h3, & h4 {
  font-weight: 600;
  margin-bottom: 15px;
  }
  & h1, h2 {
    font-size: 40px;
    line-height: 50px;
  }
  & h3, & h4 {
    font-size: 20px;
    line-height: 30px;
  }

  & ul {
    list-style: disc !important;
    padding-left: 1.25rem;
    margin-top: 15px;
    & li {
    display: list-item;
    margin-bottom: .5rem;
    }
  }

  & ol {
    list-style: decimal !important;
    padding-left: 1.25rem;
    margin-top: 15px;
    & li {
    display: list-item;
    margin-bottom: .5rem;
    }
  }

  @media (max-width: 767.98px) {
  font-size: 18px;
    & h1, h2 {
    font-size: 30px;
    line-height: 40px;
    }

    & h3, & h4 {
    font-size: 20px;
    line-height: 25px;
    }
  }

  & strong, & a {
  color: var(--primary);
  }

  & hr {
    border-top: 1px solid #00000026;
  }
  & .col-span-12 {
    margin-bottom: 30px;
  }

}

</style>
