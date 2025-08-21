<script setup lang="ts">
const settingStore = useIsettingStore()
const logo = settingStore.get('isite::logo1')
</script>


<template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="logo">
          <IMediaRender
            :media="logo" alt="Logo"
            aspect-ratio="aspect-[4/3]"
            :ui="{
              wrapper: 'bg-gray-100 p-4',
              container: 'rounded-lg overflow-hidden',
              media: 'rounded-none shadow-none w-50'
            }"/>
        </div>

        <div class="menu">
          <imenu-menu system-name="main-menu"/>
        </div>
      </div>
    </div>
  </header>
</template>
