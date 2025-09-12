<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { irentcarReservationRepository } from '../utils/repository'

interface Extra {
  id: number
  title: string
  description: string
}

interface ExtraData {
  id: number
  gamma_office_id: number
  extra_id: number
  price: string
  extra: Extra
}

interface TransmissionType {
  id: number
  title: string
}

interface FuelType {
  id: number
  title: string
}

interface VehicleType {
  id: number
  title: string
}

interface GammaData {
  id: number
  title: string
  summary: string
  description: string
  transmission_type_id: number
  passengers_number: number
  luggage: number
  doors: number
  fuel_type_id: number
  vehicle_type_id: number
  transmission_type: TransmissionType
  fuel_type: FuelType
  vehicle_type: VehicleType
}

interface Status {
  id: number
  title: string
}

interface Reservation {
  id: number
  userId: number
  gammaId: number
  gammaOfficeId: number
  pickupOfficeId: number
  dropoffOfficeId: number
  pickupDate: string
  dropoffDate: string
  statusId: number
  gammaOfficePrice: string
  gammaOfficeTax: string
  gammaOfficeTaxAmount: number
  gammaOfficeExtraIds: string
  gammaOfficeExtraTotalPrice: string
  totalPrice: string
  totalPriceUsd: number
  options: Record<string, unknown>
  createdAt: string
  updatedAt: string
  status: Status
  gammaData: GammaData
  extrasData: ExtraData[]
}

// Estado de carga y datos
const loading = ref(false)
const reservations = ref<Reservation[]>([])

// Función para obtener reservaciones con Bearer token
const fetchReservations = async () => {
  try {
    loading.value = true

    const response = await irentcarReservationRepository.irentcarReservations()
    reservations.value = response.data
    console.log('Reservaciones obtenidas:', reservations.value)

  } catch (error) {
    console.error('Error al obtener reservaciones:', error)
  } finally {
    loading.value = false
  }
}

// Estado para dropdown de detalles
const expandedReservation = ref<number | null>(null)
const cancellingId = ref<number | null>(null)

// Estado para modal de confirmación de cancelación
const showCancelModal = ref(false)
const reservationToCancel = ref<number | null>(null)

// Métodos para el estado y colores
const getStatusColor = (status: Status): 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral' => {
  const colors = {
    'Pendiente': 'warning' as const,
    'Aprobado': 'primary' as const,
    'Activo': 'success' as const,
    'Completado': 'neutral' as const,
    'Cancelado': 'error' as const
  }
  return colors[status.title as keyof typeof colors] || 'neutral'
}

const getStatusLabel = (status: Status) => {
  return status.title
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const canCancel = (status: Status) => {
  return ['Pendiente', 'Aprobado'].includes(status.title)
}

// Métodos del dropdown
const toggleDetails = (reservationId: number) => {
  expandedReservation.value = expandedReservation.value === reservationId ? null : reservationId
}

// Métodos para modal de confirmación
const openCancelModal = (reservationId: number) => {
  reservationToCancel.value = reservationId
  showCancelModal.value = true

}

const closeCancelModal = () => {
  showCancelModal.value = false
  reservationToCancel.value = null
}

const confirmCancelReservation = async () => {
  if (reservationToCancel.value === null) return

  await handleCancelReservation(reservationToCancel.value)
  closeCancelModal()
}

// Handlers de eventos
const handleCancelReservation = async (id: number) => {
  try {
    cancellingId.value = id
    loading.value = true

    await irentcarReservationRepository.irentcarDeleteReservation(id)

    // Actualizar la reservación localmente
    const reservation = reservations.value.find(r => r.id === id)
    if (reservation) {
      reservation.status = { id: 5, title: 'Cancelado' }
      reservation.statusId = 5
    }

    console.log(`Reservación ${id} cancelada exitosamente`)

  } catch (error) {
    console.error('Error al cancelar reservación:', error)
  } finally {
    loading.value = false
    cancellingId.value = null
  }
}

const handleCreateReservation = () => {
  console.log('Crear nueva reservación')

}


onMounted(() => {
  fetchReservations()
})
</script>

<template>
  <div class="reservations-list">
    <!-- Header -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Mis Reservaciones</h2>
      <p class="text-gray-600">Gestiona tus reservaciones de vehículos</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="space-y-4">
      cargando ...
    </div>

    <!-- Empty State -->
    <div v-else-if="!reservations || reservations.length === 0" class="text-center py-12">

      <h3 class="text-lg font-medium text-gray-900 mb-2">No tienes reservaciones</h3>
      <p class="text-gray-500 mb-6">Cuando hagas una reservación, aparecerá aquí.</p>
      <UButton color="primary" label="Hacer una reservación" @click="handleCreateReservation" />
    </div>

    <!-- Reservations List -->
    <div v-else class="space-y-4">
      <div v-for="reservation in reservations" :key="reservation.id"
        class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
        <!-- Status Badge -->
        <div class="flex justify-between items-start mb-4">
          <div class="flex items-center space-x-3">
            <UBadge :color="getStatusColor(reservation.status)" :label="getStatusLabel(reservation.status)"
              variant="subtle" />
            <span class="text-sm text-gray-500"> ID: # {{ reservation.id }}</span>
          </div>

        </div>

        <!-- Vehicle Info -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">{{ reservation.gammaData.title }}</p>
              <p class="text-sm text-gray-500">{{ reservation.gammaData.summary }}</p>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">{{ formatDate(reservation.pickupDate) }}</p>
              <p class="text-sm text-gray-500">hasta {{ formatDate(reservation.dropoffDate) }}</p>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">${{ reservation.totalPriceUsd }}</p>
              <p class="text-sm text-gray-500">USD</p>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
          <UButton color="primary" variant="outline" size="sm"
            :label="expandedReservation === reservation.id ? 'Ocultar detalles' : 'Ver detalles'"
            @click="toggleDetails(reservation.id)" />

          <UButton v-if="canCancel(reservation.status)" color="error" variant="outline" size="sm"
            :loading="cancellingId === reservation.id" label="Cancelar reservación"
            @click="openCancelModal(reservation.id)" />
        </div>

        <!-- Dropdown de detalles -->
        <div v-if="expandedReservation === reservation.id" class="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 class="text-sm font-semibold text-gray-800 mb-2">Título del Sitio:</h4>
          <p class="text-sm text-gray-600">{{ reservation.gammaData.title }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de confirmación para cancelar - FUERA del div reservations-list -->
  <UModal v-model:open="showCancelModal">
    <template #content>
      <div class="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4 text-center">
          ¿Estás seguro de cancelar la reservación?
        </h3>

        <p class="text-sm text-gray-600 text-center mb-4">
          Reservación ID: {{ reservationToCancel }}
        </p>

        <div class="flex justify-center space-x-4 mt-6">
          <UButton class="mx-3 w-[40px]" @click="closeCancelModal">
            No
          </UButton>
          <UButton color="error" class="mx-3  w-[40px]" :disabled="cancellingId === reservationToCancel"
            @click="confirmCancelReservation">
            Sí
          </UButton>
        </div>
      </div>
    </template>
  </UModal>

</template>

<style scoped>
.reservations-list {
  max-width: 64rem;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>
