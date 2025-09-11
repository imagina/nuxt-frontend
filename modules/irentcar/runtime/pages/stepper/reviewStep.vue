<script lang="ts" setup>
import {RENT_CTX} from './config'
import type {RentCtx, ReservationData} from './'
import Resume from "#irentcar/pages/stepper/resume.vue";

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
          <h4 class="stepper-title mb-2"> Datos clave del alquiler </h4>
          <div class="stepper-description">
            <p>Descripción general de los detalles más importantes sobre los términos de su alquiler</p>
            <ul>
              <li>Inclusiones y exclusiones</li>
              <li>Costes adicionales posibles y mucho más</li>
            </ul>
            <p><a href="">Lea los datos clave del alquiler </a></p>
          </div>
        </div>

        <hr class=" border-hr my-4"/>

        <div class="side-resumen">

          <h4 class="stepper-title mb-2"> Información adicional </h4>
          <div class="stepper-description">
            <ul>
              <li>Conductor adicional</li>
              <li>Servicio fuera del horario de atención</li>
              <li>Requisitos de edad</li>
              <li>Entrega y recogida</li>
              <li>Protección de franquicia</li>
              <li>Entregas en otra oficina</li>
              <li>Exención de responsabilidad por daños de colisión y protección contra robo</li>
              <li>Servicio de repostaje</li>
              <li>Otras políticas</li>
              <li>Formas de pago</li>
              <li>Protección en carretera</li>
              <li>Requisitos del arrendatario</li>
              <li>Responsabilidad civil por daños a terceros</li>
            </ul>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
