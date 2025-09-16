<script lang="ts" setup>
  import {RENT_CTX} from './config'
  import type {RentCtx} from './stepperPage'

  const rent = inject<RentCtx>(RENT_CTX)
  if (!rent) throw new Error('RENT_CTX no disponible')

  const props = withDefaults(defineProps<{loading?: boolean}>(),{
    loading : false
  })

</script>
<template>
  <div class="botons-down flex gap-2 justify-between mt-4 mb-5">
    <UButton class="bg-gray-4 text-primary hover:bg-gray-4" @click="rent.prev">Atrás</UButton>
    <UButton color="secondary" :loading="props.loading" @click="rent.next"> Continuar</UButton>
  </div>
</template>
