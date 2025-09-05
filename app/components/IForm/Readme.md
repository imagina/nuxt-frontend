# IForm Component

## Props

- `title` **(string)**: Title of the form.
- `description` **(string, optional)**: Optional description text.
- `fields` **(IFormFieldConfig[])**: Array of form field configurations.
  - `name`: unique identifier of the field.
  - `type`: type of the field (`input`, `textarea`, `select`, `checkbox`, etc.).
  - `default`: optional default value for the field.
  - `rules`: array of validation rules (e.g. `["required", "email"]`).
  - `formFieldProps`: additional props for [`UFormField`](https://ui.nuxt.com/components/form#formfield).
  - `fieldProps`: props for the underlying UI component (`UInput`, `UTextarea`, `USelect`, `UCheckbox`, etc.).
- `submitLabel` **(string, optional)**: Label for the submit button (defaults to `title`).
- `ui` : ui sections to component `{root?: ClassNameValue, header?: ClassNameValue, title?: ClassNameValue, description?: ClassNameValue, form?: ClassNameValue, actions?: ClassNameValue}`

## v-model

- `v-model`: Reactive object that holds the form values.
  - Initialized with each field’s `default` value if not present in the model.
  - Updates automatically when the user edits values.
  - Can be used to preload values when editing an existing record.

## Emits

- `@submit`: Emits an object with the current form values when the form is submitted.

## Exposed Methods

Using `ref`, the parent component can call:

- `reset()`  
  Restores all fields to their initial default values and clears validation errors from the underlying [`UForm`](https://ui.nuxt.com/components/form).

## Example — Create User Form

```vue
<script setup lang="ts">
import { ref } from 'vue'
import IForm from '~/components/IForm/IForm.vue'

const formData = ref({})

const fields = [
  {
    name: 'username',
    type: 'input',
    default: '',
    rules: ['required'],
    formFieldProps: { label: 'Username' },
    fieldProps: { placeholder: 'Enter your username' }
  },
  {
    name: 'email',
    type: 'input',
    rules: ['required', 'email'],
    formFieldProps: { label: 'Email' },
    fieldProps: { placeholder: 'Enter your email' }
  }
]
</script>

<template>
  <IForm
    v-model="formData"
    :fields="fields"
    title="Create User"
    submit-label="Save"
    @submit="values => console.log('Form submitted:', values)"
  />
</template>
