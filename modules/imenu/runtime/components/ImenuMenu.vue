<script setup lang="ts">
import {imenuMenusRepository} from '#imenu/utils/repository'
import type {Menu, MenuItem} from '#imenu/types/menus'
import type {NavigationMenuItem} from '@nuxt/ui'

const props = withDefaults(defineProps<{
  systemName: string | number
}>(), {})

const {data} = await useAsyncData(
  `menu:${props.systemName}`,
  () => imenuMenusRepository.show(props.systemName, {
    include: 'menuItems.translations',
    filter: {field: 'system_name'}
  })
)

function mapNode (m: MenuItem): NavigationMenuItem
{
  const slug =  m.pageId != null ? m.systemName : undefined;
  return {
    label: m.title,
    to: slug ?? m.url ?? m.uri,
    target: m.target,
    disabled: m.status !== 1,
    icon: m.icon || undefined,
    children: (m as MenuItem).children?.map(mapNode)
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
