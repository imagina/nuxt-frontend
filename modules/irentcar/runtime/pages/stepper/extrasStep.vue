<script lang="ts" setup>
  import NavigationButtons from './navigationButtons.vue'
  import {RENT_CTX} from './config'
  import type {ExtrasCheckBoxItem, RentCtx} from './stepperPage'
  import type {CheckboxGroupItem} from "#ui/components/CheckboxGroup.vue";
  import type {GammaOffice} from "#irentcar/types/gammaOffice";
  import {irentcarGammaOfficeExtraRepository} from "#irentcar/utils/repository";
  import type {GammaOfficeExtra} from "#irentcar/types/extra";

  const rent = inject<RentCtx>(RENT_CTX)
  if (!rent) throw new Error('RENT_CTX no disponible')

  const {formatCurrency} = useHelpers()
  const loading = ref<boolean>(false)
  const gammaOffice = computed<GammaOffice | null>(() => rent.reservationPreview.value?.gammaOffice)
  const gammaOfficeExtras = ref<GammaOfficeExtra[]>([])

  async function getExtras ()
  {
    loading.value = true
    gammaOfficeExtras.value = []
    const {data} = await irentcarGammaOfficeExtraRepository.index({
      filter: {gammaOfficeId: gammaOffice.value?.id ?? 0},
      include: 'extra',
    })
    gammaOfficeExtras.value = data ?? []
    loading.value = false
  }

  const gammaOfficeExtraIds = computed({
    get: () => rent.reservationPreview.value.extrasData.map(i => i.id),
    set: (ids: number[]) =>
    {
      const selected = new Set(ids)
      rent.reservationPreview.value.extrasData = gammaOfficeExtras.value.filter(e => selected.has(e.id))
    }
  })
  const nextGammaOffice = computed<GammaOffice | null>(() =>
  {
    const nextGammaId = gammaOffice.value?.gamma.nextGammaId;
    if (!nextGammaId) return null;
    return rent?.gammaOffices.value.find(i => i.gammaId === nextGammaId) ?? null;
  })

  const upgradeGammaOffice = () =>
  {
    const next = unref(nextGammaOffice)
    if (!next || !next.gamma) return
    rent.reservationPreview.value.extrasData = []
    rent.reservationPreview.value.gammaOffice = next
    rent.reservationPreview.value.gamma = next.gamma
    getExtras()
  }


  const extrasGroup = computed<ExtrasCheckBoxItem[]>(() =>
    gammaOfficeExtras.value.map(i => {
      return {
        label: i.extra.title,
        id: i.id,
        description: i.extra.description,
        price: i.price,
        priceConversions: Object.entries(i.priceConversions ?? {})
          .map(([currency, value]) => `${currency} ${value}`)
          .join(', '),
      }
    })
  )

  onMounted(() => getExtras())
</script>
<template>
  <div v-if="gammaOffice" class="stepper_list_item grid grid-cols-12 gap-4 items-center">
    <div class="col-span-12 md:col-span-9">
      <IrentCarGammaCard :item="gammaOffice.gamma" orientation="horizontal"/>
    </div>
    <div class="col-span-12 md:col-span-3">
      <div class="font-semibold text-gray-800 text-center md:text-right">{{
          formatCurrency(gammaOffice.price)
        }}
      </div>
      <div class="flex justify-center md:justify-end">
        <UButton
          v-if="nextGammaOffice"
          color="secondary"
          size="md"
          class="block my-1 text-white hover:bg-primary"
          label="Mejorar"
          @click="upgradeGammaOffice"
        />
      </div>
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
    >
      <template #label="{item}">
        <div class="flex items-center justify-between">
          <div class="font-semibold text-gray-800">{{ item.label }}</div>
          <div class="stepper-description pl-3 pb-3">{{ formatCurrency(item.price) }}</div>
        </div>
      </template>
      <template #description="{item}">
        <div class="flex items-center justify-between stepper-description">
          <div>{{ item.description }}</div>
          <div>{{ item.priceConversions }}</div>
        </div>
      </template>
    </UCheckboxGroup>
  </div>
  <NavigationButtons :loading="loading"/>
</template>
