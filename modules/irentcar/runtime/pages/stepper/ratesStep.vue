<script lang="ts" setup>
import GammaOfficeCard from './gammaOfficeCard.vue'
import Resume from './resume.vue'
import {RENT_CTX} from './config'
import type {RentCtx} from './'

const rent = inject<RentCtx>(RENT_CTX)
const availableGammas = rent?.gammaOffices.value ?? []

const formUI = {
  label: 'text-md font-medium text-[#314158]'
}
</script>
<template>
  <div class="grid gap-10 grid-cols-1 lg:grid-cols-3 mt-6">
    <div class="col-span-12 lg:col-span-2 main-stepper">
      <div v-for="gammaOffice in availableGammas" :key="gammaOffice.id"
           class="transition mt-8 rounded-sm">
        <GammaOfficeCard :gamma-office="gammaOffice"/>
        <hr class="border-hr">
      </div>
    </div>

    <!-- Col 2: Side Stepper (Detalles del viaje) -->
    <div class="col-span-12 lg:col-span-1 side-stepper">
      <Resume />
    </div>
  </div>
</template>
