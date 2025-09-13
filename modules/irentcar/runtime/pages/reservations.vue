<script setup lang="ts">
import {irentcarReservationRepository} from '#irentcar/utils/repository'
import type {Reservation} from '#irentcar/types/reservation'
import type {ReservationData} from "#irentcar/pages/stepper";
import Resumen from '#irentcar/pages/stepper/resume.vue'

const {data: reservations, pending: loading} = useLazyAsyncData<Reservation[]>(
  'reservations:index',
  () => irentcarReservationRepository.index({include: 'pickupOffice,dropoffOffice,gamma.files'}).then(r => r.data),
  {server: false, default: () => []} // evita fetch en SSR y doble petición
)

function mapDateTime (dateTime: string)
{
  const [fecha, resto] = dateTime.split('T');
  const hora = resto?.replace('Z', '').split('.')[0]; // "16:00:18"
  return {fecha, hora};
}

const mappedReservations = computed<ReservationData[]>(() => reservations.value.map(i =>
{
  const pickupDateTime = mapDateTime(i.pickupDate);
  const dropDateTime = mapDateTime(i.dropoffDate);
  return {
    id: i.id,
    pickupDate: pickupDateTime.fecha,
    pickupTime: pickupDateTime.hora,
    dropDate: dropDateTime.fecha,
    dropTime: dropDateTime.hora,
    pickupOffice: i.pickupOffice,
    dropoffOffice: i.dropoffOffice,
    gammaOfficeExtras: i.extrasData.map(e => ({...e.extra, pivot: e.price})),
    gammaOffice: {gamma: i.gamma},
    reservation: i
  }
}))

const items = computed<ReservationData[]>(() => mappedReservations.value.map(i => ({
  label: i.pickupDate + ' - ' + i.dropDate,
  icon: 'i-lucide-car',
  ...i
})))

function cancelReservation(reservationId: number){
  irentcarReservationRepository.update(reservationId, {status_id: 2})
}
</script>

<template>
  <client-only>
    Mis Reservaciones

    <div v-if="!reservations.length">
      Reservations [{{ reservations.length }}]
    </div>
    <div v-else>
      <UAccordion :items="items">
        <!--Label-->
        <template #default="{ item }">
          {{ item.gammaOffice?.gamma.summary }} <br>
          {{ item.gammaOffice?.gamma.title }} ({{ `${item.pickupDate} - ${item.dropDate}` }})
        </template>
        <!-- Content -->
        <template #content="{ item }">
          <Resumen :reservation="item"/>
          <div>
            <UButton label="Cancelar" color="error" size="sm" class="mt-2" @click="cancelReservation(item.id)" />
          </div>
        </template>
      </UAccordion>
    </div>
  </client-only>
</template>
