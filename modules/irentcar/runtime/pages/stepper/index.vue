<script setup lang="ts">
import {irentcarReservationRepository} from "#irentcar/utils/repository";
import type {GammaOffice} from "#irentcar/types/gammaOffice";
import {steps, RENT_CTX} from './config'
import type {ReservationData, RentCtx} from './'
// --- Steps
import RatesStep from './ratesStep.vue'
import ExtrasStep from './extrasStep.vue'
import ContractStep from './contractStep.vue'
import ReviewStep from './reviewStep.vue'

const step = ref(0)
const loading = ref(false)
const gammaOffices = ref<GammaOffice[]>([])
const reservationData = ref<ReservationData>({})

const getGammaOffices = async (filter: RentAvailability) =>
{
  loading.value = true
  const {data} = await irentcarReservationRepository.availableGammas({
    include: 'gamma.files,extras',
    filter: {
      'pickup_office_id': filter.pickupOfficeId,
      'pickup_date': `${filter.pickupDate} ${filter.pickupTime}`,
      'dropoff_office_id': filter.dropOfficeId,
      'dropoff_date': `${filter.dropDate} ${filter.dropTime}`,
    }
  })
  loading.value = false
  gammaOffices.value = data
  reservationData.value = {...reservationData.value, ...filter}
}

const stepperRef = ref<any>(null)
const next = () => stepperRef.value?.next()
const prev = () => stepperRef.value?.prev()

const ctx: RentCtx = {
  step,
  gammaOffices,
  reservationData,
  next, prev
}
provide(RENT_CTX, ctx)
</script>

<template>
  <section class="container mx-auto py-10 px-4 sm:px-6 lg:px-10">
    <!-- Form -->
    <irent-car-form class="mb-10" @submit="getGammaOffices"/>
    <!-- Stepper -->
    <div v-if="!gammaOffices.length">No Available gammas...</div>
    <UStepper v-else disabled color="secondary" v-model="step" :items="steps" ref="stepperRef" class="w-full">
      <template #rates>
        <RatesStep/>
      </template>

      <template #extras>
        <ExtrasStep/>
      </template>

      <template #contract>
        <ContractStep/>
      </template>

      <template #review>
        <ReviewStep/>
      </template>
    </UStepper>
  </section>
</template>
<style scoped>
@reference "~/assets/css/main.css";
/***** MAIN ******/
.main-stepper .stepper-title {
  @apply font-semibold text-[20px] text-primary;
}

.main-stepper .stepper-subtitle {
  @apply font-bold text-[18px] text-primary;
}

.main-stepper .stepper-summary {
  @apply text-[14px];
}

.main-stepper .stepper-description {
  @apply text-[15px];

  & a, & .active {
    color: var(--color-secondary);
    @apply underline;
  }
}

/***** SIDE ******/
.side-stepper .stepper-title {
  @apply font-semibold text-[18px] text-primary;
}

.side-stepper .stepper-subtitle {
  @apply font-semibold text-[16px] text-primary;
}

.side-stepper .stepper-summary {
  @apply text-[13px] text-primary;
}

.side-stepper .stepper-description {
  @apply text-[14px] text-primary;

  & a, & .active {
    color: var(--color-secondary);
    @apply underline;
  }

  & ol {
    list-style: decimal !important;
    padding-left: 1.25rem;
  }

  & ul {
    list-style: disc !important;
    padding-left: 1.25rem;
  }
}

.form-rent-car {
  @apply bg-gray-100;
}

.border-hr {
  border-color: #62748E4D;
  margin: 1rem 0;
}
</style>
