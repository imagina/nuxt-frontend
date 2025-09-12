<script lang="ts" setup>
import NavigationArrows from './navigationArrows.vue'
import NavigationButtons from './navigationButtons.vue'
import Resume from './resume.vue'
import {RENT_CTX} from './config'
import type {RentCtx} from './'

const rent = inject<RentCtx>(RENT_CTX)
if (!rent) throw new Error('RENT_CTX no disponible')

const authUser = computed(() => useIuserAuthStore().user)
const flyNumberModel = computed({
  get: () => rent.reservationData.value.flyNumber ?? '',
  set: (val: string) => {
    rent.reservationData.value.flyNumber = val.trim().toUpperCase()
  }
})

const formUI = {label: 'text-md font-medium text-[#314158]'}
const userData = computed(() =>
{
  if (!authUser) return null
  return [
    {label: 'Nombre', value: authUser.value?.fullName},
    {label: 'Email', value: authUser.value?.email},
    {label: 'Teléfono', value: authUser.value?.fields.phone ?? '-'},
  ]
})
</script>
<template>
  <div class="grid gap-10 grid-cols-1 lg:grid-cols-3 mt-6">

    <!-- Col: 1 Main Stepper -->
    <div class="col-span-12 lg:col-span-2 main-stepper">

      <NavigationArrows/>

      <div class="main-resume">
        <h4 class="stepper-title mb-3"> Detalles del contrato </h4>
        <!-- Auth component -->
        <div v-if="!authUser" class="w-full max-w-80 mx-auto mb-6">

          <p class="text-center text-sm mb-2">Ingresa o regístrate para completar la reserva</p>

          <IuserAuth />
        </div>
        <!-- User Data -->
        <div v-else>
          <h4 class="stepper-subtitle mb-3"> Datos del conductor </h4>

          <template v-for="(ud, index) in userData" :key="index">
            <div class="text-sm font-bold">{{ ud.label }}</div>
            <div class="text-gray-600">{{ ud.value }}</div>
          </template>
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
          <UInput
            v-model="flyNumberModel"
            size="md"
            placeholder="XX000"
            class="w-full"
          />
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
<style scoped>
:deep(.auth-title) {
  display: none;
}
</style>
