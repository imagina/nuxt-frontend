<script setup lang="ts">
import {irentcarOfficeRepository, irentcarReservationRepository} from '#irentcar/utils/repository'
import type {DateValidationForm} from './IrentCarForm'
import type {IFormFieldConfig} from "~/components/IForm/IForm";
import type {DateValidation} from "#irentcar/types/reservation";

const form = ref<DateValidationForm>({
  pickupOffice: null,
  pickupDate: null,
  pickupTime: null,
  dropOfficeId: null,
  dropDate: null,
  dropTime: null,
})
const loading = ref<boolean>(false)
const validationDate = ref<DateValidation | null>(null)

watch(
  () => [form.value.pickupOffice, form.value.pickupDate] as const,
  async ([pickupOfficeId, pickupDate], [prevId, prevDate]) =>
  {
    if (!pickupOfficeId || !pickupDate) return
    if (pickupOfficeId === prevId && pickupDate === prevDate) return
    await dateValidation()
  },
  {immediate: false}
)

const {data: offices} = await useAsyncData(`irentCar:offices`, () =>
  irentcarOfficeRepository.index({include: 'locatable'})
)

const officeOptions = (offices.value?.data ?? []).map(office => ({
  label: office.title, value: office.id, cityId: office.locatable?.id
}))

const formFields = computed<IFormFieldConfig[]>(() => ([
  {
    name: 'pickupOffice',
    type: 'selectMenu',
    width: 'col-span-6',
    rules: ['required'],
    formFieldProps: {
      label: 'Oficina de Recogida',
      required: true
    },
    fieldProps: {
      items: officeOptions
    }
  },
  {
    name: 'pickupDate',
    type: 'input',
    width: 'col-span-3',
    rules: ['required'],
    formFieldProps: {
      label: 'Fecha de Recogida',
      required: true
    },
    fieldProps: {
      type: 'date'
    }
  },
  {
    name: 'pickupTime',
    type: 'select',
    width: 'col-span-3',
    rules: ['required'],
    formFieldProps: {
      label: 'Hora de Recogida',
      required: true
    },
    fieldProps: {
      disabled: !validationDate.value,
      valueKey: 'value',
      loading: loading.value,
      items: validationDate.value?.pickupHourSlots.slots.map(item => ({
        value: item.hour, label: item.hour, disabled: !item.available
      }))
    }
  },
  {
    name: 'dropOfficeId',
    type: 'selectMenu',
    width: 'col-span-6',
    vIf: !!form.value.pickupTime,
    rules: ['required'],
    formFieldProps: {
      label: 'Oficina de Devolución',
      required: true
    },
    fieldProps: {
      items: officeOptions.filter(item => item.cityId == form.value.pickupOffice?.cityId),
      valueKey: 'value'
    }
  },
  {
    name: 'dropDate',
    type: 'input',
    width: 'col-span-3',
    vIf: !!form.value.pickupTime,
    rules: ['required'],
    formFieldProps: {
      label: 'Fecha de devolución',
      required: true
    },
    fieldProps: {
      type: 'date',
      min: validationDate.value?.reservationDates.minDropoffDate,
      max: validationDate.value?.reservationDates.maxDropoffDate,
    }
  },
  {
    name: 'dropTime',
    type: 'select',
    width: 'col-span-3',
    vIf: !!form.value.pickupTime,
    rules: ['required'],
    formFieldProps: {
      label: 'Hora de devolución',
      required: true
    },
    fieldProps: {
      items: validationDate.value?.pickupHourSlots.slots.map(item => item.hour)
    }
  },
]))

const dateValidation = async () =>
{
  form.value.pickupTime = null
  form.value.dropOfficeId = null
  form.value.dropDate = null
  form.value.dropTime = null
  loading.value = true
  const {data: dateValidation} = await irentcarReservationRepository.dateValidation({
    filter: {
      pickup_office_id: form.value.pickupOffice?.value,
      pickup_date: form.value.pickupDate
    }
  })
  validationDate.value = dateValidation
  loading.value = false
}
</script>

<template>
  <IForm
    v-model="form"
    :fields="formFields"
    submit-label="Buscar vehículos"
    :button-props="{
      size: 'lg',
      block: true,
      class: 'bg-secondary text-secondary text-white hover:bg-primary hover:text-white transition'
    }"
    :ui="{
      actions: 'items-end'
    }"
  />
</template>
