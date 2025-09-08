<script setup lang="ts">
import type {IFormProps} from './IForm'
import {buildSchema} from './buildSchema'
import {ref} from 'vue'
import type {AlertProps} from '#ui/types'

const props = withDefaults(defineProps<IFormProps>(), {
  buttonProps: () => ({}),
  ui: () => ({})
})

const model = defineModel<Record<string, unknown>>({default: {}})
const emit = defineEmits<{
  (e: 'submit', payload: Record<string, unknown>): void
}>()
const message = ref('')
const formSchema = buildSchema(props.fields)
const uFormRef = ref()

const status = ref<'idle' | 'success' | 'error'>('idle')

// guardamos los valores iniciales
const initialValues: Record<string, unknown> = {}
props.fields.forEach(f =>
{
  initialValues[f.name] = f.default ?? ''
  if (!(f.name in model.value) || model.value[f.name] === undefined)
  {
    model.value[f.name] = initialValues[f.name]
  }
})

function onSubmit ()
{
  emit('submit', {...model.value})
}

const bannerConfig = computed<Partial<AlertProps>>(() =>
{
  return {
    title: message.value,
    color: status.value === 'success' ? 'success' : 'error',
    icon: status.value === 'success' ? 'fa-light fa-circle-check' : 'fa-light fa-circle-exclamation',
    ui: {root: 'items-center', title: 'text-gray-900'},
    actions: [
      {
        label: status.value == 'success' ? 'Enviar de nuevo' : 'Reintentar',
        onClick: reset,
        variant: 'soft'
      }
    ]
  }
})

function reset ()
{
  Object.keys(initialValues).forEach(key => model.value[key] = initialValues[key])
  uFormRef.value?.clear()
  status.value = 'idle'
}

function success (msg = 'Formulario enviado correctamente.')
{
  message.value = msg
  status.value = 'success'
}

function error (msg = 'Ocurrió un error al enviar el formulario.')
{
  message.value = msg
  status.value = 'error'
}

defineExpose({reset, success, error})
</script>

<template>
  <div :class="ui.root">
    <div v-if="props.title || props.description" :class="ui.header">
      <h2 v-if="props.title" :class="ui.title" v-html="props.title"></h2>
      <span v-if="props.description" :class="ui.description" v-html="props.description"></span>
    </div>

    <!-- Message -->
    <UAlert v-if="status != 'idle'" class="mt-6" v-bind="bannerConfig">
      <template #leading>
        <i :class="[bannerConfig.icon, 'text-4xl']"/>
      </template>
    </UAlert>
    <!--Form-->
    <UForm
      v-else
      ref="uFormRef"
      :state="model"
      :schema="formSchema"
      :class="ui.form"
      @submit="onSubmit"
    >
      <div class="grid grid-cols-12 gap-4">
        <template v-for="field in props.fields" :key="field.name">
          <div v-if="field.showIf !== false" :class="field.width || 'col-span-12'">
            <IField v-model="model[field.name]" :field="field"/>
          </div>
        </template>

        <div :class="[ui.actions, props.submitWidth || 'col-span-12']">
          <UButton type="submit" v-bind="props.buttonProps">
            {{ props.submitLabel || props.title }}
          </UButton>
        </div>
      </div>
    </UForm>
  </div>
</template>
