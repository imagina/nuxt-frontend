<script lang="ts" setup>
import {RENT_CTX} from './config'
import type {RentCtx} from './'

const rent = inject<RentCtx>(RENT_CTX)
</script>
<template>
  <div class="botons-up flex gap-2 justify-between mt-4 mb-5">
    <UButton leading-icon="i-lucide-arrow-left" @click="rent.prev"
             class="bg-white text-primary hover:bg-white hover:text-secondary">Atrás
    </UButton>
    <UButton trailing-icon="i-lucide-arrow-right" @click="rent.next"
             class="bg-white text-primary hover:bg-white hover:text-secondary">Continuar
    </UButton>
  </div>
</template>
