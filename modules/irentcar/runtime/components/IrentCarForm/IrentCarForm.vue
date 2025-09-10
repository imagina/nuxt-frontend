<script setup lang="ts">
import {irentcarOfficeRepository, irentcarReservationRepository} from '#irentcar/utils/repository'
import type {RentAvailability, IrentCarFormProps, OfficeOption, IrentCarFormEmits} from './IrentCarForm'
import type {IFormFieldConfig} from "~/components/IForm/IForm";
import type {DateValidation} from "#irentcar/types/reservation";
import {useInavigation} from "#icore/composables/useInavigation";
import {defu} from "defu";

const {goTo} = useInavigation()
const props = defineProps<IrentCarFormProps>()
const emit = defineEmits<IrentCarFormEmits>()

const router = useRouter()
const urlFilters = router.currentRoute.value.query.rentAvailability ?? '{}'
const preFilters = JSON.parse(urlFilters as string)

const form = ref<RentAvailability>({
  pickupOfficeId: null,
  pickupDate: null,
  pickupTime: null,
  dropOfficeId: null,
  dropDate: null,
  dropTime: null,
  ...preFilters
})
const loading = ref<boolean>(false)
const validationDate = ref<DateValidation | null>(null)

watch(
  () => [form.value.pickupOfficeId, form.value.pickupDate] as const,
  async ([pickupOfficeId, pickupDate], [prevId, prevDate]) =>
  {
    if (!pickupOfficeId || !pickupDate) return
    if (pickupOfficeId === prevId && pickupDate === prevDate) return
    form.value.pickupTime = null
    form.value.dropOfficeId = form.value.pickupOfficeId
    form.value.dropDate = null
    form.value.dropTime = null
    await dateValidation()
  },
  {immediate: false}
)

const {data: offices} = await useAsyncData(`irentCar:offices`, () =>
  irentcarOfficeRepository.index({include: 'locatable'})
)

const officeOptions: OfficeOption[] = (offices.value?.data ?? []).map(office => ({
  label: office.title, value: office.id, cityId: office.locatable?.cityId
}))

const selectedPickupOffice = computed<OfficeOption | null>(() =>
{
  if (!form.value.pickupOfficeId) return null
  return officeOptions.find(office => office.value === form.value.pickupOfficeId) ?? null
})
const formFields = computed<IFormFieldConfig[]>(() => ([
  {
    name: 'pickupOfficeId',
    type: 'selectMenu',
    width: 'col-span-6',
    rules: ['required'],
    formFieldProps: {
      label: 'Oficina de Recogida',
      required: true
    },
    fieldProps: {
      items: officeOptions,
      valueKey: 'value'
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
      type: 'date',
      min: new Date().toISOString().split("T")[0]
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
    showIf: !!form.value.pickupTime,
    rules: ['required'],
    formFieldProps: {
      label: 'Oficina de Devolución',
      required: true
    },
    fieldProps: {
      items: officeOptions.filter(item => item.cityId == selectedPickupOffice.value?.cityId),
      valueKey: 'value'
    }
  },
  {
    name: 'dropDate',
    type: 'input',
    width: 'col-span-3',
    showIf: !!form.value.pickupTime,
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
    showIf: !!form.value.pickupTime,
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
  loading.value = true
  const {data: dateValidation} = await irentcarReservationRepository.dateValidation({
    filter: {
      pickup_office_id: selectedPickupOffice?.value?.value,
      pickup_date: form.value.pickupDate
    }
  })
  validationDate.value = dateValidation
  loading.value = false
}

const onSubmit = () =>
{
  emit("submit", {
    ...form.value,
    pickupOffice: offices.value?.data.find(i => i.id == form.value.pickupOfficeId) ?? null,
    dropoffOffice: offices.value?.data.find(i => i.id == form.value.dropOfficeId) ?? null,
  })
  goTo({name: "irentcar.page.stepper", query: {rentAvailability: JSON.stringify(form.value)}})
}

onMounted(async () =>
{
  const {pickupOfficeId, pickupDate, pickupTime, dropOfficeId, dropDate, dropTime} = form.value
  if (pickupOfficeId && pickupDate && pickupTime && dropOfficeId && dropDate && dropTime) {
    await dateValidation()
    onSubmit()
  }
})

const ui = defu(props.ui, {
  root: 'form-rent-car shadow-md rounded-3xl bg-white p-6'
})
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
    :ui="ui"
    @submit="onSubmit"
  />
</template>
