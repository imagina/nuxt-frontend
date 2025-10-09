<script setup lang="ts">
  const settingStore = useIsettingStore()
  //Always use light for layout master
  const colorMode = useColorMode()
  colorMode.value = 'light'

  // Favicon
  useHead({
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: settingStore.get('isite::favicon').url
      }
    ]
  })
</script>

<template>
  <div
    class="min-h-screen flex flex-col"
    data-vaul-drawer-wrapper>
    <IHeader site-name="comercializadora"/>
    <main class="flex-1">
      <slot/>
    </main>
    <IFooter/>
  </div>
</template>
