<script lang="ts">
export const pageMeta = {layout: 'master-comercializadora'}
</script>

<script setup lang="ts">
import type { PageData } from '#ipage/types/pages'
import IPageWorkUs from '~/components/IPageWorkUs.vue';
defineProps<{ page: PageData }>()
</script>
<template>
  <IPageWorkUs :page="page" link="/inicio-comercializadora" />
</template>
