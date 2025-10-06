<script setup lang="ts">
import {irentcarReservationRepository} from '#irentcar/utils/repository'
import Resumen from '#irentcar/components/IrentcarReservation/IrentcarReservation.vue'
import type {ItemCollapsible} from './reservations'
import type {Reservation} from "#irentcar/types/reservation";

const settingStore = useIsettingStore()
const routerLoading = useIcoreRouterLoading()

useSeoMeta({
  title: () => `Mis Reservaciones | ${settingStore.get('isite::siteName')}`,
  ogTitle: () => `Mis Reservaciones | ${settingStore.get('isite::siteName')}`,
  description: () => `Mis Reservaciones | ${settingStore.get('isite::siteName')}`,
  ogDescription: () => `Mis Reservaciones | ${settingStore.get('isite::siteName')}`,
})
onMounted(() => routerLoading.stop())

const {formatDate} = useHelpers()
const openConfirmationDelete = ref(false)

const {data: reservations, pending: loading, refresh: refreshReservations} = useLazyAsyncData<Reservation[]>(
  'reservations:index',
  () => irentcarReservationRepository.index({
    include: 'pickupOffice,dropoffOffice,gamma.files',
    filter: {statusId: 1}
  }).then(r => r.data),
  {server: false, default: () => []}
)

const items = computed<ItemCollapsible[]>(() => reservations.value.map(i =>
{
  return {
    label: formatDate(i.pickupDate) + '  →  ' + formatDate(i.dropoffDate),
    reservation: i
  }
}))

async function cancelReservation (reservationId: number)
{
  openConfirmationDelete.value = false
  await irentcarReservationRepository.update(reservationId, {status_id: 2})
  await refreshReservations()
}
</script>

<template>
  <UContainer class="reservations py-10">
    <client-only>
      <h1 class="text-2xl font-bold mt-4 mb-4 text-center">Mis Reservaciones</h1>
      <div v-if="loading">
        <div class="p-4 space-y-4">
          <div v-for="i in 3" :key="i" class="flex items-center gap-4">
            <USkeleton class="h-[70px] w-[70px] rounded-sm"/>
            <div class="grid gap-2 w-full">
              <USkeleton class="h-4 w-1/2"/>
              <USkeleton class="h-2 w-2/3"/>
              <USkeleton class="h-2 w-1/3"/>
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
                      container: 'w-[76px] h-[76px] bg-quaternary rounded-sm px-1',
                      media: ' object-contain rounded-sm' }"/>
                </div>
                <div>
                  <div class="text-dark font-semibold text-lg flex items-center ">
                    <span class="mr-2">Nº Confirmación: {{ item.reservation.withPrefix }}{{ item.reservation.id }}</span>
                    <UBadge size="sm" color="success">
                      {{ item.reservation.status.title }}
                    </UBadge>
                  </div>
                  <div class="text-primary font-semibold text-lg flex items-center ">
                  <span class="text-secondary uppercase font-bold">{{ item.reservation?.gamma.title }}</span>
                    <span class="px-2">{{ item.reservation.gamma.summary }}</span>

                  </div>

                  <i class="fa-regular fa-calendar-range"></i> {{ item.label }}
                </div>
              </div>
            </template>
            <!-- Content -->
            <template #content="{ item }">
              <Resumen :reservation="item.reservation" class="mb-9"/>
              <div class="text-center border-t pt-4 mb-4">
                <UPopover v-model:open="openConfirmationDelete">
                  <UButton label="Cancelar" color="error" size="sm"/>
                  <template #content>
                    <div class="p-4">
                      ¿Seguro que quieres cancelar esta reserva?
                      <div class="mt-4 flex justify-end gap-2">
                        <UButton label="No" color="neutral" size="sm"
                                 @click="openConfirmationDelete = false"/>
                        <UButton label="Si" color="error" size="sm"
                                 @click="cancelReservation(item.reservation.id)"/>
                      </div>
                    </div>
                  </template>
                </UPopover>
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
