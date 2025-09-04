<script setup lang="ts">
import { onMounted, computed } from 'vue'
  import type {IFormProps} from './IForm'
  import {buildSchema} from './buildSchema'

  const props = withDefaults(defineProps<IFormProps>(), {
    buttonProps: () => ({}),
    ui: () => ({})
  })
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
  <div :class="ui.root">
    <div v-if="props.title || props.description" :class="ui.header">
      <h2 v-if="props.title" :class="ui.title" v-html="props.title"></h2>
      <span v-if="props.description" :class="ui.description" v-html="props.description"></span>
    </div>

    <UForm :state="model" :schema="formSchema" :class="ui.form" @submit="onSubmit">
      <template v-for="field in props.fields" :key="field.name">
        <IField v-model="model[field.name]" :field="field"/>
      </template>

      <div :class="ui.actions">
        <UButton type="submit" v-bind="props.buttonProps">
          {{ props.submitLabel || props.title }}
        </UButton>
      </div>
    </UForm>
  </div>
</template>
