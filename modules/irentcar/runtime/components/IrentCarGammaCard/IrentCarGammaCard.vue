<script setup lang="ts">
import type {IrentCarGammaCardProps} from "#irentcar/components/IrentCarGammaCard/IrentCarGammaCard";

const props = defineProps<IrentCarGammaCardProps>()
const open = defineModel<boolean>("open", { default: false });

</script>

<template>
  <div class="car-card h-full rounded-xl">
    <IMediaRender
      :media="props.item.files.mainimage" :alt="props.item.title"
      aspect-ratio="aspect-square"
      :ui="{
        wrapper: '',
        container: 'rounded-xl px-1 bg-quaternary border-1 border-gray-300',
        media: 'w-full object-contain rounded-xl' }"/>
    <div class="text-center text-primary leading-[16px] text-[16px] lg:leading-[18px] lg:text-[18px] font-semibold mt-4" v-html="props.item.description" />
    <div class="text-center text-secondary text-[14px] lg:text-[16px] uppercase mb-1 font-semibold">
      {{ props.item.title }}
    </div>
    <div class="flex justify-center items-center gap-3 text-[13px] text-gray-3 mb-2">
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
    <div class="text-center">
      <UButton @click="open = true" size="xs" color="secondary" class="px-3" loading-auto label="Ver Detalle" />
    </div>
  </div>

  <UModal class="car-modal" v-model:open="open" :ui="{ header: 'hidden', overlay: 'overlay-slide', body: 'p-0 sm:p-0',  content: 'w-fit max-w-[calc(100vw-2rem)]' }" >
    <template #body>
      <div class="card-modal">
        <div class="relative">
          <UButton @click="open = false" class="btn-close absolute" icon="i-fa6-solid-xmark" size="sm" variant="ghost" aria-label="Cerrar"/>
          <IMediaRender
            :media="props.item.files.mainimage" :alt="props.item.title"
            aspect-ratio="aspect-[4/3]"
            :ui="{
              wrapper: '',
              container: 'bg-quaternary rounded-xl px-1',
              media: 'w-full object-contain rounded-t-xl' }"/>
        </div>
        <div class="car-modal-body p-4">
          <div class="text-primary text-lg font-semibold" v-html="props.item.description" />
          <div class="text-secondary text-md uppercase font-semibold mb-2">
            {{ props.item.title }}
          </div>
          <div class="text-primary text-sm font-semibold">Especificaciones</div>
          <div class="text-[13px] text-gray-3 mt-2">
              <Icon size="lg" name="mdi:car-shift-pattern"/>
              {{ props.item.transmissionType.title }}
          </div>
          <div class="flex justify-between text-[13px] text-gray-3 mb-3">
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
          <!--  Falta colocar los extras -->
          <!--<div class="text-primary text-sm font-semibold">También incluye</div>
          <div class="mb-3">

          </div>-->
          <UButton  size="md" color="secondary" class="px-3" loading-auto label="Realizar reservación" />

        </div>
      </div>
    </template>
  </UModal>

</template>
<style>
.car-modal .card-modal {
  max-width: 350px;
  width: 100%;
  & .btn-close { right: 2px; }
}
</style>
