<script lang="ts">
export const pageMeta = {layout: 'master-asfalcargo'}
</script>

<script setup lang="ts">
import type { PageData } from '#ipage/types/pages'
import IPageContact from '~/components/IPageContact.vue';
defineProps<{ page: PageData }>()
</script>
<template>
  <IPageContact :page="page" link="/inicio-asfalcargo" />
</template>
