<script lang="ts" setup>
import type {IFormFieldConfig} from "~/components/IForm/IForm";
import {irentcarGammaRepository, irentcarStaticRepository} from "#irentcar/utils/repository";
import type {Type} from "#irentcar/types/static";

const router = useRouter()
const urlFilters = router.currentRoute.value.query.filters ?? '{}'
const filters = ref(JSON.parse(urlFilters as string))

const getGammas = () =>
{
  const notNullFilters = Object.fromEntries(Object.entries(filters.value).filter(([_, v]) => v !== null))
  router.push({query: {filters: JSON.stringify(notNullFilters)}})
  return irentcarGammaRepository.index({filter: notNullFilters})
}
const {data: gammas} = useAsyncData('irent::pageGammas', getGammas)
type StaticResponse = { data: Type[] }
const {data: statics} = await useAsyncData<[StaticResponse, StaticResponse, StaticResponse]>(
  'irent::statics',
  async () => await Promise.all([
    irentcarStaticRepository.indexVehiculeType(),
    irentcarStaticRepository.indexTransmissionType(),
    irentcarStaticRepository.indexFuelType(),
  ])
)
const vehicules = statics.value?.[0].data ?? []
const transmissions = statics.value?.[1].data ?? []
const fuels = statics.value?.[2].data ?? []

const filterFields = computed<IFormFieldConfig[]>(() => ([
  {
    name: 'vehicleTypeId',
    type: 'select',
    default: null,
    formFieldProps: {
      label: 'Vehiculo'
    },
    fieldProps: {
      items: [
        {label: 'Limpiar...', value: null},
        ...vehicules.map(i => ({value: i.id, label: i.title}))
      ],
      clearable: true
    }
  },
  {
    name: 'transmissionTypeId',
    type: 'select',
    default: null,
    formFieldProps: {
      label: 'Transmisión'
    },
    fieldProps: {
      items: [
        {label: 'Limpiar...', value: null},
        ...transmissions.map(i => ({value: i.id, label: i.title}))
      ]
    }
  },
  {
    name: 'fuelTypeId',
    type: 'select',
    default: null,
    formFieldProps: {
      label: 'combustible'
    },
    fieldProps: {
      items: [
        {label: 'Limpiar...', value: null},
        ...fuels.map(i => ({value: i.id, label: i.title}))
      ]
    }
  },
]))
</script>
<template>
  <div class="grid grid-cols-12">
    <div class="col-span-4">
      <IForm
        v-model="filters"
        title="Filters"
        submit-label="Buscar"
        :fields="filterFields"
        @submit="getGammas()"
      />
    </div>
    <div class="col-span-8">
      itemList...
    </div>
  </div>
</template>
