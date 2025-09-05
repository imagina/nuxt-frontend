<script setup lang="ts">
import {ref, computed} from 'vue'
import {iformFormsRepository, iformLeadsRepository} from '#iform/utils/repository'
import type {IformFormProps} from '../IformForm/IformForm'
import {mapApiFields} from './BuildFields'
import type {Form} from '#iform/types/forms'
import {defu} from 'defu'
import type {IForm} from "#components";

const props = defineProps<IformFormProps>()
const formData = ref({})
const {executeRecaptcha} = useIcoreRecaptcha()
const formRef = ref<InstanceType<typeof IForm> | null>(null)

const {data} = await useAsyncData(
  `iform:${props.systemName}`,
  () =>
    iformFormsRepository.show(props.systemName, {
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
  try
  {
    const {headerOptions} = await executeRecaptcha('submit')
    await iformLeadsRepository.create(
      {attributes: {form_id: form.value?.id, values: formData.value}},
      headerOptions
    )
    formRef.value?.success()
  } catch (err)
  {
    console.error(err)
    formRef.value?.error()
  }
}
</script>

<template>
  <IForm
    v-if="form"
    ref="formRef"
    v-model="formData"
    :title="form.title"
    :description="form.description"
    :fields="formFields"
    :ui="ui"
    submit-label="Enviar"
    @submit="formSubmit"
  />
</template>
