<script setup lang="ts">
import type { PageData } from "#ipage/types/pages";
const settingStore = useIsettingStore();
defineProps<{ page: PageData }>();

// Info Alquiler que posiblemente venga de un slider
const infoRent = {
  img: "https://components.ozonohosting.com/assets/media/pexels-1266623.jpg?u=1700491876",
  title: "Requisitos de Alquiler",
  summary: "Excelencia Profesional",
  customHtml: `
            <ol>
            <li>La edad mínima para el alquiler del vehículo debe ser de 25 años</li>
            <li>Licencia de conducción vigente. Nacional o Internacional</li>
            <li>Cédula de ciudadanía colombiana, cédula de extranjería o pasaporte</li>
            <li>
                Tarjeta de Crédito para avalar el depósito del vehículo, cupo mínimo de
                $2.000.000 para automóviles y gama premium tipo Nissan Versa $2.700.000
                entre $4.000.000 y $5.000.000 para camionetas.
            </li>
            <li>
                Nuestro equipo está capacitado y entrenado en servicio al cliente y
                habilidades blandas, lo cual nos permite ser un apoyo para su
                organización y sentirse a gusto con las personas que realizarán el trabajo.
            </li>
            <li>
                Recibimos tarjetas bajo Franquicia (Visa, MasterCard, American Express).
                No se reciben tarjetas de crédito virtuales, prepago, con CCV dinámico o
                sin información en el plástico. Tampoco Discovery; sólo tarjetas emitidas
                por bancos.
            </li>
            </ol>
        `,
  url: "/terminos-y-condiciones",
  caption: " Términos & Condiciones ",
};


const textH1 = 'Alquiler de Autos en Colombia con Tarifas Increíbles';
const titlesCart = { title: 'Gamas de Vehículos', subtitle: 'Reserva el tuyo' };
const titles = {
  title: "Contáctanos",
  subtitle: "Te responderemos tan pronto como nos sea posible, ¡Gracias!",
};
const slides = [
  {
    media: { isImage: true, url: 'https://components.ozonohosting.com/assets/media/pexels-1266623.jpg?u=1700491876'} ,
    title: 'Descubre nuevos destinos al volante, con Rent Cars siempre a tu lado'
  },
  {
    media: { isImage: true, url: 'https://components.ozonohosting.com/assets/media/pexels-1266623.jpg?u=1700491876'} ,
    title: 'Tu aventura comienza aquí'
  },
  {
    media: { isImage: true, url: 'https://components.ozonohosting.com/assets/media/pexels-1266623.jpg?u=1700491876'} ,
    title: 'Conduce con tranquilidad'
  }
]


</script>

<style>
.custom-html ol {
  list-style: decimal !important;
  padding-left: 1.25rem;
}
.custom-html li {
  display: list-item;
  margin-bottom: .5rem;
}
.form-contact {
  background: linear-gradient(360deg,
      var(--color-dark-1) 50%,
      var(--color-gray-1) 50%);
}
.overlay-slide {
  background: #00000066;

}
</style>

<template>
  <div>
    <ICarousel
    :items="slides"
    dots-position="inside-left-middle"
    :carousel-props="{
      dots: true,
      arrows: false,
      ui: {
        item: 'h-[260px] sm:h-[360px] md:h-[400px]',
        dot: 'w-[16px] h-[16px] rounded-full bg-[#FFFFFF80] data-[state=active]:bg-secondary'
      }
    }"
  >
    <template #item="{ item }">
      <div class="relative w-full h-full">
          <IMediaRender
              :media="item.media" :alt="item.title"
              aspect-ratio="auto"
              :ui="{
                wrapper: '',
                container: '',
                media: 'absolute inset-0 w-full h-full object-cover' }"
          />
          <div class="absolute inset-0 overlay-slide"></div>
          <div class="relative h-full flex items-center justify-center max-w-3/4 mx-auto">
            <h2 class="text-white text-center font-bold text-2xl sm:text-4xl md:text-5xl">
              {{ item.title }}
            </h2>
          </div>
        </div>
    </template>
    </ICarousel>
    <!-- H1 -->
    <section class="bg-quaternary py-5">
      <div class="container mx-auto  px-4 sm:px-6 lg:px-10">
        <h1 class="text-center text-18 tracking-[1.8px] uppercase mb-10">
          {{ textH1 }}
        </h1>
        <UCard class="shadow-md rounded-3xl mb-5">
         <FormHome />
        </UCard>
      </div>
    </section>
    <!-- List Categorias -->
    <section class="container mx-auto py-10 px-4 sm:px-6 lg:px-10">
      <div class="text-center">
        <div class="text-secondary text-[16px] lg:text-[20px] font-bold uppercase mb-0 ">{{titlesCart.subtitle}}</div>
        <div class="text-primary text-[30px] lg:text-[45px] font-semibold mb-5 ">{{titlesCart.title}}</div>
      </div>
      <!-- Vehiculos-->
    </section>
    <!-- Info -->
    <section class="relative py-15 mb-15">
      <div class="absolute inset-0 lg:inset-y-0 lg:left-0 lg:w-1/3 bg-secondary rounded-e-2xl"></div>
      <div
        class="relative max-w-7xl mx-auto px-4 flex flex-col-reverse lg:flex-row justify-end items-center gap-20 lg:gap-50">
        <!-- Image column -->
        <div class="w-full lg:w-2/5 lg:-mr-[140px]">
          <!--
          <IMediaRender
            :media="infoRent.img" alt="Logo"
            aspect-ratio="auto"
            :ui="{
              wrapper: '',
              container: '',
              media: 'rounded-2xl lg:aspect-4/5 aspect-16/9 shadow-lg object-cover'
            }"/>
             -->
          <img :src="infoRent.img" class="rounded-2xl lg:aspect-4/5 aspect-16/9 shadow-lg object-cover"
            :alt="infoRent.title" />
        </div>
        <!-- Text column -->
        <div class="w-full lg:w-1/2 space-y-6">
          <p
            class="text-white lg:text-secondary text-[16px] lg:text-[20px] font-bold uppercase mb-0 text-center lg:text-left">
            {{ infoRent.summary }}
          </p>
          <h2 class="text-white lg:text-primary text-[30px] lg:text-[45px] font-semibold mb-5 text-center lg:text-left">
            {{ infoRent.title }}
          </h2>
          <div class="space-y-2 text-white lg:text-dark-3 text-[16px] lg:text-[20px] text-justify custom-html"
            v-html="infoRent.customHtml"></div>
          <div class="text-center lg:text-left">
            <UButton :label="infoRent.caption" :to="infoRent.url"
              class="bg-white lg:bg-secondary text-secondary lg:text-white hover:bg-primary hover:text-white px-6 py-4 rounded-lg transition text-[18px] font-semibold leading-[20px]">
            </UButton>
          </div>
        </div>
      </div>
    </section>
    <!-- Form Contacto -->
    <section class="pt-20 form-contact pb-20 px-4">
    <UCard class="shadow-md rounded-3xl lg:max-w-3/4 xl:max-w-1/2 mx-auto">
      <h2 class="text-primary text-center text-[30px] lg:text-[45px] font-semibold mb-2  ">
        {{ titles.title }}
      </h2>
      <p class="text-center text-[16px] lg:text-[18px]  mb-10 ">
        {{ titles.subtitle }}
      </p>
      <FormContact />
    </UCard>
  </section>
  </div>
</template>
