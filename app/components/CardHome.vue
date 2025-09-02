<!-- components/ItemCard.vue -->
<script setup lang="ts">
defineProps<{ item: { id: number; category: string; title: string; media: object } }>()
</script>

<template>
  <div class="h-full rounded-xl">
    <IMediaRender
      :media="item.media" :alt="item.title"
      aspect-ratio="aspect-4/3"
      :ui="{
        wrapper: '',
        container: '',
        media: 'w-full  object-cover rounded-xl'
    }" />
    <div class="text-center text-primary text-[16px] lg:text-[20px] font-semibold mt-4">{{ item.title  }}</div>
    <div class="text-center text-secondary text-[14px] lg:text-[16px] uppercase mb-1">{{ item.category  }}</div>
    <UButton size="xs" color="secondary">Reserva ahora</UButton>
  </div>
</template>
