<script setup lang="ts">
import {irentcarReservationRepository} from '#irentcar/utils/repository'
import Resumen from '#irentcar/components/IrentcarReservation/IrentcarReservation.vue'
import type {ItemsCollapsible} from './reservations'
import type {Reservation} from "#irentcar/types/reservation";

const {data: reservations, pending: loading} = useLazyAsyncData<Reservation[]>(
  'reservations:index',
  () => irentcarReservationRepository.index({include: 'pickupOffice,dropoffOffice,gamma.files'}).then(r => r.data),
  {server: false, default: () => []} // evita fetch en SSR y doble petición
)

function mapDateTime (dateTime: string)
{
  const [date, resto] = dateTime.split('T');
  const time = resto?.replace('Z', '').split('.')[0]; // "16:00:18"
  return {date, time};
}

const items = computed<ItemsCollapsible[]>(() => reservations.value.map(i =>
{
  const pickupDateTime = mapDateTime(i.pickupDate);
  const dropDateTime = mapDateTime(i.dropoffDate)
  return {
    label: pickupDateTime.date + ' - ' + dropDateTime.date,
    icon: 'i-lucide-car',
    reservation: i,
  }
}))

function cancelReservation (reservationId: number)
{
  irentcarReservationRepository.update(reservationId, {status_id: 2})
}
</script>

<template>
  <div class="container mx-auto px-4">
    <client-only>
      <h1 class="text-2xl font-bold mt-4 mb-4 text-center">Mis Reservaciones</h1>
      <div v-if="loading">
        loading...
      </div>
      <div v-else>
        <div v-if="!reservations.length">
          Empty...
        </div>
        <div v-else>
          <UAccordion
            :items="items"
            class="mb-3 p-4"
            :ui="{
              item: 'border rounded-lg border-primary px-3 last:pb-3 mb-4 last:border-b-1' ,
              body: 'border rounded-t-lg',
            }">
            <!--Label-->
            <template #default="{ item }">
              {{ item.reservation.gamma.summary }} <br>
              {{ item.reservation.gamma.title }} ({{ item.label }})
            </template>
            <!-- Content -->
            <template #content="{ item }">
              <Resumen :reservation="item.reservation" class="mb-9"/>
              <div class="text-center border-t pt-4 mb-4">
                <UButton label="Cancelar" color="error" size="sm" @click="cancelReservation(item.reservation.id)"/>
              </div>
            </template>
          </UAccordion>
        </div>
      </div>
    </client-only>
  </div>
</template>
