<script lang="ts" setup>
import GammaOfficeCard from './gammaOfficeCard.vue'
import NavigationArrows from './navigationArrows.vue'
import NavigationButtons from './navigationButtons.vue'
import Resume from './resume.vue'
import type {CheckboxGroupItem} from '@nuxt/ui'
import {RENT_CTX} from './config'
import type {RentCtx} from './'

const rent = inject<RentCtx>(RENT_CTX)
if (!rent) throw new Error('RENT_CTX no disponible')
const gammaOfficeSelected = computed(() => rent?.reservationData.value.gammaOffice)
const gammaOfficeExtras = computed(() => gammaOfficeSelected.value?.extras || [])
const gammaOfficeExtraIds = ref<number[]>()

const extrasGroup = computed<CheckboxGroupItem[]>(() =>
{
  return gammaOfficeExtras.value.map(extra => ({
    label: extra.title,
    value: extra.id,
    description: extra.description,
    price: extra.pivot.price
  }))
})

const setExtras = () =>
{
  rent.reservationData.value.gammaOfficeExtras = gammaOfficeExtras.value.filter(i =>
    gammaOfficeExtraIds.value.includes(i.id)
  )
}
</script>
<template>
  <div class="grid gap-10 grid-cols-1 lg:grid-cols-3 mt-6">

    <!-- Col: 1 Main stepper -->
    <div class="col-span-12 lg:col-span-2 main-stepper">

      <NavigationArrows/>

      <div class="main-resume info-card">
        <GammaOfficeCard :gamma-office="gammaOfficeSelected" :collapsable="false"/>

        <!-- Description TODO: Pendiente definir de donde sale esto
        <div class="description">
          <h4 class="stepper-title mb-2">Descripción</h4>
          <div class="stepper-description text-primary mb-2">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec leo eu ex lacinia tristique.
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
              Duis rhoncus nisl ac mi laoreet, eu pellentesque dui tincidunt.</p>
            <h5 class="font-semibold my-2">Incluído en la tarifa:</h5>
            <div class="flex items-center gap-1 active">
              <Icon size="lg" color="secondary" name="material-symbols:check-circle-outline"/>
              Impuestos, tasas y cargos
            </div>
            <div class="flex items-center gap-1">
              <Icon size="lg" color="secondary" name="material-symbols:check-circle-outline"/>
              CDW - Protección contra robo
            </div>
            <div class="flex items-center gap-1">
              <Icon size="lg" color="secondary" name="material-symbols:check-circle-outline"/>
              Seguro de responsabilidad civil ante terceros
            </div>
            <div class="flex items-center gap-1">
              <Icon size="lg" color="secondary" name="material-symbols:check-circle-outline"/>
              Asistencia las 24/7
            </div>
          </div>
        </div>-->

      </div>

      <hr class="border-hr my-3">

      <!-- Items -->
      <div v-if="extrasGroup.length" class="main-resume ">
        <h4 class="stepper-title mb-2">Elegir elementos opcionales</h4>
        <UCheckboxGroup v-model="gammaOfficeExtraIds" color="info" :items="extrasGroup" @change="setExtras">
          <template #label="{item}">
            <div class="grid grid-cols-2">
              <div>{{ item.label }}</div>
              <div>{{ item.price }}</div>
            </div>
          </template>
        </UCheckboxGroup>
      </div>

      <hr class="border-hr my-3"/>

      <NavigationButtons/>
    </div>

    <!-- Col: 2 Side stepper -->
    <div class="col-span-12 lg:col-span-1 side-stepper">
      <Resume/>
    </div>
  </div>
</template>
