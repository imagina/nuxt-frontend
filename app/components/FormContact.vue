<script setup lang="ts">
import { ref } from 'vue'
import type { IFormFieldConfig } from '~/components/IForm/IForm.d'

const formData = ref<Record<string, any>>({})

const fields: IFormFieldConfig[] = [
  {
    name: 'nombre',
    type: 'input',
    default: '',
    rules: ['required'],
    formFieldProps: { label: '', class: 'col-span-12', ui: { label: 'sr-only' } },
    fieldProps: { placeholder: 'Nombre', size:'xl' }
  },
  {
    name: 'apellidos',
    type: 'input',
    default: '',
    rules: ['required'],
    formFieldProps: { label: '', class: 'col-span-12', ui: { label: 'sr-only' } },
    fieldProps: { placeholder: 'Apellidos', size:'xl' }
  },
  {
    name: 'telefono',
    type: 'input',
    default: '',
    rules: ['required'],
    formFieldProps: { label: '', class: 'col-span-12', ui: { label: 'sr-only' } },
    fieldProps: { placeholder: 'Número de contacto', type: 'tel', size:'xl' }
  },
  {
    name: 'email',
    type: 'input',
    default: '',
    rules: ['required', 'email'],
    formFieldProps: { label: '', class: 'col-span-12', ui: { label: 'sr-only' } },
    fieldProps: { placeholder: 'Correo electrónico', type: 'email', autocomplete: 'email', size:'xl' }
  },
  {
    name: 'ciudad',
    type: 'select',
    default: null,
    rules: ['required'],
    formFieldProps: { label: '', class: 'col-span-12', ui: { label: 'sr-only' }  },
    fieldProps: {
      placeholder: 'Ciudad',
      size:'xl',
      items: ['Bogotá', 'Medellín', 'Cali']
    }
  },
  {
    name: 'mensaje',
    type: 'textarea',
    default: '',
    rules: ['required'],
    formFieldProps: { label: '', class: 'col-span-12', ui: { label: 'sr-only' } },
    fieldProps: { rows: 4, placeholder: 'Mensaje…' }
  },
  {
    name: 'archivo',
    type: 'input',
    default: null,
    rules: [],
    formFieldProps: { label: '', class: 'col-span-12', help: '(Adjunta un .PDF o .JPG si lo requieres)' },
    fieldProps: { type: 'file', accept: '.pdf,.jpg,.jpeg,.png' } as any
  },
  {
    name: 'autorizo',
    type: 'checkbox',
    default: false,
    rules: ['required'],
    formFieldProps: { label: '', class: 'col-span-12' },
    fieldProps: { label: 'Autorizo el manejo de datos personales' }
  }
]

const buttonProps = {
  size: 'xl',
  block: true,
  class: 'justify-center bg-secondary h-[45px] text-white hover:bg-primary hover:text-white transition'
}
const ui = {
  root: 'shadow-md rounded-3xl lg:max-w-3/4 xl:max-w-1/2 mx-auto bg-white p-6',
  title: 'text-primary text-center text-[30px] lg:text-[45px] leading-none font-semibold mb-2',
  description: 'text-center text-[16px] lg:text-[18px] mb-10 block',
  form: 'grid grid-cols-12 gap-4',
  actions: 'col-span-12 mt-2'
}

const onSubmit = (values: Record<string, any>) => {
  console.log('Form submitted:', values)
}
</script>

<template>
  <section class="pt-20 form-contact pb-20 px-4">
    <IForm
      v-model="formData"
      :fields="fields"
      title="Contáctanos"
      description="Te responderemos tan pronto como nos sea posible, ¡Gracias!"
      submit-label="Enviar"
      @submit="onSubmit"
      :button-props="buttonProps"
      :ui="ui"
    />
  </section>
</template>

<style scoped>
:deep(input[type="file"]) {
  border: 0;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
  height: 40px;
  background: transparent;
}
:deep(input[type="file"]::file-selector-button) {
  background: #EFEFEF;
  color: #444444;
  font-weight: 500;
  font-size: 16px;
  border: 1px solid #5B6077;
  padding: 6px 20px;
  transition: .2s;
}
:deep(input[type="file"]::file-selector-button:hover) {
  background-color: #cccccc;
}
.form-contact {
  background: linear-gradient(360deg,
  var(--color-dark-1) 50%,
  var(--color-gray-1) 50%);
}
</style>
