<script lang="ts" setup>
import {RENT_CTX} from './config'
import type {RentCtx} from './'

const rent = inject<RentCtx>(RENT_CTX)
</script>
<template>
  <div class="botons-down flex gap-2 justify-between mt-4 mb-5">
    <UButton @click="rent.prev" class="bg-gray-4 text-primary hover:bg-gray-4">Atrás</UButton>
    <UButton @click="rent.next" color="secondary"> Continuar</UButton>
  </div>
</template>
