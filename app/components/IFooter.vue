<script setup lang="ts">
const settingStore = useIsettingStore()
// const
const logoFooter =  settingStore.get('isite::logo2')
const address = [{title: 'Oficina Principal:', value:'Calle 74 bis 83-45'}]
const address_extra = [{title: '', value:'Aeropuerto El Dorado de Bogotá · servicio Meet & Greet'}]
const email = [{title: '', value:'reservas@readyrentacars.com'}]
const email_extra = [{title: 'PQRS:', value:'servicioalcliente@readyrentacars.com'}]
const whatsapp = [ { callingCode: '+57', number: '3118060834', message: ''} ]

const desktopNavProps = {
  orientation: 'vertical',
  variant: 'link',
  class: '',
  ui: {
    list: 'flex-col gap-1 w-full',
    link: 'text-sm lg:text-base text-white font-normal hover:text-white hover:underline'
  }
}
</script>
<template>
  <IContactWhatsappFixed />
  <footer class="bg-dark-1 text-white">
    <div class="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 py-12 px-4 sm:px-6 lg:px-10">
      <div class="flex justify-center md:justify-start self-center mx-auto lg:mx-0">
        <NuxtLink to="/">
          <IMediaRender
              :media="logoFooter" alt="Logo"
              aspect-ratio="auto"
              :ui="{
                wrapper: 'h-[50px] w-full md:w-[181px]',
                container: '',
                media: 'object-contain' }"
              />
        </NuxtLink>
      </div>

      <div class="flex flex-col border-footer relative">
        <h3 class="text-lg font-semibold mb-4">Info de Contacto</h3>
          <div class="space-y-1">
            <IContactWhatsapp :whatsapp="whatsapp"/>
            <IContactEmail :email="email" />
            <IContactEmail :email="email_extra" />
            <IContactAddress :address="address" />
            <IContactAddress :address="address_extra" />
          </div>
      </div>

      <div class="flex flex-col space-y-4">
        <h3 class="text-lg font-semibold">Apoyo al Cliente</h3>

        <imenu-menu :with-drawer="false" system-name="inferior-menu" :desktop-nav-props="desktopNavProps" />
      </div>

    </div>
    <div class="bg-dark-2 border-t border-neutral-800">
  <div class="container mx-auto flex flex-col items-center md:flex-row md:justify-between md:items-center px-4 sm:px-6 lg:px-10">
    <div class="w-full md:w-auto py-4 text-center md:text-left">
        <ILogoImagina />
    </div>
    <p class="w-full md:w-auto py-4 text-[16px] font-normal text-center md:text-left">
        <ICopyright :with-title-copyright="false" :with-year="false" />
    </p>
  </div>
</div>
  </footer>
</template>
<style scoped>
.border-footer::before {
  content: '';
  background: #FFFFFF66;
  width: 1px;
  height:calc(100% - 6px);
  position: absolute;
  left: -100px;
  top: 6px;
}
@media (max-width: 1199.98px) {
  .border-footer::before { content: none; }
}
</style>
