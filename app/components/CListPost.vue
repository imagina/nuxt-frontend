<script setup >
import CPost from './CPost.vue';

const props = defineProps({
  posts: {
    type: Array,
    default: () => [],
  },
});
</script>
<template>
  <!-- Carousel Post -->
  <UContainer class="py-20">

    <h2 class=" text-primary mb-10 text-center text-[20px] leading-[20px] lg:text-[38px] lg:leading-[38px] font-extrabold" >
      Esto te puede Interesar
    </h2>

    <IList
      :items="posts"
      :itemComponent="CPost"
      grid-cols="grid-cols-1 gap-6 lg:gap-8 md:grid-cols-2"
    />

  </UContainer>
</template>
<style>
</style>
