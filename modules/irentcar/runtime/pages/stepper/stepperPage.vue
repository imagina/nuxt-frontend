<script setup lang="ts">
  import {irentcarReservationRepository} from "#irentcar/utils/repository";
  import {STEPS, RENT_CTX, INITIAL_RESERVATION_DATA} from './config'
  import type {ReservationData, RentCtx} from './stepperPage'
  import type {RentAvailability} from "#irentcar/components/IrentCarForm/IrentCarForm";
  import type {GammaOffice} from "#irentcar/types/gammaOffice";
  // --- Steps
  import GammasStep from './gammasStep.vue'
  import ExtrasStep from './extrasStep.vue'
  import ContractStep from './contractStep.vue'
  import ReviewStep from './reviewStep.vue'
  import Resume from '#irentcar/components/IrentcarReservation/IrentcarReservation.vue'

  const settingStore = useIsettingStore()
  useSeoMeta({
    title: () => `Reservación | ${settingStore.get('isite::siteName')}`,
    ogTitle: () => `Reservación | ${settingStore.get('isite::siteName')}`,
    description: () => `Reservación | ${settingStore.get('isite::siteName')}`,
    ogDescription: () => `Reservación | ${settingStore.get('isite::siteName')}`,
  })

  const step = ref(0)
  const completed = ref(false)
  const loading = ref(false)
  const gammaOffices = ref<GammaOffice[]>([])
  const infoExtra = settingStore.get('irentcar::extraInformation')

  const reservationPreview = ref<ReservationData>(INITIAL_RESERVATION_DATA)
  const stepperRef = useTemplateRef('stepperRef')
  const stepComponent = computed(() =>
  {
    switch (step.value)
    {
      case 0:
        return GammasStep
      case 1:
        return ExtrasStep
      case 2:
        return ContractStep
      case 3:
        return ReviewStep
      default:
        return null
    }
  })

  function setReservationPreview (filter: RentAvailability)
  {
    reservationPreview.value = {
      ...INITIAL_RESERVATION_DATA,
      pickupOffice: filter.pickupOffice ?? null,
      pickupOfficeId: filter.pickupOfficeId,
      pickupDate: `${filter.pickupDate} ${filter.pickupTime}`,
      dropoffOfficeId: filter.dropOfficeId,
      dropoffOffice: filter.dropoffOffice ?? null,
      dropoffDate: `${filter.dropDate} ${filter.dropTime}`,
    }
  }

  const getGammaOffices = async (filter: RentAvailability) =>
  {
    loading.value = true
    setReservationPreview(filter)
    const {data} = await irentcarReservationRepository.availableGammas({
      include: 'gamma.files',
      filter: {
        'pickup_office_id': reservationPreview.value?.pickupOfficeId,
        'pickup_date': reservationPreview.value?.pickupDate,
        'dropoff_office_id': reservationPreview.value?.dropoffOfficeId,
        'dropoff_date': reservationPreview.value?.dropoffDate,
      }
    })
    loading.value = false
    gammaOffices.value = data
    step.value = 0
  }

  const next = () => stepperRef.value?.next()
  const prev = () => stepperRef.value?.prev()
  const completeReservation = () => completed.value = true

  const ctx: RentCtx = {
    step, gammaOffices,
    reservationPreview,
    next, prev, completeReservation
  }
  provide(RENT_CTX, ctx)
</script>

<template>
  <section id="irentStepperPage" class="container mx-auto py-10 px-4 sm:px-6 lg:px-10">

    <div v-if="completed" class="flex flex-col items-center justify-center h-screen">
      <UAlert
        title="Reserva Creada"
        description="Tu reserva a sido creada, te enviaremos por correo los detalles de tu reserva."
        color="success"
        :actions="[{ label: 'Volver al inicio', variant: 'soft', color: 'success', to: '/' }]"
      />
    </div>
    <div v-else>
      <!-- Form -->
      <irent-car-form class="mb-10" @submit="getGammaOffices"/>

      <div class="text-center mb-6 text-gray-700">
        En esta seccion podras realizar la reserva de tu vehiculo de manera facil y rapida.
        Escoge en este momento la oficina de recogida y devolucion, las fechas y horas, y el vehiculo que mas se adapte a tus necesidades. <br>
        Te guiaremos paso a paso para completar tu reserva.
      </div>
      <!-- Stepper -->
      <div v-if="!gammaOffices.length" class="text-md text-center font-semibold text-gray-700 mb-2">
        Aquí verás los vehículos disponibles según tu búsqueda
      </div>
      <div v-else>
        <UStepper
          ref="stepperRef"
          v-model="step"
          disabled
          color="secondary"
          :items="STEPS"
          class="w-full"/>

        <!-- Content -->
        <div v-if="stepComponent" class="grid gap-10 grid-cols-1 lg:grid-cols-3 mt-6">
          <div class="col-span-12 lg:col-span-2 main-stepper stepper_list_container">
            <component :is="stepComponent" />
          </div>
          <div class="col-span-12 lg:col-span-1 side-stepper">
            <div v-if="step === 3" class="sticky top-4">
              <div class="side-resumen">
                <div class="stepper-description" v-html="infoExtra"></div>
              </div>
            </div>
            <Resume v-else :reservation="reservationPreview" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
  @reference "~/assets/css/main.css";
  #irentStepperPage {
    .stepper_list_container {
      @apply divide-y divide-gray-200 dark:divide-gray-700;
    }

    .stepper_list_item {
      @apply py-3;
    }

    /***** MAIN ******/

    .main-stepper .stepper-title {
      @apply font-bold text-[20px] text-primary;
    }

    .main-stepper .stepper-title-2 {
      @apply font-bold text-[18px] text-primary;
    }

    .main-stepper .stepper-subtitle {
      @apply font-semibold text-[16px] text-primary;
    }

    .main-stepper .stepper-summary {
      @apply text-[14px];
    }

    .main-stepper .stepper-description {
      @apply text-[15px];

      & a {
        @apply underline;
      }

      & :is(h1,h2,h3,h4) {
        @apply font-bold text-[16px] mb-[10px];
      }

      & ol {
        list-style: decimal !important;
        padding-left: 1.25rem;
      }

      & ul {
        list-style: disc !important;
        padding-left: 1.25rem;
      }

      & hr {
        border-color: #62748E4D;
        margin: 1rem 0;
      }
    }

    /***** SIDE ******/

    .side-stepper .stepper-title {
      @apply font-bold text-[18px] text-primary;
    }

    .side-stepper .stepper-title-2 {
      @apply font-bold text-[16px] text-primary;
    }

    .side-stepper .stepper-subtitle {
      @apply font-semibold text-[16px] text-primary;
    }

    .side-stepper .stepper-summary {
      @apply text-[13px] text-primary;
    }

    .side-stepper .stepper-description {
      @apply text-[14px] text-primary;

      & a {
        @apply underline;
      }

      & :is(h1,h2,h3,h4) {
        @apply font-bold text-[16px] mb-[10px];
      }

      & ol {
        list-style: decimal !important;
        padding-left: 1.25rem;
      }

      & ul {
        list-style: disc !important;
        padding-left: 1.25rem;
      }

      & hr {
        border-color: #62748E4D;
        margin: 1rem 0;
      }
    }

    .form-rent-car {
      @apply bg-gray-100;
    }

    .border-hr {
      border-color: #62748E4D;
      margin: 1rem 0;
    }
  }
</style>
