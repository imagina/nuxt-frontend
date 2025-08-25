<script setup lang="ts">
const settingStore = useIsettingStore()
const logo = { isImage: true, url: '/images/logo-color.png'} // settingStore.get('isite::logo1')
</script>
<style>
.menu > nav a {
  color: var(--color-primary);
  text-transform: uppercase;
  font-weight: 600;
  font-style: SemiBold;
  font-size: 14px;
  letter-spacing: .2;
  &:hover {
    color: var(--color-secondary);
  }

}
</style>

<template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-4 sm:px-6 lg:px-10">
      <div class="flex items-center justify-between h-16">
        <div class="logo ">
          <IMediaRender
            :media="logo" alt="Logo"
            aspect-ratio="auto"
            :ui="{
              wrapper: '',
              container: 'h-[34px] w-[144px]',
              media: 'object-contain' }"
            />
        </div>

        <div class="menu">
          <imenu-menu system-name="main-menu"/>
        </div>
      </div>
    </div>
  </header>
</template>
