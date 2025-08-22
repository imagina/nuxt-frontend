<script lang="ts" setup>
import type {IFieldProps} from './IField'
import {FIELDS} from './config'

const props = defineProps<IFieldProps>()
const emit = defineEmits(['update:modelValue'])
const fieldComponent = computed(() => FIELDS[props.type])

// Handler for v-model emulation
function updateValue (value: any)
{
  emit('update:modelValue', value)
}
</script>

<template>
  <UFormField v-bind="formFieldProps">
    <component
      :is="fieldComponent"
      v-bind="fieldProps"
      :model-value="props.modelValue"
      @update:model-value="updateValue"
      v-on="$attrs"
    />
  </UFormField>
</template>
