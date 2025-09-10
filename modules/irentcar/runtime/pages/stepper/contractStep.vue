<script lang="ts" setup>
import NavigationArrows from './navigationArrows.vue'
import NavigationButtons from './navigationButtons.vue'
import Resume from './resume.vue'
import {RENT_CTX} from './config'
import type {RentCtx} from './'

const rent = inject<RentCtx>(RENT_CTX)
if (!rent) throw new Error('RENT_CTX no disponible')

const formUI = {
  label: 'text-md font-medium text-[#314158]'
}
const trip = reactive({
  details: {
    title: 'Detalles del viaje',
    offices: [
      {label: 'Oficina de recogida/devolución', text: 'Bogotá El Dorado International Airport (Bogotá Colombia)'},
    ],
    dates: [
      {
        label: 'Fecha y hora de la recogida',
        text: `${rent.reservationData.value?.pickupDate} ${rent.reservationData.value?.pickupTime}:00`
      },
      {
        label: 'Fecha y hora de devolución',
        text: `${rent.reservationData.value?.dropDate} ${rent.reservationData.value?.dropTime}:00`
      }
    ]
  },
  contact: [
    {label: 'Nombre', value: '', placeholder: "Andres", help: ''},
    {label: 'Apellidos', value: '', placeholder: "Rojas", help: ''},
    {
      label: 'Número de contacto',
      value: '',
      placeholder: "300 XXX XXXX",
      help: 'Para alquileres fuera del país, incluya el prefijo del país (Ej. +1 para USA)'
    },
    {
      label: 'Correo electrónico',
      value: '',
      placeholder: 'correo@mail.com',
      help: 'La confirmación se enviará por correo electrónico'
    }
  ]
})
</script>
<template>
  <div class="grid gap-10 grid-cols-1 lg:grid-cols-3 mt-6">

    <!-- Col: 1 Main Stepper -->
    <div class="col-span-12 lg:col-span-2 main-stepper">

      <NavigationArrows/>

      <div class="main-resume">

        <h4 class="stepper-title mb-3"> Nombre del titular del contrato </h4>

        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 md:col-span-6" v-for="(c, i ) in trip.contact" :key="i">
            <UFormField :label="c.label" :ui="formUI" :help="c.help">
              <UInput size="md" v-model="c.value" :placeholder="c.placeholder" class="w-full"/>
            </UFormField>
          </div>
        </div>

      </div>

      <hr class="border-hr my-4"/>

      <div class="main-resume">
        <div class="stepper-description">
          La información de contacto proporcionada se utilizará para comunicarle datos de transacciones sobre este
          alquiler por teléfono, correo electrónico o mensaje de texto. Para obtener una descripción completa de
          los usos de los datos personales, consulte nuestra Política de privacidad.
        </div>
      </div>

      <hr class="border-hr my-4"/>

      <div class="main-resume">
        <UFormField label="Número de vuelo" :ui="formUI"
                    description="En caso de que su vuelo se retrase, el personal de la oficina de recogida puede gestionar mejor el servicio si dispone de los datos del vuelo (por ejemplo, BA732)">
          <UInput size="md" placeholder="XX000" class="w-full"/>
        </UFormField>
      </div>

      <hr class="border-hr my-4"/>

      <NavigationButtons/>

    </div>

    <!-- Col: 2 Side Stepper -->
    <div class="col-span-12 lg:col-span-1 side-stepper">
      <Resume/>
    </div>
  </div>
</template>
