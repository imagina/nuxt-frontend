<script lang="ts" setup>
import type {IMenuProps} from './IMenu'
import {DialogTitle, DialogDescription} from 'reka-ui'
import type {NavigationMenuItem} from "@nuxt/ui";

const props = withDefaults(defineProps<IMenuProps>(), {
  drawerDirection: 'right',
  desktopNavProps: () => ({class: 'hidden lg:flex'}),
  withDrawer: true
})


const dOpen = ref(false)

function normalizePath (toPath?: string)
{
  if (!toPath) return undefined
  if (toPath.startsWith('/') || toPath.startsWith('http')) return toPath
  return '/' + toPath
}

const mappedItems = computed<NavigationMenuItem[]>((i) => props.items.map((item) =>
{
  if (item.to) item.to = normalizePath(item.to as string)
  return item
}))
</script>

<template>
  <UNavigationMenu :items="mappedItems" v-bind="props.desktopNavProps"/>
  <UDrawer
    v-model:open="dOpen"
    v-if="props.withDrawer"
    class="lg:hidden" :direction="drawerDirection"
    should-scale-background :set-background-color-on-scale="false"
    :ui="{ content: 'w-full', handle: 'bg-gray-400!' }">

    <!-- Action Buton -->
    <UButton color="neutral" variant="ghost" trailing-icon="i-lucide-menu"/>

    <template #header>
      <div class="flex justify-between">
        <div>
          <DialogTitle>Site Name</DialogTitle>
          <DialogDescription>Menu</DialogDescription>
        </div>
        <UButton color="neutral" variant="ghost" icon="i-lucide-x" @click="dOpen = false"/>
      </div>
    </template>

    <template #body>
      <UNavigationMenu
        :items="mappedItems"
        orientation="vertical"
        :ui="{
          link: 'w-full justify-start px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800',
          list: 'flex-col gap-1 w-full'
        }"
      />
    </template>
  </UDrawer>
</template>
