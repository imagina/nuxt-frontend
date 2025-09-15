<script lang="ts" setup>
import type {IFormFieldConfig} from "~/components/IForm/IForm";
import {irentcarGammaRepository, irentcarStaticRepository} from "#irentcar/utils/repository";
import GammaCard from '#irentcar/components/IrentCarGammaCard/IrentCarGammaCard.vue'
import type {Type} from "#irentcar/types/static";
const settingStore = useIsettingStore()

const router = useRouter()
const urlFilters = router.currentRoute.value.query.filters ?? '{}'
const filters = ref(JSON.parse(urlFilters as string))

const notNullFilters = computed(() => Object.fromEntries(Object.entries(filters.value).filter(([_, v]) => v !== null)))
const {data: gammas, refresh: refreshGammas} = await useAsyncData(
  'irent::pageGammas', () => irentcarGammaRepository.index({
    filter: notNullFilters.value,
    include: 'files',
  })
)
const gammasData = computed(() => gammas.value?.data ?? [])
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
const filterGammas = () =>
{
  router.push({query: {filters: JSON.stringify(notNullFilters.value)}})
  refreshGammas()
}

const buttonProps = {
  block: true,
  class: 'justify-center bg-secondary text-white hover:bg-primary hover:text-white transition'
}

useSeoMeta({
  title: () => `Vehículos | ${settingStore.get('isite::siteName')}`,
  ogTitle: () => `Vehículos | ${settingStore.get('isite::siteName')}`,
  description: () => `Vehículos | ${settingStore.get('isite::siteName')}`,
  ogDescription: () => `Vehículos | ${settingStore.get('isite::siteName')}`,
})

</script>
<template>
  <IBreadcrumb
      title="Vehículos"
      :ui="{ link: 'font-bold text-gray-3' }">
      <template #extraUp>
        <IsliderCarousel
          system-name="publi_vehiculos"
          item-theme="ItemTheme2"
          dots-position="inside-left-middle"
          :carousel-props="{
          dots: true,
          autoplay: true,
          loop: true,
          ui: {
            item: 'h-[260px] sm:h-[360px] md:h-[400px]',
            dot: 'w-[16px] h-[16px] rounded-full bg-[#FFFFFF80] data-[state=active]:bg-secondary'
          }
        }"/>
      </template>
    </IBreadcrumb>
    <div class="bg-gray-2">
      <section class=" container mx-auto py-10 px-4 sm:px-6 lg:px-10">
        <div class="flex flex-col gap-10 lg:flex-row">
          <!-- Columna izquierda: Filtros -->
          <aside class="shrink-0 lg:basis-[20%] lg:max-w-[420px] filters">
            <div class="sticky top-0 z-50 bg-white/80 backdrop-blur">
              <div class="relative">

                <UCard class="shadow-md">
                  <h1 class="text-[24px]  text-primary font-semibold mb-3">Filtros</h1>
                  <IForm
                    v-model="filters"
                    submit-label="Buscar"
                    :fields="filterFields"
                    :button-props="buttonProps"
                    :ui="{   actions: 'col-span-12 mt-2' }"
                    @submit="filterGammas()"
                  />
                </UCard>

               </div>
            </div>
          </aside>

          <!-- Columna derecha: Vehículos -->
          <div class="min-w-0 lg:flex-1 gammas">
              <IList
                  :items="gammasData"
                  :item-component="GammaCard"
                  grid-cols="grid-cols-1 gap-6 sm:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                />
          </div>
        </div>
      </section>
    </div>

</template>
