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
    label: pickupDateTime.date + '  →  ' + dropDateTime.date,
    //icon: 'i-lucide-car',
    reservation: i,
  }
}))

function cancelReservation (reservationId: number)
{
  irentcarReservationRepository.update(reservationId, {status_id: 2})
}
const norm = (s: any) => (s ?? '').toString().toLowerCase().trim()
const STATUS_COLORS: Record<string, string> = {
  'aprobado': 'success',
  'cancelado': 'error',
  'finalizada': 'primary',
  'pendiente': 'warning',
}
const statusColor = (s: any) => STATUS_COLORS[norm(s)] ?? 'neutral'
</script>

<template>
  <UContainer class="reservations py-10">
    <client-only>
      <h1 class="text-2xl font-bold mt-4 mb-4 text-center">Mis Reservaciones</h1>
      <div v-if="loading">
        <div class="p-4 space-y-4">
          <div v-for="i in 3" :key="i" class="flex items-center gap-4">
            <USkeleton class="h-[70px] w-[70px] rounded-sm" />
            <div class="grid gap-2 w-full">
              <USkeleton class="h-4 w-1/2" />
              <USkeleton class="h-2 w-2/3" />
              <USkeleton class="h-2 w-1/3" />
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-if="!reservations.length">
          No existen reservaciones registradas
        </div>
        <div v-else>
          <UAccordion
            :items="items"
            class="mb-3 p-4"
            :ui="{
              item: 'border rounded-lg border-primary px-4 last:pb-3 mb-4 last:border-b-1' ,
              body: 'border rounded-t-lg',
            }">
            <!--Label-->
            <template #default="{ item }">
              <div class="flex gap-3">
                <div>
                  <IMediaRender
                    :media="item.reservation?.gamma.files.mainimage" :alt="item.reservation?.gamma.title"
                    aspect-ratio="aspect-[1/1]"
                    :ui="{
                      wrapper: '',
                      container: 'w-[70px] h-[70px] bg-quaternary rounded-sm px-1',
                      media: ' object-contain rounded-sm' }"/>
                </div>
                <div>
                  <div class="text-primary font-semibold text-lg flex items-center ">
                    <span class="mr-2">{{ item.reservation.gamma.summary }}</span>
                    <UBadge size="sm" :color="statusColor('item.reservation.status.title')">
                      {{ item.reservation.status.title }}
                    </UBadge>
                  </div>
                  <div class="text-secondary uppercase font-bold">{{ item.reservation?.gamma.title }}</div>
                  <i class="fa-regular fa-calendar-range"></i> {{ item.label }}
                </div>
              </div>
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
  </UContainer>
</template>
<style>
@reference "~/assets/css/main.css";
.reservations {

  .stepper_list_container {
    @apply divide-y divide-gray-200 dark:divide-gray-700;
  }

  .stepper_list_item {
    @apply py-4;
  }

  .side-reservation .stepper-title {
    @apply font-bold text-[20px] text-primary;
  }

  .side-reservation .stepper-subtitle {
    @apply font-semibold text-[16px] text-primary;
  }

  .max-w-stepper {
    max-width: 150px;
  }
}
</style>
