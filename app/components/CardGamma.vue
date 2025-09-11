<script setup lang="ts">
import type {IrentCarGammaCardProps} from "#irentcar/components/IrentCarGammaCard/IrentCarGammaCard";

const props = defineProps<IrentCarGammaCardProps>()
</script>

<template>
  <div class="car-card h-full rounded-xl">
    <IMediaRender
      :media="props.item.files.mainimage" :alt="props.item.title"
      aspect-ratio="aspect-4/3"
      :ui="{
        wrapper: '',
        container: 'rounded-xl px-1 bg-quaternary border-1 border-gray-300',
        media: 'w-full object-contain rounded-xl' }"/>
     <div class="text-center text-primary leading-[16px] text-[16px] lg:leading-[18px] lg:text-[18px] font-bold mt-4">
      {{ props.item.summary }}
    </div>
    <div class="text-center text-secondary text-[14px] lg:text-[16px] uppercase my-2 font-bold">
      {{ props.item.title }}
    </div>
    <div class="text-center">
      <UButton to="/rent-car/stepper" size="xs" color="secondary" class="px-3" loading-auto label="Reserva ahora" />
    </div>
  </div>
</template>
