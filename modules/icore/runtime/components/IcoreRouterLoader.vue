<template>
  <transition name="fade">
    <div
      v-if="loadingStore.isLoading"
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-sm"
    >
      <!-- Spinner Tailwind -->
      <div class="w-12 h-12 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const loadingStore = useIcoreRouterLoading()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
