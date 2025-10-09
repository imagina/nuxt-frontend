<script setup lang="ts">
import IContactSocial from "#icontact/components/IcontactSocial/IContactSocial.vue";
import IContactEmail from "#icontact/components/IcontactEmail/IContactEmail.vue";
import IContactPhone from "#icontact/components/IcontactPhone/IContactPhone.vue";
import IlocationLocatable from "#ilocation/components/IlocationLocatable/IlocationLocatable.vue";


const settingStore = useIsettingStore()
// const
const logoFooter =  settingStore.get('isite::logoIadminSM')

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
  <!-- <IcontactWhatsappFixed /> -->
  <footer class="bg-dark-1 text-white">
    <UContainer class="py-10 text-center">
      <NuxtLink to="/">
        <IMediaRender
            :media="logoFooter" alt="Logo"
            aspect-ratio="auto"
            :ui="{
              wrapper: 'h-[50px] w-auto',
              container: '',
              media: 'object-contain' }"
            />
      </NuxtLink>
    </UContainer>
    <UContainer class="grid gap-10 lg:grid-cols-12">
      <div class="lg:col-span-4 mb-10">
        <h3 class="text-lg font-bold mb-4 uppercase">Hablemos</h3>
        <IContactPhone class-title="hidden" :withHyphen="false" />
        <IContactEmail class-title="hidden" :withHyphen="false" />
      </div>
      <div class="lg:col-span-4 mb-10">
        <h3 class="text-lg font-bold mb-4 uppercase">UBÍCANOS</h3>
        <div class="space-y-1">
          <IlocationLocatable class-component="space-y-2" :layout-inline="true" :withHyphen="false" class-icons="mt-1 mr-2 text-white"/>

        </div>
      </div>
      <div class="lg:col-span-4 mb-10">
        <h3 class="text-lg font-bold mb-4 uppercase">Redes sociales</h3>
          <IContactSocial
            class-social="flex flex-wrap gap-3"
            class-link-social="inline-flex h-10 w-10 items-center justify-center
                              rounded-full border border-white
                              hover:border-secondary transition"
            class-icons="!text-white  text-[16px] leading-none"
          />
      </div>
    </UContainer>
    <div class="border-t border-neutral-800">
      <UContainer class="flex flex-col items-center md:flex-row md:justify-between md:items-center">
        <div class="w-full md:w-auto py-4 text-center md:text-left">
            <ILogoImagina />
        </div>
        <p class="w-full md:w-auto py-4 text-[16px] font-normal text-center md:text-left">
            <ICopyright :with-title-copyright="false" :with-year="false" />
        </p>
      </UContainer>
    </div>
  </footer>
</template>
<style scoped>
</style>
