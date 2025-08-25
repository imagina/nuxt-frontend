<!-- components/ItemCard.vue -->
<script setup lang="ts">
defineProps<{ item: { id: number; category: string; title: string; image: string } }>()
</script>

<template>
  <div class="h-full rounded-xl">
    <img :src="item.image" :alt="item.title" class="w-full aspect-4/3 object-cover rounded-xl">
    <div class="text-center text-primary text-[16px] lg:text-[20px] font-semibold mt-4">{{ item.title  }}</div>
    <div class="text-center text-secondary text-[14px] lg:text-[16px] uppercase">{{ item.category  }}</div>
  </div>
</template>
