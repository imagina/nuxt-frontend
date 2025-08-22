<script setup lang="ts">


definePageMeta({
  layout: 'master'
})


const breadcrumb =  {
    media: { isImage: true, url: 'https://components.ozonohosting.com/assets/media/pexels-1266623.jpg?u=1700491876'} ,
    title: 'Contigo siempre Atención al Cliente'
}

const items = [
  {
    icon: 'i-lucide-help-circle',
    title: 'Preguntas frecuentes',
    desc: '¿Tienes dudas sobre el alquiler de autos? Consulta las respuestas más comunes y encuentra soluciones rápidas a tus inquietudes.',
    href: '/preguntas-frecuentes',
    linkLabel: 'VER PREGUNTAS FRECUENTES'
  },
  {
    icon: 'i-lucide-file-text',
    title: 'Términos y condiciones',
    desc: 'Conoce las reglas generales que aplican a nuestros servicios de alquiler. Lee con atención antes de realizar tu reserva.',
    href: '/terminos-y-condiciones',
    linkLabel: 'VER TÉRMINOS Y CONDICIONES'
  },
  {
    icon: 'i-lucide-shield',
    title: 'Política de privacidad',
    desc: 'Tu información está protegida. Explicamos cómo usamos tus datos y tus derechos.',
    href: '/politica-de-privacidad',
    linkLabel: 'CONSULTAR POLÍTICA DE PRIVACIDAD'
  },
  {
    icon: 'i-lucide-signature',
    title: 'Contrato de alquiler de autos',
    desc: 'Revisa los acuerdos legales entre tú y la empresa al momento de alquilar un vehículo.',
    href: '/contrato.pdf',
    linkLabel: 'DESCARGAR CONTRATO'
  }
]

</script>
<style>
.page-body {
  font-family: DM Sans;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  text-align: justify;

  & h1, & h2, & h3, & h4 {
  font-weight: 700;
  margin-bottom: 15px;
  }
  & h1, h2 {
    font-size: 40px;
    line-height: 50px;
  }
  & h3, & h4 {
    font-size: 34px;
    line-height: 24px;
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


}
</style>

<template>
  <div>
    <!-- Atención al cliente -->
    <div class="relative h-[260px] md:h-[350px]">
      <IMediaRender
          :media="breadcrumb.media" :alt="breadcrumb.title"
          aspect-ratio="auto"
          :ui="{
            wrapper: '',
            container: '',
            media: 'absolute inset-0 w-full h-full object-cover' }"
      />
      <div class="absolute inset-0 overlay-slide"></div>
      <div class="relative h-full flex items-center justify-center max-w-3/4 mx-auto">
        <h2 class="text-white text-center font-bold text-2xl sm:text-4xl md:text-5xl">
          {{ breadcrumb.title }}
        </h2>
      </div>
    </div>
    <IBreadcrumb
      :title="'Atención al cliente'"
      :ui="{ link: 'font-bold text-gray-3' }"
    />
    <section class="container mx-auto py-10 px-4 sm:px-6 lg:px-10">
      <h1 class="page-title hidden">{{ page?.title ?? 'Atención al cliente' }}</h1>
      <!--<div class="page-body" v-html="impBody"></div>-->
      <div class="page-body">
        <div class="grid grid-cols-12 gap-10">
        <div v-for="(it, i) in items" :key="i" class="col-span-12 lg:col-span-6">

        <div class="flex items-center gap-4 mb-4">
          <div class="w-auto flex-none">
            <UIcon :name="it.icon" class="w-6 h-6 md:w-7 md:h-7 text-primary" />
          </div>
          <div class="w-full flex-1">
            <hr class="my-0 w-full">
          </div>
        </div>

        <div class="flex gap-4">
          <div class="flex-1">
            <h3>
              {{ it.title }}
            </h3>
            <p>
              {{ it.desc }}
              <a :href="it.href"
                class="mt-2 inline-block font-semibold uppercase text-blue-1 hover:text-primary/80"
              >
                {{ it.linkLabel }}
              </a>
            </p>


          </div>
        </div>
      </div>
    </div>
      </div>
    </section>
  </div>
</template>
