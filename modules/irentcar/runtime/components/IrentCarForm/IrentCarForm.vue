<script setup lang="ts">
  import {irentcarOfficeRepository} from '#irentcar/utils/repository'
  import type {
    RentAvailability,
    IrentCarFormProps,
    OfficeOption,
    IrentCarFormEmits,
    dropLimitCalendarType, ResettableKeys
  } from './IrentCarForm'
  import type {IFormFieldConfig} from "~/components/IForm/IForm";
  import type {Slot} from "#irentcar/types/reservation";
  import {useInavigation} from "#icore/composables/useInavigation";
  import {generateTimeSlots, defaultFormValues} from './config'
  import {defu} from "defu";
  import moment from 'moment'

  const {goTo} = useInavigation()
  const props = defineProps<IrentCarFormProps>()
  const emit = defineEmits<IrentCarFormEmits>()

  const router = useRouter()
  const storeSettings = useIsettingStore()
  const urlFilters = router.currentRoute.value.query.rentAvailability ?? '{}'
  const preFilters = JSON.parse(urlFilters as string)
  // Instance the time slots
  const slots = generateTimeSlots(
    storeSettings.get('irentcar::slotRangeStart'),
    storeSettings.get('irentcar::slotRangeEnd'),
    storeSettings.get('irentcar::slotsInvervalMinutes')
  )
  // Get the settings for date validation
  const minAdvanceMinutes = storeSettings.get('irentcar::minAdvanceMinutes')
  const minDropOffDays = storeSettings.get('irentcar::minDropoffDays') ?? 1
  const maxDropOffDays = storeSettings.get('irentcar::maxDropoffDays')

  //Main refs
  const form = reactive<RentAvailability>({...defaultFormValues, ...preFilters})
  const loading = ref<boolean>(false)

  //Validate if show the drop section
  const showDropSection = computed(() =>
    Boolean(form.pickupOfficeId && form.pickupDate && form.pickupTime)
  )
  //Validate if pickup time is the last slot
  const pickupIsLastSlot = computed(() => form.pickupTime == slots.at(-1)?.hour)
  // Compute the available pickup hour slots
  const pickupHourSlots = computed<Slot[]>(() =>
  {
    if (!moment(form.pickupDate, 'YYYY-MM-DD').isSame(moment(), 'day')) return slots;
    const nowPlus = moment().add(minAdvanceMinutes, 'minutes')
    return slots.filter(s =>
    {
      const slotDate = moment(`${form.pickupDate} ${s.hour}`, 'YYYY-MM-DD hh:mm')
      return slotDate.isAfter(nowPlus)
    })
  })
  // Computed the min and max calendar days for dropDate
  const dropLimitCalendar = computed<dropLimitCalendarType>(() =>
  {
    const {pickupDate, pickupTime} = form
    let min = moment(pickupDate).add(1, 'days').format('YYYY-MM-DD')
    let max = null
    if (pickupDate && pickupTime)
    {
      if (minDropOffDays >= 2)
      {
        const addMinDays = pickupIsLastSlot.value ? minDropOffDays : minDropOffDays - 1
        min = moment(pickupDate).add(addMinDays, 'days').format('YYYY-MM-DD')
      }
      if (maxDropOffDays)
      {
        max = moment(pickupDate).add(maxDropOffDays, 'days').format('YYYY-MM-DD')
      }
    }
    return {min, max} as dropLimitCalendarType
  })
  // Computed the available dropOff hour slots
  const dropOffHourSlots = computed<Slot[]>(() =>
  {
    if ((form.dropDate == dropLimitCalendar.value.min) && !pickupIsLastSlot.value)
    {
      const pickupSlotIndex = slots.findIndex(slot => slot.hour == form.pickupTime)
      return slots.slice(pickupSlotIndex + 1)
    }
    return slots
  })

  watch(
    [() => form.pickupOfficeId, () => form.pickupDate, () => form.pickupTime],
    ([newOffice, newDate, newTime], [oldOffice, oldDate, oldTime]) =>
    {
      let reset: ResettableKeys[] = []
      if (newOffice !== oldOffice) reset = ['dropOfficeId', 'dropDate', 'dropTime']
      else if (newDate !== oldDate) reset = ['pickupTime', 'dropOfficeId', 'dropDate', 'dropTime']
      else if (newTime !== oldTime) reset = ['dropDate', 'dropTime']
      reset.forEach((field) => form[field] = null)
    }
  )

  const {data: offices} = await useAsyncData(`irentCar:offices`, () =>
    irentcarOfficeRepository.index({include: 'locatable'})
  )

  const officeOptions: OfficeOption[] = (offices.value?.data ?? []).map(office => ({
    label: office.title, value: office.id, cityId: office.locatable?.cityId
  }))

  const selectedPickupOffice = computed<OfficeOption | null>(() =>
  {
    if (!form.pickupOfficeId) return null
    return officeOptions.find(office => office.value === form.pickupOfficeId) ?? null
  })
  const formFields = computed<IFormFieldConfig[]>(() => ([
    {
      name: 'pickupOfficeId',
      type: 'selectMenu',
      width: 'col-span-12 md:col-span-6',
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
      width: 'col-span-12 sm:col-span-6 md:col-span-3',
      rules: ['required'],
      formFieldProps: {
        label: 'Fecha de Recogida',
        required: true
      },
      fieldProps: {
        type: 'date',
        min: moment().format('YYYY-MM-DD')
      }
    },
    {
      name: 'pickupTime',
      type: 'select',
      width: 'col-span-12 sm:col-span-6 md:col-span-3',
      rules: ['required'],
      formFieldProps: {
        label: 'Hora de Recogida',
        required: true
      },
      fieldProps: {
        disabled: !form.pickupDate,
        valueKey: 'value',
        loading: loading.value,
        items: pickupHourSlots.value.map(item => ({value: item.hour, label: item.hour}))
      }
    },
    {
      name: 'dropOfficeId',
      type: 'selectMenu',
      width: 'col-span-12 md:col-span-6',
      showIf: showDropSection.value,
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
      width: 'col-span-12 sm:col-span-6 md:col-span-3',
      showIf: showDropSection.value,
      rules: ['required'],
      formFieldProps: {
        label: 'Fecha de devolución',
        required: true
      },
      fieldProps: {
        type: 'date',
        ...dropLimitCalendar.value
      }
    },
    {
      name: 'dropTime',
      type: 'select',
      width: 'col-span-12 sm:col-span-6 md:col-span-3',
      showIf: showDropSection.value,
      rules: ['required'],
      formFieldProps: {
        label: 'Hora de devolución',
        required: true
      },
      fieldProps: {
        disabled: !form.dropDate,
        items: dropOffHourSlots.value.map(item => ({
          value: item.hour, label: item.hour
        }))
      }
    },
  ]))

  const onSubmit = () =>
  {
    emit("submit", {
      ...form,
      pickupOffice: offices.value?.data.find(i => i.id == form.pickupOfficeId) ?? null,
      dropoffOffice: offices.value?.data.find(i => i.id == form.dropOfficeId) ?? null,
    })
    goTo({name: "irentcar.page.stepper", query: {rentAvailability: JSON.stringify(form)}})
  }

  onMounted(async () =>
  {
    const {pickupOfficeId, pickupDate, pickupTime, dropOfficeId, dropDate, dropTime} = form
    if (pickupOfficeId && pickupDate && pickupTime && dropOfficeId && dropDate && dropTime)
    {
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
