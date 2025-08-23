<script setup lang="ts">
  import type { IFormProps } from './IForm'

  // props without action
  const props = defineProps<IFormProps>()

  // define emits
  const emit = defineEmits<{
    (e: 'submit', payload: Record<string, any>): void
  }>()

  // state
  const state = reactive<Record<string, any>>({})
  props.fields.forEach(f => state[f.name] = f.default ?? '')

  // submit handler
  function onSubmit (event: any) {
    emit('submit', event.data)
  }
</script>

<template>
  <div class="p-6 bg-white shadow-md rounded-lg space-y-4">
    <h2 class="text-2xl font-bold">{{ props.title }}</h2>
    <p v-if="props.description" class="text-gray-600">{{ props.description }}</p>

    <UForm :state="state" :schema="props.schema" class="space-y-4" @submit="onSubmit">
      <template v-for="field in props.fields" :key="field.name">
        <IField :field="field" />
      </template>

      <UButton type="submit" color="primary">
        {{ props.submitLabel || props.title }}
      </UButton>
    </UForm>
  </div>
</template>
