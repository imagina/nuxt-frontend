<script lang="ts" setup>
import type {Reservation} from "#irentcar/types/reservation";
import type {Gamma} from "#irentcar/types/gamma";
import type {GammaOfficeExtra} from "#irentcar/types/extra";
import {useIPriceConversion} from "#imports";
import type {ReservationData, StepKey} from "#irentcar/pages/stepper/stepperPage";

const props = defineProps<{ reservation: Reservation | ReservationData | null, canEdit?: boolean }>()
const {formatDate, formatCurrency} = useHelpers()
const {getAsLabel} = useIPriceConversion()
const emit = defineEmits<{ (e: 'edit', val: StepKey): void }>()

const reservation = computed<Reservation>(() => props.reservation as Reservation)
const selectedGamma = computed<Gamma | null>(() => reservation.value.gamma)
const selectedExtras = computed<GammaOfficeExtra[]>(() => reservation.value.extrasData)
const details = computed(() =>([
  {label: 'Oficina de Recogida', value: reservation.value.pickupOffice.title},
  {label: 'Fecha de recogida', value: formatDate(reservation.value.pickupDate)},
  {label: 'Oficina de Devolución', value: reservation.value.dropoffOffice.title},
  {label: 'Fecha de Devolución', value: formatDate(reservation.value.dropoffDate)},
]))
const prices = computed(() =>
{
  const gammaConversions = Object.fromEntries(Object.entries(reservation.value.gammaOfficePriceConversions ?? {})
    .map(([key, value]) => [key, (value * (reservation.value.rentalDays ?? 1)).toFixed(2)])
  )
  const extrasConversions = Object.fromEntries(Object.entries(reservation.value.gammaOfficeExtraTotalPriceConversions ?? {})
    .map(([key, value]) => [key, (value * (reservation.value.rentalDays ?? 1)).toFixed(2)])
  )

  return [
    {
      label: 'Tarifa básica',
      subLabel: `${reservation.value.rentalDays ?? 1} Días X ${formatCurrency(reservation.value.gammaOfficePrice ?? 0)}`,
      value: formatCurrency((reservation.value.gammaOfficePrice ?? 0) * (reservation.value.rentalDays ?? 1)),
      subValue: getAsLabel(gammaConversions),
    },
    {
      label: 'Elementos Extra',
      subLabel: `${reservation.value.rentalDays ?? 1} Días X ${formatCurrency(reservation.value.gammaOfficeExtraTotalPrice ?? 0)}`,
      value: formatCurrency((reservation.value.gammaOfficeExtraTotalPrice ?? 0) * (reservation.value.rentalDays ?? 1)),
      subValue: getAsLabel(extrasConversions),
    },
    {
      label: 'Impuestos sobre las ventas',
      subLabel: `(${reservation.value.gammaOfficeTax ?? 0} %)`,
      value: '(incluido)',
      subValue: '',
    },
    {
      label: 'Precio Total',
      subLabel: '',
      value: formatCurrency(reservation.value.totalPrice ?? 0),
      subValue: getAsLabel(reservation.value.totalPriceConversions) ?? '',
    }
  ]
})
</script>
<template>
  <div class="stepper_list_container">
    <!-- Detalles -->
    <div class="side-reservation relative stepper_list_item">
      <h3 class="stepper-title mb-3 pr-12">Detalles del viaje</h3>
      <div class="space-y-3 text-sm">
        <div v-for="detail in details" :key="detail.label">
          <div class="stepper-subtitle">{{ detail.label}}</div>
          <div class="text-gray-600">{{ detail.value }}</div>
        </div>
      </div>
    </div>

    <!-- Fly number -->
    <div v-if="reservation.options.flyNumber" class="side-reservation stepper_list_item">
      <div class="flex justify-between items-center">
        <h3 class="stepper-title"> Número de vuelo </h3>
        <UButton
          v-if="canEdit"
          size="xs"
          color="info"
          variant="link"
          label="Editar"
          @click="emit('edit','contract')"/>
      </div>
      <div class="mt-2">
        <div class="text-gray-600">{{ reservation.options.flyNumber }}</div>
      </div>
    </div>

    <!-- Selected Gamma Office -->
    <div v-if="selectedGamma" class="side-reservation stepper_list_item">
      <div class="flex justify-between items-center">
        <h3 class="stepper-title"> Vehiculo </h3>
        <UButton
          v-if="canEdit"
          size="xs"
          color="info"
          variant="link"
          label="Editar"
          @click="emit('edit','gamma')"/>
      </div>
      <div class="mt-2">
        <IrentCarGammaCard :item="selectedGamma" orientation="horizontal"/>
      </div>
    </div>

    <!-- Extras -->
    <div v-if="selectedExtras.length" class="side-resume stepper_list_item">
      <div class="flex justify-between items-center">
        <h3 class="stepper-title font-bold text-[20px] text-primary mb-3">Elementos opcionales</h3>
        <UButton
          v-if="canEdit"
          size="xs"
          color="info"
          variant="link"
          label="Editar"
          @click="emit('edit','extras')"/>
      </div>

      <template v-for="item in selectedExtras" :key="item.id">
        <div class="item">
          <div class="flex justify-between mt-3">
            <div class=" text-gray-800">{{ item.extra.title }}</div>
            <div class="font-semibold text-gray-800">{{ formatCurrency(item.price) }}</div>
          </div>
          <div class="flex justify-end stepper-description">
            <div>{{ getAsLabel(item.priceConversions ?? null) }}</div>
          </div>
        </div>
      </template>
    </div>

    <!-- Total -->
    <div v-if="reservation.totalPrice" class="main-resume stepper_list_item">
      <div class="flex justify-between items-center">
        <h3 class="stepper-title font-bold text-[20px] text-primary mb-3">A pagar a la llegada</h3>
      </div>
      <template v-for="p in prices" :key="p.label">
        <div class="item mb-3">
          <div class="flex justify-between">
            <span class="font-semibold text-gray-800">{{ p.label }}</span>
            <span class="font-semibold text-gray-800">{{ p.value }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold text-gray-800">{{ p.subLabel }}</span>
            <span class="font-semibold text-gray-800">{{ p.subValue }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
