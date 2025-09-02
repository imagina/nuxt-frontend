<script setup lang="ts">
const settingStore = useIsettingStore()
// const
const logoFooter =  settingStore.get('isite::logo2')
const phone = ['+57 311 8060834','+57 311 8060834']
const address = ['Calle 74 bis 83-45 · Aeropuerto El Dorado de Bogotá · servicio Meet & Greet']
const email = ['serviciocliente@readyrentacars.com']
const items = [
  { label: 'Preguntas frecuentes', to: '#' },
  { label: 'Términos y condiciones', to: '#' },
  { label: 'Política de privacidad', to: '#' },
  { label: 'Contrato de alquiler de autos', to: '#' }
]

</script>

<style scoped>
</style>
<template>
  <footer class="bg-dark-1 text-white">
    <div class="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 py-12  px-4 sm:px-6 lg:px-10">

      <div class="flex justify-center md:justify-start self-center">
        <IMediaRender
            :media="logoFooter" alt="Logo"
            aspect-ratio="auto"
            :ui="{
              wrapper: 'h-[50px] w-[181px]',
              container: '',
              media: 'object-contain' }"
            />
      </div>

      <div class="flex flex-col space-y-4">
        <h3 class="text-lg font-semibold">Info de Contacto</h3>

         <IContactPhone :phone="phone"/>
         <IContactEmail :email="email" />
         <IContactAddress :address="address" />

      </div>

      <div class="flex flex-col space-y-4">
        <h3 class="text-lg font-semibold">Apoyo al Cliente</h3>
        <ul class="space-y-2">
          <li v-for="it in items" :key="it.label">
            <a
              :href="it.to" class="group flex items-center gap-3 px-3 py-0 rounded-md "
            >
              <!-- Triangulito -->
              <span
                class="h-0 w-0 border-y-4 border-y-transparent border-l-6 border-l-white/80
                      group-hover:border-l-white shrink-0" aria-hidden="true"
              />
              <!-- Texto -->
              <span class="text-sm md:text-base">
                {{ it.label }}
              </span>
            </a>
          </li>
        </ul>

      </div>

    </div>
    <div class="bg-dark-2 border-t border-neutral-800">
  <div class="container mx-auto flex flex-col items-center md:flex-row md:justify-between md:items-center px-4 sm:px-6 lg:px-10">
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
