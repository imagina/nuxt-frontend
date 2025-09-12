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
const loading = ref<boolean>(false)
const errorMessages = ref<string | null>()
const reservationData = computed<ReservationData>((): ReservationData => rent.reservationData.value)
const requestReservationData = computed<CreateReservationData>(() => ({
  pickup_office_id: reservationData.value.pickupOfficeId as number,
  pickup_date: `${reservationData.value.pickupDate} ${reservationData.value.pickupTime}`,
  dropoff_office_id: reservationData.value.dropOfficeId as number,
  dropoff_date: `${reservationData.value.dropDate} ${reservationData.value.dropTime}`,
  gamma_office_id: reservationData.value.gammaOffice?.id ?? 0,
  gamma_office_extra_ids: JSON.stringify(reservationData.value.gammaOfficeExtras?.map(i => i.id) ?? []),
}))

async function previewReservation ()
{
  loading.value = true
  irentcarReservationRepository.preview(requestReservationData.value).then(res =>
  {
    if (rent) rent.reservationData.value.reservation = res.data
  }).catch(err =>
  {
    errorMessages.value = err.data.messages
  }).finally(() => loading.value = false)
}


async function createReservation ()
{
  loading.value = true
  irentcarReservationRepository.create(requestReservationData.value).then(res =>
  {
    rent?.completeReservation()
  }).catch(err =>
  {
    errorMessages.value = err.data.messages
  }).finally(() => loading.value = false)
}

function closeError ()
{
  errorMessages.value = null
}

onMounted(() => previewReservation())
</script>
<template>
  <div class="grid gap-10 grid-cols-1 lg:grid-cols-3 mt-6">

    <!-- Col: 1 Main Stepper -->
    <div class="col-span-12 lg:col-span-2 main-stepper">
      <div>
        <Resume/>
      </div>
      <div class="mt-4">
        <UAlert
          v-if="errorMessages"
          :title="errorMessages"
          color="error"
          :actions="[{label: 'Cerrar', color: 'error', onClick: closeError}]"
        />
      </div>
      <div class="flex justify-end mt-4">
        <UButton
          label="RESERVAR"
          color="secondary"
          :loading="loading"
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
