<script setup lang="ts">
import type {IrentCarGammaCardProps} from "#irentcar/components/IrentCarGammaCard/IrentCarGammaCard";

const props = defineProps<IrentCarGammaCardProps>()
</script>

<template>
  <div class="h-full rounded-xl">
    <IMediaRender
      :media="props.item.files.mainimage" :alt="props.item.title"
      aspect-ratio="aspect-4/3"
      :ui="{
        wrapper: '',
        container: '',
        media: 'w-full  object-cover rounded-xl'
    }"/>
    <div class="text-center text-primary text-[16px] lg:text-[20px] font-semibold mt-4">
      {{ props.item.description }}
    </div>
    <div class="text-center text-secondary text-[14px] lg:text-[16px] uppercase mb-1">
      {{ props.item.title }}
    </div>
    <UButton size="xs" color="secondary">
      Reserva ahora
    </UButton>
  </div>
</template>
