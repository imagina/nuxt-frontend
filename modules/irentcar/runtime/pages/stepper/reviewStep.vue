<script lang="ts" setup>
import {RENT_CTX} from './config'
import type {RentCtx, ReservationData} from './'
import Resume from "#irentcar/pages/stepper/resume.vue";
import type {CreateReservationData} from "#irentcar/types/reservation";
import {irentcarReservationRepository} from "#irentcar/utils/repository";

const settingStore = useIsettingStore()

const infoExtra = settingStore.get('irentcar::extraInformation')

const rent = inject<RentCtx>(RENT_CTX)
if (!rent) throw new Error('RENT_CTX no disponible')

function createReservation ()
{
  console.log("createReservation", rent?.reservationData)
  const data = rent?.reservationData.value;
  if (!data) return;
  const reservationData: CreateReservationData = {
    pickup_office_id: data.pickupOfficeId as number,
    pickup_date: `${data.pickupDate} ${data.pickupTime}`,
    dropoff_office_id: data.dropOfficeId as number,
    dropoff_date: `${data.dropDate} ${data.dropTime}`,
    gamma_office_id: data.gammaOffice?.id ?? 0,
    gamma_office_extra_ids: JSON.stringify(data.gammaOfficeExtras?.map(i => i.id) ?? []),
  }
  irentcarReservationRepository.create(reservationData)
}

</script>
<template>
  <div class="grid gap-10 grid-cols-1 lg:grid-cols-3 mt-6">

    <!-- Col: 1 Main Stepper -->
    <div class="col-span-12 lg:col-span-2 main-stepper">
      <div>
        <Resume/>
      </div>
      <div class="mt-4">
        <UButton
          label="RESERVAR"
          color="secondary"
          class="w-full justify-center"
          @click="createReservation"
        />
      </div>
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
