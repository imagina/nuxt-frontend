<script setup lang="ts">
  import type {IFormProps} from './IForm'
  import {buildSchema} from './buildSchema'

  const props = defineProps<IFormProps>()
  const model = defineModel<Record<string, unknown>>({default: {}})
  const emit = defineEmits<{
    (e: 'submit', payload: Record<string, unknown>): void
  }>()
  const formSchema = buildSchema(props.fields)

  function onSubmit ()
  {
    emit('submit', {...model.value})
  }

  onMounted(() =>
  {
    props.fields.forEach(f =>
    {
      if (!(f.name in model.value))
      {
        model.value[f.name] = f.default ?? null
      }
    })
  })
</script>

<template>
  <div class="p-6 bg-white shadow-md rounded-lg space-y-4">
    <h2 v-if="props.title" class="text-2xl font-bold">{{ props.title }}</h2>
    <p v-if="props.description" class="text-gray-600">{{ props.description }}</p>

    <UForm :state="model" :schema="formSchema" class="space-y-4" @submit="onSubmit">
      <template v-for="field in props.fields" :key="field.name">
        <IField v-model="model[field.name]" :field="field"/>
      </template>

      <UButton type="submit" color="primary">
        {{ props.submitLabel || props.title }}
      </UButton>
    </UForm>
  </div>
</template>
