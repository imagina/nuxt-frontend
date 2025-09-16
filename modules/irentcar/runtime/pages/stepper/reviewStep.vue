<script lang="ts" setup>
  import {RENT_CTX} from './config'
  import type {RentCtx, ReservationData} from './stepperPage'
  import type {CreateReservationData} from "#irentcar/types/reservation";
  import {irentcarReservationRepository} from "#irentcar/utils/repository";
  import Resume from "#irentcar/components/IrentcarReservation/IrentcarReservation.vue";

  const rent = inject<RentCtx>(RENT_CTX)
  if (!rent) throw new Error('RENT_CTX no disponible')

  const loading = ref<boolean>(false)
  const errorMessages = ref<string | null>()
  const reservation = computed<ReservationData>((): ReservationData => rent.reservationPreview.value)

  const requestReservationData = computed<CreateReservationData>(() => ({
    pickup_office_id: reservation.value.pickupOfficeId ?? 0,
    pickup_date: reservation.value.pickupDate as string,
    dropoff_office_id: reservation.value.dropoffOfficeId ?? 0,
    dropoff_date: reservation.value.dropoffDate as string,
    gamma_office_id: reservation.value.gammaOffice?.id ?? 0,
    gamma_office_extra_ids: reservation.value.extrasData.map(i => i.id),
    options: {flyNumber: reservation.value.options.flyNumber}
  }))

  async function previewReservation ()
  {
    if (!rent) return
    loading.value = true
    irentcarReservationRepository.preview(requestReservationData.value).then(res =>
    {
      rent.reservationPreview.value.gammaOfficeTax = res.data.gammaOfficeTax
      rent.reservationPreview.value.rentalDays = res.data.rentalDays
      rent.reservationPreview.value.gammaOfficePrice = res.data.gammaOfficePrice
      rent.reservationPreview.value.gammaOfficePriceConversions = res.data.gammaOfficePriceConversions
      rent.reservationPreview.value.gammaOfficeExtraTotalPrice = res.data.gammaOfficeExtraTotalPrice
      rent.reservationPreview.value.gammaOfficeExtraTotalPriceConversions = res.data.gammaOfficeExtraTotalPriceConversions
      rent.reservationPreview.value.totalPrice = res.data.totalPrice
      rent.reservationPreview.value.totalPriceConversions = res.data.totalPriceConversions

    }).catch(err =>
    {
      errorMessages.value = err.data.messages
    }).finally(() => loading.value = false)
  }


  async function createReservation ()
  {
    loading.value = true
    irentcarReservationRepository.create(requestReservationData.value).then(() =>
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
  <div>
    <div class="sticky top-4">
      <Resume :reservation="reservation" can-edit @edit="rent.editStep"/>
    </div>
  </div>
  <div v-if="errorMessages" class="mt-4" >
    <UAlert
      :title="errorMessages"
      color="error"
      :actions="[{label: 'Cerrar', color: 'error', onClick: closeError}]"
    />
  </div>
  <div class="flex justify-end mt-4">
    <UButton
      label="Reservar"
      color="secondary"
      :loading="loading"
      @click="createReservation"
    />
  </div>
</template>
