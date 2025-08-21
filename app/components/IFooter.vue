<script setup lang="ts">
import { ref } from 'vue'

// const
const logoWhite = ref('https://components.ozonohosting.com/assets/media/logo-10-horizontal-blanco-ready-rent-cars.png?u=1753915846')
const phone = ref(['+57 311 8060834','+57 311 8060834'])
const address = ref(['Calle 74 bis 83-45 · Aeropuerto El Dorado de Bogotá · servicio Meet & Greet'])
const email = ref(['serviciocliente@readyrentacars.com'])

</script>

<style scoped>
</style>
<template>
  <footer class="bg-dark-1 text-white">
    <div class="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 py-12 px-3">

      <div class="flex justify-center md:justify-start self-center">
        <img :src="logoWhite" style="width:181px; height:50px; object-fit: contain;" alt="Rent Cars">
        <!--
        <IMedia
          alt="Rent Cars"
          :base-src="logoWhite"
          width="w-[181px]"
          height="h-[50px]"
          object="contain"
          link-href="/"
        />-->
      </div>

      <div class="flex flex-col space-y-4">
        <h3 class="text-lg font-semibold">Info de Contacto</h3>

         <IContactPhone :phones="phone"/>
         <IContactAddress :address="address" />
         <IContactEmail :email="email" />
      </div>

      <div class="flex flex-col space-y-4">
        <h3 class="text-lg font-semibold">Apoyo al Cliente</h3>
        <!--
          <MenuDesktop
            :menuItems="menuFooter"
            iconFont="fa-solid:caret-right"
            menuOrientation="vertical"
            :menuUI="menuUI"
          />-->
      </div>

    </div>
    <div class="bg-dark-2 border-t border-neutral-800">
  <div class="container mx-auto flex flex-col items-center
              md:flex-row md:justify-between md:items-center px-3">
    <div class="w-full md:w-auto py-4 text-center md:text-left">
        <ILogoImagina />
    </div>
    <p class="w-full md:w-auto py-4 text-[16px] font-normal text-center md:text-left">
        <ICopyright />
    </p>
  </div>
</div>
  </footer>
</template>
