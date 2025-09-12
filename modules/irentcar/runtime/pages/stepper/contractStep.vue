<script lang="ts" setup>
import NavigationArrows from './navigationArrows.vue'
import NavigationButtons from './navigationButtons.vue'
import Resume from './resume.vue'
import {RENT_CTX} from './config'
import type {RentCtx} from './'

const rent = inject<RentCtx>(RENT_CTX)
if (!rent) throw new Error('RENT_CTX no disponible')

const authUser = computed(() => useIuserAuthStore().user)

const formUI = {label: 'text-md font-medium text-[#314158]'}
</script>
<template>
  <div class="grid gap-10 grid-cols-1 lg:grid-cols-3 mt-6">

    <!-- Col: 1 Main Stepper -->
    <div class="col-span-12 lg:col-span-2 main-stepper">

      <NavigationArrows/>

      <div class="main-resume">
        <h4 class="stepper-title mb-3"> Nombre del titular del contrato </h4>
        <!-- Auth component -->
        <IuserAuth v-if="!authUser"/>
        <!-- User Data -->
        <div v-else>
          datos del usuario: {{authUser.fullName}} - {{authUser.email}}
          <pre>{{authUser.fields}}</pre>
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
