<script lang="ts" setup>
import {RENT_CTX} from './config'
import type {RentCtx, ReservationData} from './'
import type {Extra, GammaOffice} from "#irentcar/types/gammaOffice";

const rent = inject<RentCtx>(RENT_CTX)
if (!rent) throw new Error('RENT_CTX no disponible')
const resume = computed<ReservationData>(() => rent.reservationData.value)
const selectedGammaOffice = computed<GammaOffice>(() => resume.value.gammaOffice)
const selectedExtras = computed<Extra[]>(() => resume.value?.gammaOfficeExtras ?? [])
</script>
<template>
  <div class="sticky top-4 ">

    <!-- Detalles -->
    <div class="side-resume relative">
      <UButton size="xs" variant="soft" class="text-primary absolute right-0 top-0">Editar</UButton>
      <h3 class="stepper-title mb-3 pr-12">Detalles del viaje</h3>

      <div class="space-y-3 text-sm">
        <div>
          <div class="stepper-subtitle">Oficina de Recogida</div>
          <div class="text-gray-600">{{ resume.pickupOffice.title }}</div>
        </div>
        <div>
          <div class="stepper-subtitle">Fecha Recogida</div>
          <div class="text-gray-600">{{ resume.pickupDate }} {{ resume.pickupTime }}</div>
        </div>
        <div>
          <div class="stepper-subtitle">Oficina de Devolución</div>
          <div class="text-gray-600">{{ resume.dropoffOffice.title }}</div>
        </div>
        <div>
          <div class="stepper-subtitle">Fecha Recogida</div>
          <div class="text-gray-600">{{ resume.dropDate }} {{ resume.dropTime }}</div>
        </div>
      </div>
    </div>

    <hr class="border-hr my-4"/>

    <!-- Selected Gamma Office -->
    <div v-if="selectedGammaOffice" class="side-resume card-mini">
      <div class="grid grid-cols-12 gap-x-4">

        <!-- Texto -->
        <div class="col-span-8">
          <h4 class="stepper-title-2"> {{ selectedGammaOffice.gamma.summary }} </h4>
          <div class="text-[16px] mb-2">{{ selectedGammaOffice.gamma.title }}</div>
          <div class="text-[13px] text-gray-3 mb-2">
            <div class="flex items-center gap-1">
              <Icon size="lg" name="material-symbols:person"/>
              {{ selectedGammaOffice.gamma.passengersNumber }} Pasajeros
            </div>
            <div class="flex items-center gap-1">
              <Icon size="lg" name="mdi:briefcase"/>
              {{ selectedGammaOffice.gamma.luggage }} maletas
            </div>
          </div>
        </div>

        <!-- Imagen -->
        <div class="col-span-3 ">
          <IMediaRender
            :media="selectedGammaOffice.gamma.files.mainimage" :alt="selectedGammaOffice.gamma.title"
            aspect-ratio="aspect-[1/1]"
            :ui="{
                          wrapper: '',
                          container: '',
                          media: 'object-cover rounded-lg' }"/>
        </div>

        <div class="col-span-1">
          <UButton size="xs" variant="soft" class="text-primary">Editar</UButton>
        </div>
      </div>
    </div>

    <hr v-if="selectedExtras.length" class="border-hr my-4"/>

    <!-- Extras -->
    <div v-if="selectedExtras.length" class="side-resume relative">

      <UButton size="xs" variant="soft" class="text-primary absolute right-0 top-0">Editar</UButton>
      <h3 class="stepper-title mb-3 pr-12">Elegir elementos opcionales</h3>

      <template v-for="extra in selectedExtras" :key="extra.id">
        <div class="item">
          <div class="flex justify-between mt-3">
            <div class="font-semibold text-gray-800">{{ extra.title }}</div>
            <div class="font-semibold text-gray-800">{{ extra.pivot.price }}</div>
          </div>
          <div class="stepper-description pl-3 pb-3">{{ extra.description }}</div>
        </div>
      </template>
    </div>

    <hr class=" border-hr my-4"/>

    <!-- Total -->
    <div v-if="selectedGammaOffice" class="main-resume relative">
      <h3 class="stepper-title mb-3">A pagar a la llegada</h3>

      <div class="space-y-1 text-sm">
        <div class="flex justify-between">
          Tarifa básica
          <span class="font-semibold">$000.0000 COP</span>
        </div>
        <div class="flex justify-between">
          Impuesto sobre las ventas (19%)
          <span class="font-semibold">(Incluído)</span>
        </div>
        <div class="flex justify-between">
          Tarifa Aeropuerto: 10% (10%)
          <span class="font-semibold">(Incluído)</span>
        </div>
      </div>

    </div>

    <hr class="border-hr my-4">

    <!-- Price-->
    <div v-if="selectedGammaOffice" class="main-resume relative">
      <div class="flex justify-between items-center">
        <h3 class="stepper-title mb-3">Precio total estimado</h3>
        <div class="stepper-subtitle"><span class="text-gray-3 mr-2">|</span>$000.000 COP</div>
      </div>

      <div class="space-y-3 text-sm">
        <div>A pagar a la llegada</div>
        <div><span class="font-semibold">$000,00 USD</span> ($000.000 COP)</div>
      </div>

    </div>

    <hr class=" border-hr my-4"/>

    <div v-if="selectedGammaOffice" class="stepper-summary text-gray-3">El precio COP que se muestra se convierte de la
      moneda de su
      destino a USD, y está sujeto a modificaciones en función de las variaciones del tipo de divisa.
    </div>

    <hr class="border-hr my-4">
    <div class="stepper-summary text-gray-3 flex items-center mb-3">
      <UIcon name="uis:exclamation-triangle" class="mr-1"></UIcon>
      Con este vehículo puede recorrer un kilometraje ilimitado
    </div>

    <div class="flex justify-end">
      <UButton size="md" variant="soft" class="text-primary">Términos y condiciones del contrato de alquiler
      </UButton>
    </div>

  </div>
</template>
