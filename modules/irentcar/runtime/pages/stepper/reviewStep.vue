<script lang="ts" setup>
import {RENT_CTX} from './config'
import type {RentCtx, ReservationData} from './'
import Resume from "#irentcar/pages/stepper/resume.vue";
const settingStore = useIsettingStore()

const infoExtra = settingStore.get('irentcar::extraInformation')

const rent = inject<RentCtx>(RENT_CTX)
if (!rent) throw new Error('RENT_CTX no disponible')
</script>
<template>
  <div class="grid gap-10 grid-cols-1 lg:grid-cols-3 mt-6">

    <!-- Col: 1 Main Stepper -->
    <div class="col-span-12 lg:col-span-2 main-stepper">
      <Resume/>
    </div>

    <!-- Col: 2 Side Stepper -->
    <div class="col-span-12 lg:col-span-1 side-stepper">
      <div class="sticky top-4">

        <div class="side-resumen">
          <div class="stepper-description" v-html="infoExtra"></div>
        </div>

      </div>
    </div>

  </div>
</template>
