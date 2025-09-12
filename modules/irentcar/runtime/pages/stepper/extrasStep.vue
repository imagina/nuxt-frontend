<script lang="ts" setup>
import NavigationButtons from './navigationButtons.vue'
import Resume from './resume.vue'
import {RENT_CTX} from './config'
import type {RentCtx} from './'
import type {CheckboxGroupItem} from "#ui/components/CheckboxGroup.vue";
import type {GammaOffice} from "#irentcar/types/gammaOffice";

const rent = inject<RentCtx>(RENT_CTX)
if (!rent) throw new Error('RENT_CTX no disponible')
const {formatCurrency} = useNumberFormat()
const gammaOffice = computed(() => rent.reservationData.value?.gammaOffice)
const gammaOfficeExtras = computed(() => gammaOffice.value?.extras || [])
const extrasSelected = computed(() => rent.reservationData.value?.gammaOfficeExtras || [])
const gammaOfficeExtraIds = computed({
  get: () => extrasSelected.value.map(i => i.id),
  set: (ids: Number[]) => {
    const selected = new Set(ids)
    rent.reservationData.value.gammaOfficeExtras = gammaOfficeExtras.value.filter(e => selected.has(e.id))
  }
})

const nextGammaOffice = computed(() =>
{
  const nextGammaId = gammaOffice.value?.gamma.nextGammaId;
  if (!nextGammaId) return null;
  return rent?.gammaOffices.value.find(i => i.gammaId === nextGammaId);
})

const upgradeGammaOffice = () =>
{
  rent.reservationData.value.gammaOffice = nextGammaOffice.value as GammaOffice
}

const extrasGroup = computed<CheckboxGroupItem[]>(() =>
  gammaOfficeExtras.value.map(extra => ({
    label: `${extra.title} (${formatCurrency(extra.pivot.price)})`,
    id: extra.id,
    description: extra.description,
    price: extra.pivot.price
  }))
)
</script>
<template>
  <div class="grid gap-10 grid-cols-1 lg:grid-cols-3 mt-6">

    <!-- Col: 1 Main stepper -->
    <div v-if="gammaOffice" class="col-span-12 lg:col-span-2 main-stepper stepper_list_container">
      <div class="stepper_list_item grid grid-cols-12 gap-4 items-center">
        <div class="col-span-12 md:col-span-8 ">
          <IrentCarGammaCard :item="gammaOffice.gamma" orientation="horizontal"/>
        </div>
        <div class="col-span-12 md:col-span-4">
          <div class="font-semibold text-gray-800">{{ formatCurrency(gammaOffice.price) }}</div>
          <UButton v-if="nextGammaOffice" color="secondary" size="md"
                   class="block my-1 text-white hover:bg-primary"
                   label="Mejorar" @click="upgradeGammaOffice"/>
        </div>
      </div>

      <!-- Items -->
      <div v-if="extrasGroup.length" class="main-resume stepper_list_item">
        <h4 class="stepper-title mb-2">Elegir elementos opcionales</h4>
        <UCheckboxGroup
          v-model="gammaOfficeExtraIds"
          color="info"
          value-key="id"
          :items="extrasGroup"
        />
      </div>
      <NavigationButtons/>
    </div>

    <!-- Col: 2 Side stepper -->
    <div class="col-span-12 lg:col-span-1 side-stepper">
      <Resume/>
    </div>
  </div>
</template>
