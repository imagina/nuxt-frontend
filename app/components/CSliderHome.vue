<script setup >

</script>
<template>
    <section class="relative isolate overflow-hidden h-[clamp(320px,80vh,400px)]">
    <!-- Fondo -->
    <img
      src="/images/requisitos.jpg"
      alt="Hero"
      class="absolute inset-0 -z-10 h-full w-full object-cover"
    />
    <div class="absolute inset-0 -z-10 bg-black/50"></div>

    <!-- Contenido -->
    <div class="relative mx-auto max-w-7xl px-6 lg:px-12 h-full">
      <div class="h-full flex items-center justify-center">
        <div class="max-w-2xl text-center text-white">
          <h2 class="font-bold text-[30px] leading-[30px] lg:text-[40px] lg:leading-[40px]" >
            El camino hacia la excelencia
          </h2>
          <p class="mt-4 mb-10 text-[20px] leading-[20px] lg:text-[30px] lg:leading-[30px]" >
            En Colbitumen desarrollamos soluciones confiables que impulsan
            proyectos duraderos y responsables.
          </p>

          <UButton
            to="#mas-info"
            color="secondary"
            class="px-5 py-4 rounded-full text-[18px] leading-[18px]"
            loading-auto
            label="Contáctanos"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<style>

</style>
