<script setup lang="ts">
import {imenuMenusRepository} from '#imenu/utils/repository'
import type {Menu, MenuItem} from '#imenu/types/menus'
import type {NavigationMenuItem} from '@nuxt/ui'

const props = withDefaults(defineProps<{
  systemName: string | number
}>(), {})

// carga menu
const {data} = await useAsyncData(
  `menu:${props.systemName}`,
  () => imenuMenusRepository.show(props.systemName, {
    include: 'menuItems.translations',
    filter: {field: 'system_name'}
  }),
  {server: true}
)

function mapNode (m: MenuItem): NavigationMenuItem
{
  return {
    label: m.title,
    to: m.url,
    target: m.target,
    disabled: m.status !== 1,
    icon: m.icon || undefined,
    children: (m as any).children?.map(mapNode) // falta probar con hijos
  }
}

const items = computed<NavigationMenuItem[]>(() =>
{
  const menu: Menu | undefined = data.value?.data
  const list = menu?.menuItems ?? []
  return list.map(mapNode)
})
</script>

<template>
  <IMenu :items="items"/>
</template>
