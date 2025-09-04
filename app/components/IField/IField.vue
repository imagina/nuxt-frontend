<script setup lang="ts">
import { FIELDS } from './config'
import type { IFieldProps } from './IField'

const props = defineProps<IFieldProps>()
const model = defineModel<any>()

const fieldComponent = computed(() => FIELDS[props.field.type])
</script>

<template>
  <UFormField :name="props.field.name" v-bind="props.field.formFieldProps">
    <component
      class="w-full"
      :is="fieldComponent"
      v-bind="props.field.fieldProps"
      v-model="model"
      v-on="$attrs"
    />
  </UFormField>
</template>
