<script lang="ts" setup>
import type {GammaOffice} from "#irentcar/types/gammaOffice";
import {RENT_CTX} from './config'
import type {RentCtx} from './'

const rent = inject<RentCtx>(RENT_CTX)
if (!rent) throw new Error('RENT_CTX no disponible')

const props = defineProps<{ gammaOffice: GammaOffice }>()
const selectGammaOffice = () =>
{

  rent.reservationData.value.gammaOffice = props.gammaOffice
  rent.next()
}
const nextGammaOffice = computed(() => {
  const nextGammaId = rent?.reservationData.value.gammaOffice.gamma.nextGammaId;
  if(!nextGammaId) return null;
  return rent?.gammaOffices.value.find(i => i.gammaId === nextGammaId);
})
const upgradeGammaOffice = () =>
{
  rent.reservationData.value.gammaOffice = nextGammaOffice.value
}
</script>
<template>
  <div class="grid grid-cols-12 justify-between gap-4">
    <!-- Texto -->
    <div class="col-span-8 md:col-span-6 ">
      <h4 class="stepper-title"> {{ gammaOffice.gamma.summary }} </h4>
      <div class="text-[16px] text-secondary uppercase mb-2 font-normal">{{ gammaOffice.gamma.title }}</div>
      <div class="flex items-center gap-3 text-[13px] text-gray-3 mb-2">
        <div class="flex items-center gap-1">
          <Icon size="lg" name="mdi:car-shift-pattern"/>
          {{ gammaOffice.gamma.transmissionType.title }}
        </div>
        <div class="flex items-center gap-1">
          <Icon size="lg" name="material-symbols:person"/>
          {{ gammaOffice.gamma.passengersNumber }}
        </div>
        <div class="flex items-center gap-1">
          <Icon size="lg" name="mdi:briefcase"/>
          {{ gammaOffice.gamma.luggage }}
        </div>
      </div>
    </div>

    <!-- Imagen  -->
    <div class="col-span-4 md:col-span-2 ">
      <IMediaRender
        :media="gammaOffice.gamma.files.mainimage" :alt="gammaOffice.gamma.title"
        aspect-ratio="aspect-[1/1]"
        :ui="{
                        wrapper: '',
                        container: '',
                        media: 'object-cover rounded-lg' }"/>
    </div>

    <!-- Precio / CTA -->
    <div class="col-span-4 md:col-span-2 md:col-start-11 ">
      <div class="font-semibold text-gray-800">$ {{ gammaOffice.price }}</div>
      <UButton v-if="rent.step.value === 0" color="secondary" size="md" class="block my-1 text-white hover:bg-primary"
               label="Seleccionar" @click="selectGammaOffice"/>
      <UButton v-if="rent.step.value === 1 && nextGammaOffice" color="secondary" size="md"
               class="block my-1 text-white hover:bg-primary"
               label="Mejorar" @click="upgradeGammaOffice"/>
      <NuxtLink to="" class="text-blue-1 text-[12px] underline">Detalles del precio</NuxtLink>
    </div>


    <div class="col-span-12">
      <details class="group inline px-0">
        <summary
          class="list-none inline-flex text-[14px] items-center gap-1 text-blue-600 cursor-pointer hover:underline mb-3">
          <Icon name="tabler:caret-down-filled" class="h-4 w-4 transition-transform group-open:rotate-270"/>
          Detalles
        </summary>
        <div class="text-md text-gray-600 flex items-center" v-html="gammaOffice.gamma.description"></div>
      </details>
    </div>
  </div>
</template>
