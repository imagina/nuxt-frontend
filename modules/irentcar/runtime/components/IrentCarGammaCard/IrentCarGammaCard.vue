<script setup lang="ts">
import {DialogTitle, DialogDescription} from 'reka-ui'
import type {IrentCarGammaCardProps} from "#irentcar/components/IrentCarGammaCard/IrentCarGammaCard";

const {goTo} = useInavigation()
const router = useRouter()
const props = withDefaults(defineProps<IrentCarGammaCardProps>(), {
  orientation: 'vertical'
})
const open = defineModel<boolean>("open", {default: false});
const goToStepper = computed(() =>
{
  const stepperRouteName = 'irentcar.page.stepper'
  const currentRouteName = router.currentRoute.value.name as string
  if (currentRouteName.includes(stepperRouteName)) return null
  return () => goTo({name: stepperRouteName})
})
const gridOrientationUi = computed(() =>
{
  const ui = {
    'horizontal': {
      container: 'flex flex-col gap-4 md:flex-row md:items-center',
      image: 'order-1 md:order-2 md:flex-3',
      content: 'order-2 md:order-1 md:flex-9',
      ctaWrap: 'mt-3',
      text: 'text-center md:text-left',
      items: 'flex justify-center md:justify-start'
    },
    'vertical': {
      container: 'grid grid-cols-1 gap-4',
      image: '',
      content: '',
      ctaWrap: 'mt-3',
      text: 'text-center',
      items: 'flex justify-center'
    },
  }
  return ui[props.orientation]
})
</script>

<template>
  <div class="h-full">
    <div :class="gridOrientationUi.container">
      <!-- Image -->
      <div :class="gridOrientationUi.image">
        <IMediaRender
          :media="props.item.files.mainimage" :alt="props.item.title"
          aspect-ratio="aspect-square"
          :ui="{
            wrapper: '',
            container: 'max-w-32 rounded-xl px-1 bg-quaternary border-1 border-gray-300',
            media: 'w-full object-contain rounded-xl'}"/>
      </div>
      <!-- Content -->
      <div :class="gridOrientationUi.content">
        <div
          :class="[gridOrientationUi.text, 'text-primary leading-[16px] text-[16px] lg:leading-[18px] lg:text-[18px] font-semibold']">
          {{ props.item.summary }}
        </div>
        <div
          :class="[gridOrientationUi.text, 'text-secondary text-[14px] lg:text-[16px] uppercase mb-1 font-semibold']">
          {{ props.item.title }}
        </div>
        <div
          :class="[gridOrientationUi.items, 'items-center gap-1 md:gap-3 text-sm md:text-md text-gray-3 mb-2']">
          <div class="flex items-center gap-1">
            <Icon size="lg" name="mdi:car-shift-pattern"/>
            {{ props.item.transmissionType.title }}
          </div>
          <div class="flex items-center gap-1">
            <Icon size="lg" name="material-symbols:person"/>
            {{ props.item.passengersNumber }}
          </div>
          <div class="flex items-center gap-1">
            <Icon size="lg" name="mdi:briefcase"/>
            {{ props.item.luggage }}
          </div>
        </div>
        <div :class="gridOrientationUi.items">
          <UButton @click="open = true" size="xs" color="info" class="px-3" label="Ver Detalle" variant="link"/>
        </div>
      </div>
    </div>
  </div>

  <UModal class="car-modal" v-model:open="open"
          :ui="{ header: 'hidden', overlay: 'overlay-slide', body: 'p-0 sm:p-0',  content: 'w-fit max-w-[calc(100vw-2rem)]' }">
    <template #header>
      <div class="flex justify-between">
        <div>
          <DialogTitle>{{ props.item.summary }}</DialogTitle>
          <DialogDescription>{{ props.item.title }}</DialogDescription>
        </div>
      </div>
    </template>
    <template #body>
      <div class="card-modal">
        <div class="relative">
          <UButton @click="open = false" class="btn-close absolute" icon="i-fa6-solid-xmark" size="sm" variant="ghost"
                   aria-label="Cerrar"/>
          <IMediaRender
            :media="props.item.files.mainimage" :alt="props.item.title"
            aspect-ratio="aspect-[4/3]"
            :ui="{
              wrapper: '',
              container: 'bg-quaternary rounded-xl px-1',
              media: 'w-full object-contain rounded-t-xl' }"/>
        </div>
        <div class="car-modal-body p-4">
          <div class="text-primary text-lg font-bold"> {{ props.item.summary }}</div>
          <div class="text-secondary text-md uppercase font-semibold mt-1 mb-2">
            {{ props.item.title }}
          </div>
          <div class="text-primary text-sm font-bold">Especificaciones</div>
          <div class="text-sm text-gray-3 mt-2">
            <Icon size="lg" name="mdi:car-shift-pattern"/>
            {{ props.item.transmissionType.title }}
          </div>
          <div class="flex flex-col sm:flex-row justify-between text-sm text-gray-3 mb-3">
            <div class="flex items-center gap-1">
              <Icon size="lg" name="material-symbols:person"/>
              {{ props.item.passengersNumber }} pasajeros
            </div>
            <div class="flex items-center gap-1">
              <Icon size="lg" name="mdi:briefcase"/>
              {{ props.item.luggage }} maletas
            </div>
            <div class="flex items-center gap-1">
              <Icon size="lg" name="mdi:car-door"/>
              {{ props.item.doors }} puertas
            </div>
          </div>
          <div class="text-primary text-sm mb-3 gamma-description" v-html="props.item.description"/>
          <UButton v-if="goToStepper" size="md" color="secondary" class="px-3 cursor-pointer" loading-auto
                   label="Realizar reservación" variant="outline" @click="goToStepper()"/>
        </div>
      </div>
    </template>
  </UModal>
</template>
<style>
.car-modal .card-modal {
  max-width: 350px;
  width: 100%;

  & .btn-close {
    right: 2px;
  }
}
</style>
