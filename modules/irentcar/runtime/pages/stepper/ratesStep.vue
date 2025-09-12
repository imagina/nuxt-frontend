<script lang="ts" setup>
import Resume from './resume.vue'
import {RENT_CTX} from './config'
import type {RentCtx} from './'
import type {GammaOffice} from "#irentcar/types/gammaOffice";

const rent = inject<RentCtx>(RENT_CTX)
if (!rent) throw new Error('RENT_CTX no disponible')
const availableGammas = computed(() => rent?.gammaOffices.value ?? [])
const selectGammaOffice = (gammaOffice: GammaOffice) =>
{
  rent.reservationData.value.gammaOffice = gammaOffice
  rent.next()
}
</script>
<template>
  <div class="grid gap-10 grid-cols-1 lg:grid-cols-3 mt-6">
    <div class="col-span-12 lg:col-span-2 main-stepper stepper_list_container">
      <template v-for="gammaOffice in availableGammas" :key="gammaOffice.id">
        <div class="stepper_list_item grid grid-cols-12 gap-4 items-center">
          <div class="col-span-12 md:col-span-8 ">
            <IrentCarGammaCard :item="gammaOffice.gamma" orientation="horizontal"/>
          </div>
          <div class="col-span-12 md:col-span-4">
            <div class="font-semibold text-gray-800">$ {{ gammaOffice.price }}</div>
            <UButton color="secondary" size="md" class="block my-1 text-white hover:bg-primary"
                     label="Seleccionar" @click="selectGammaOffice(gammaOffice)"/>
          </div>
        </div>
      </template>
    </div>
    <div class="col-span-12 lg:col-span-1 side-stepper">
      <Resume/>
    </div>
  </div>
</template>
