<script lang="ts" setup>
  import {RENT_CTX} from './config'
  import type {RentCtx} from './stepperPage'
  import type {GammaOffice} from "#irentcar/types/gammaOffice";
  import {useIPriceConversion} from "#irentcar/composables/useIPriceConversion";

  const rent = inject<RentCtx>(RENT_CTX)
  if (!rent) throw new Error('RENT_CTX no disponible')

  const {formatCurrency} = useHelpers()
  const {getAsLabel} = useIPriceConversion()
  const availableGammas = computed(() => rent.gammaOffices.value ?? [])

  const selectGammaOffice = (gammaOffice: GammaOffice) =>
  {
    rent.reservationPreview.value.extrasData = []
    rent.reservationPreview.value.gammaOffice = gammaOffice
    rent.reservationPreview.value.gamma = gammaOffice.gamma
    rent.next()
  }
</script>
<template>
  <template v-for="gammaOffice in availableGammas" :key="gammaOffice.id">
    <div class="stepper_list_item grid grid-cols-12 gap-4 items-center">
      <div class="col-span-12 md:col-span-9">
        <IrentCarGammaCard :item="gammaOffice.gamma" orientation="horizontal"/>
      </div>
      <div class="col-span-12 md:col-span-3">
        <div class="font-semibold text-gray-800 text-center md:text-right">
          {{ formatCurrency(gammaOffice.price) }}
        </div>
        <div class="stepper-description text-center md:text-right">
          {{ getAsLabel(gammaOffice.priceConversions ?? null)}}
        </div>
        <div class="flex justify-center md:justify-end">
          <UButton
            color="secondary"
            size="md"
            class="block my-1 text-white hover:bg-primary"
            label="Seleccionar"
            @click="selectGammaOffice(gammaOffice)"
          />
        </div>
      </div>
    </div>
  </template>
</template>
