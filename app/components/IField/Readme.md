# IField Component

## Props

- `field`: configuration object for the field.
  - `type`: type of field to render (`input`, `textarea`, `select`, `selectMenu`, `checkbox`).
  - `name`: unique identifier of the field.
  - `default`: optional default value.
  - `formFieldProps`: additional props for [`UFormField`](https://ui.nuxt.com/components/form#formfield).
  - `fieldProps`: specific props for the underlying UI component (`UInput`, `UTextarea`, `USelect`, `UCheckbox`, etc.).

## v-model

- `v-model`: binds the field value with the parent component state.
  - If no initial value is provided, the field will use `field.default` as its default value.

## Example — Input

```vue
<script setup lang="ts">
import { ref } from 'vue'
import IField from '~/components/IField/IField.vue'

const username = ref('')
const usernameField = {
  name: 'username',
  type: 'input',
  default: 'guest',
  formFieldProps: { label: 'Username' },
  fieldProps: { placeholder: 'Enter your username' }
}
</script>

<template>
  <IField v-model="username" :field="usernameField" />
  <p>Current value: {{ username }}</p>
</template>
