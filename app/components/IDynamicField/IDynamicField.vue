<script lang="ts" setup>
import type {DynamicFieldProps} from './IDynamicField'
import {DYNAMIC_FIELDS} from './config'

const props = defineProps<DynamicFieldProps>()
const emit = defineEmits(['update:modelValue'])
const fieldComponent = computed(() => DYNAMIC_FIELDS[props.type])

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
