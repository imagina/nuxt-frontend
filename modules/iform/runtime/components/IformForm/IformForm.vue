<script setup lang="ts">
import {iformFormsRepository, iformLeadsRepository} from '#iform/utils/repository'
import type {IformFormProps} from '../IformForm/IformForm'
import {mapApiFields} from './BuildFields'
import type {Form} from "#iform/types/forms";
import {defu} from 'defu'

const props = defineProps<IformFormProps>()
const formData = ref({})
const {executeRecaptcha} = useIcoreRecaptcha()

const {data} = await useAsyncData(
  `iform:${props.systemName}`,
  () => iformFormsRepository.show(props.systemName, {
    include: 'translations,fields.translations',
    filter: {field: 'system_name'}
  })
)

const form = computed<Form | undefined>(() => data.value?.data)
const formFields = computed(() => mapApiFields(form.value?.fields ?? []))
const ui = defu(props.ui, {
  root: 'shadow-md rounded-3xl bg-white p-6',
  title: 'text-primary text-center text-[30px] lg:text-[45px] leading-none font-semibold mb-2',
  description: 'text-center text-[16px] lg:text-[18px] mb-10',
  form: 'grid grid-cols-12 gap-4',
  actions: 'col-span-12 mt-2'
})

const formSubmit = async () =>
{
  const {headerOptions} = await executeRecaptcha('submit')

  await iformLeadsRepository.create(
    {attributes: {form_id: form.value?.id, values: formData.value}},
    headerOptions
  )
}
</script>

<template>
  <IForm
    v-if="form"
    v-model="formData"
    :title="form.title"
    :description="form.description"
    :fields="formFields"
    :ui="ui"
    submit-label="Enviar"
    @submit="formSubmit"
  />
</template>
