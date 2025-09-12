<script lang="ts" setup>
import {RENT_CTX} from './config'
import type {RentCtx, ReservationData} from './'
import type {Extra, GammaOffice} from "#irentcar/types/gammaOffice";

const {formatCurrency} = useNumberFormat()
const rent = inject<RentCtx>(RENT_CTX)
if (!rent) throw new Error('RENT_CTX no disponible')
const resume = computed<ReservationData>(() => rent.reservationData.value)
const selectedGammaOffice = computed<GammaOffice | null>(() => resume.value.gammaOffice)
const selectedExtras = computed<Extra[]>(() => resume.value?.gammaOfficeExtras ?? [])
const reservationPreview = computed(() => rent.reservationData.value.reservation)

function editStep (step: 'extras' | 'gamma')
{
  if (!rent) return;
  switch (step)
  {
    case 'extras':
      rent.step.value = 1
      break
    case 'gamma':
      rent.step.value = 0
      break
  }
}

</script>
<template>
  <div class="sticky top-4 stepper_list_container">
    <!-- Detalles -->
    <div class="side-resume relative stepper_list_item">
      <h3 class="stepper-title mb-3 pr-12">Detalles del viaje</h3>
      <div class="space-y-3 text-sm">
        <div>
          <div class="stepper-subtitle">Oficina de Recogida</div>
          <div class="text-gray-600">{{ resume.pickupOffice?.title }}</div>
        </div>
        <div>
          <div class="stepper-subtitle">Fecha Recogida</div>
          <div class="text-gray-600">{{ resume.pickupDate }} {{ resume.pickupTime }}</div>
        </div>
        <div>
          <div class="stepper-subtitle">Oficina de Devolución</div>
          <div class="text-gray-600">{{ resume.dropoffOffice?.title }}</div>
        </div>
        <div>
          <div class="stepper-subtitle">Fecha Recogida</div>
          <div class="text-gray-600">{{ resume.dropDate }} {{ resume.dropTime }}</div>
        </div>
      </div>
    </div>

    <!-- Selected Gamma Office -->
    <div v-if="selectedGammaOffice" class="side-resume stepper_list_item">
      <div class="flex justify-between items-center">
        <h3 class="stepper-title"> Vehiculo </h3>
        <UButton size="xs" color="info" variant="link" @click="editStep('gamma')">Editar</UButton>
      </div>
      <div class="mt-2">
        <IrentCarGammaCard :item="selectedGammaOffice.gamma" orientation="horizontal"/>
      </div>
    </div>

    <!-- Extras -->
    <div v-if="selectedExtras.length" class="side-resume stepper_list_item">
      <div class="flex justify-between items-center">
        <h3 class="stepper-title">Elegir elementos opcionales</h3>
        <UButton size="xs" color="info" variant="link" @click="editStep('extras')">Editar</UButton>
      </div>

      <template v-for="extra in selectedExtras" :key="extra.id">
        <div class="item">
          <div class="flex justify-between mt-3">
            <div class="font-semibold text-gray-800">{{ extra.title }}</div>
            <div class="font-semibold text-gray-800">{{ formatCurrency(extra.pivot.price) }}</div>
          </div>
          <div class="stepper-description pl-3 pb-3">{{ extra.description }}</div>
        </div>
      </template>
    </div>

    <!-- Total -->
    <div v-if="reservationPreview" class="main-resume stepper_list_item">
      <div class="flex justify-between items-center">
        <h3 class="stepper-title">A pagar a la llegada</h3>
      </div>
      <div class="space-y-1 text-sm">
        <!-- Gamma Office Price -->
        <div>
          <div class="flex justify-between">
            Tarifa básica
            <span class="font-semibold">{{ formatCurrency(reservationPreview.gammaOfficePrice) }}</span>
          </div>
          <div>
            {{ reservationPreview.rentalDays }} Dias x {{ formatCurrency(reservationPreview.gammaOfficePrice) }}
          </div>
        </div>
        <!-- Extras -->
        <div v-if="reservationPreview.extrasData.length">
          <div class="flex justify-between">
            Elementos Extra
            <span class="font-semibold">{{ reservationPreview.gammaOfficeExtraTotalPrice }}</span>
          </div>
          <div>
            {{ reservationPreview.extrasData.map(i => i.title).join(', ') }}
          </div>
        </div>
        <!-- Taxes -->
        <div>
          <div class="flex justify-between">
            Impuesto sobre las ventas ({{ reservationPreview.gammaOfficeTax }}%)
            <span class="font-semibold">{{ reservationPreview.gammaOfficeTaxAmount }}</span>
          </div>
        </div>
        <!-- Total -->
        <div class="flex justify-between">
          Precio Total
          <span class="font-semibold">
            {{ reservationPreview.totalPrice }} <br>
            USD {{ reservationPreview.totalPriceUsd }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
