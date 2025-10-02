<script setup >

</script>
<template>
  <section class="relative isolate overflow-hidden h-[clamp(520px,80vh,740px)]">
    <!-- Fondo -->
    <img
      src="/images/requisitos.jpg"
      alt="Hero"
      class="absolute inset-0 -z-10 h-full w-full object-cover"
    />
    <div class="absolute inset-0 -z-10 bg-black/50"></div>

    <!-- Contenido -->
    <div class="relative mx-auto max-w-7xl px-6 lg:px-12 h-full">
      <div class="h-full flex items-center">
        <div class="max-w-2xl text-white">
          <h2 class="text-[36px] leading-[36px] md:text-[46px] md:leading-[46px] lg:text-[56px] lg:leading-[56px] font-bold" >
            El camino hacia la excelencia
          </h2>
          <p class="my-4 text-[25px] leading-[25px] ">
            En Colbitumen desarrollamos soluciones confiables que impulsan
            proyectos duraderos y responsables.
          </p>
          <UButton
            to="#mas-info"
            class="px-5 py-4 bg-tertiary rounded-full text-[18px] leading-[18px]"
            loading-auto
            label="Más Información"
          />

        </div>
      </div>
    </div>

    <!-- Curva inferior: SLOT -->
    <slot name="curve"> </slot>

  </section>
</template>
<style>

</style>
