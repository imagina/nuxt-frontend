<script setup lang="ts">
 
interface TimelineItem {
  title: string
  text: string
  photo: object
}

const props = withDefaults(defineProps<{
  items?: TimelineItem[],
}>(), {
  items: () => ([
    {
      title: 'Nace la empresa',
      text: 'Su propósito era abrirse paso en la comercialización y transporte de productos asfálticos.',
      photo: { isImage: true, url: '/images/requisitos.jpg', }
    },
    {
      title: 'Nuevas soluciones y mejoras',
      text: 'El mercado exigía soluciones diferenciadas y mejor desempeño; se empezó a pensar en infraestructura propia.',
      photo: { isImage: true, url: '/images/requisitos.jpg', }
    },
    {
      title: 'Plan para construir una planta',
      text: 'Proyecto para transformar el asfalto desde una operación propia.',
      photo: { isImage: true, url: '/images/requisitos.jpg', }
    },
    {
      title: 'Primera infraestructura',
      text: 'Se levanta infraestructura y se habilita una nueva etapa de innovación.',
      photo: { isImage: true, url: '/images/requisitos.jpg', }
    }
  ])
})

/** Alterna izquierda/derecha por índice */
const isLeft = (i: number) => i % 2 === 0
</script>
<template>
  <div class="bg-history">
    <UContainer>
      <!-- Encabezado -->
      <div class="text-center pt-20 pb-10">
        <h2 class="font-bold text-[30px] lg:text-[40px]">Nuestra Historia</h2>
        <p class="mt-2 text-[16px] lg:text-[20px]"> ¡Entérate cómo ha sido nuestra evolución a través del tiempo! </p>
      </div>
      <section class="relative pt-10 pb-20">

      <!-- Línea vertical central -->
      <div aria-hidden="true"
          class="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] line"></div>

      <!-- Items -->
      <ol class="relative space-y-14 sm:space-y-20">
        <li v-for="(item, i) in items" :key="i" class="relative">
          <!-- Contenedor de 2 columnas -->
          <div class="grid grid-cols-1 md:grid-cols-2 md:gap-16">
            <!-- Lado izquierdo -->
            <div class="md:col-span-1"
                :class="{
                  'md:pr-5 right-item': isLeft(i),
                  'md:order-2 md:pl-5': !isLeft(i)
                }" >
              <div class="relative ">
                <!-- Punto rojo -->
                <span class="hidden md:block absolute top-13 -right-[58px]"
                      :class="!isLeft(i) ? 'right-auto -left-[58px]' : ''">
                  <span class="relative flex h-3 w-3">
                    <span class="absolute inline-flex h-full w-full rounded-full bg-red-500"></span>
                    <span class="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
                  </span>
                </span>

                <!-- Cabecera año + foto -->
                <div class="flex items-center gap-4">
                  <IMediaRender :media="item.photo" :alt="item.title" aspect-ratio="aspect-square"
                                :ui="{  wrapper: 'timeline-text-photo h-[120px] !w-[120px]',
                                  container: '',
                                  media: ' rounded-full object-cover ' }" />
                  <div class="timeline-text-info">
                    <h3 class="text-base sm:text-lg font-semibold leading-snug"> {{ item.title }} </h3>
                    <p class="mt-1 text-sm sm:text-[15px] leading-relaxed text-gray-600"> {{ item.text }} </p>
                  </div>
                </div>

              </div>
            </div>

            <!-- Columna vacía para alternar (solo md+) -->
            <div class="hidden md:block md:col-span-1"></div>
          </div>
        </li>
      </ol>



      </section>
    </UContainer>_
  </div>
</template>
<style>
.bg-history {
  background: linear-gradient(180deg, #F5F5F5 0%, #FAFAFA 100%);
}
.line {
  background: #00000014;
}
.right-item .timeline-text-info {
order: 0; text-align: right;
}
.right-item .timeline-text-photo {
order: 1;
}
</style>
