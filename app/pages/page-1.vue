<script setup lang="ts">
  import type {PageData} from "#ipage/types/pages";
  import CardHome from '~/components/CardHome.vue'

  const settingStore = useIsettingStore();
  defineProps<{ page: PageData }>();

  // Info Alquiler que posiblemente venga de un slider
  const infoRent = {
    img: "/images/photo.jpg",
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
  const titlesCart = {title: 'Gamas de Vehículos', subtitle: 'Reserva el tuyo'};
  const titles = {
    title: "Contáctanos",
    subtitle: "Te responderemos tan pronto como nos sea posible, ¡Gracias!",
  };

  const cars = [
    {id: 1, category: 'Gama E', title: 'Kia picanto mecánico', media: { isImage: true, url: '/images/kia-automatico.jpg'} },
    {id: 2, category: 'Gama E', title: 'Kia picanto automático', media: { isImage: true, url: '/images/kia-automatico.jpg'}},
    {id: 3, category: 'Gama E', title: 'Renault logan mecánico', media: { isImage: true, url: '/images/kia-automatico.jpg'}},
    {id: 4, category: 'Gama E', title: 'Suzuki Swift', media: { isImage: true, url: '/images/kia-automatico.jpg'}},
    {id: 5, category: 'Gama P', title: 'Hyundai Tucson automática', media: { isImage: true, url: '/images/kia-automatico.jpg'}},
    {id: 6, category: 'Gama FL', title: 'Hyundai Tucson automática', media: { isImage: true, url: '/images/kia-automatico.jpg'}},
    {id: 7, category: 'Gama GI', title: 'Nissan X-Trail automática', media: { isImage: true, url: '/images/kia-automatico.jpg'}},
    {id: 8, category: 'Gama GL', title: 'Ford Explorer automática', media: { isImage: true, url: '/images/kia-automatico.jpg'}}
  ]


</script>

<template>
  <div>
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

    <!-- H1 -->
    <section class="bg-quaternary py-5">
      <div class="container mx-auto  px-4 sm:px-6 lg:px-10">
        <h1 class="text-center text-18 tracking-[1.8px] uppercase mb-10">
          {{ textH1 }}
        </h1>
        <UCard class="shadow-md rounded-3xl mb-5">
          <FormHome/>
        </UCard>
      </div>
    </section>
    <!-- List Categorias -->
    <section class="container mx-auto py-10 px-4 sm:px-6 lg:px-10 mb-10">
      <div class="text-center">
        <div class="text-secondary text-[16px] lg:text-[20px]  font-bold uppercase mb-0 ">{{ titlesCart.subtitle }}
        </div>
        <div class="text-primary text-[30px] lg:text-[45px] font-semibold mb-10 ">{{ titlesCart.title }}</div>
        <IList
          :items="cars"
          :item-component="CardHome"
          grid-cols="grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        />
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
          <img :src="infoRent.img" class="rounded-2xl lg:aspect-4/5 aspect-16/9 shadow-lg object-cover w-full"
               :alt="infoRent.title"/>
        </div>
        <!-- Text column -->
        <div class="w-full lg:w-1/2 space-y-6">
          <p
            class="text-white lg:text-secondary text-[16px] lg:text-[20px] font-bold uppercase mb-0 text-center lg:text-left">
            {{ infoRent.summary }}
          </p>
          <h2
            class="text-white lg:text-primary text-[30px] lg:text-[45px]  font-semibold mb-5 text-center lg:text-left">
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
    <FormContact />
  </div>
</template>

<style>
  .custom-html ol {
    list-style: decimal !important;
    padding-left: 1.25rem;
  }

  .custom-html li {
    display: list-item;
    margin-bottom: .5rem;
  }
  .overlay-slide {
    background: #00000066;

  }
</style>
