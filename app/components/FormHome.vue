<script setup lang="ts">

type Field =
  | { key: string; label?: string; required?: boolean; width?: string; component?: 'input';  type?: string; placeholder?: string; help?: string }
  | { key: string; label?: string; required?: boolean; width?: string; component: 'textarea'; rows?: number; placeholder?: string; help?: string }
  | { key: string; label?: string; required?: boolean; width?: string; component: 'select';  placeholder?: string; options: Array<string | { label: string; value: string }>; help?: string }
  | { key: string; label?: string; required?: boolean; width?: string; component: 'file';    accept?: string; help?: string }
  | { key: string; label: string;  required?: boolean; width?: string; component: 'checkbox' }

const fields: Field[] = [
  { required: false, key: 'devolver', label: 'Devolver a una oficina diferente', component: 'checkbox', width: 'col-span-12' },
  { required: true, key: 'oficina', label: 'Oficina de recogida', placeholder: 'Oficina de recogida', width: 'col-span-12' },
  { required: true, key: 'recogida', label: 'Fecha y hora de recogida', placeholder: 'dd/mm/aaaa', type: 'datetime-local', width: 'col-span-12 md:col-span-3' },
  { required: true, key: 'devolucion',  label: 'Fecha y hora de la devolución', placeholder: 'dd/mm/aaaa', type: 'datetime-local', width: 'col-span-12 md:col-span-3' },
  { required: true, key: 'edad',     label: 'Edad del conductor', placeholder: '35', type: 'email', width: 'col-span-12 md:col-span-3' },
]


const state = reactive<Partial<Schema>>({
  devolver: false,
  oficina: '',
  recogida: '',
  devolucion: '',
  edad: undefined
})


</script>

<template>
  <IFormDynamic :fields="fields"
                v-model:state="state"
                gridColsBotom="col-span-12 md:col-span-3"
                text-botom="Buscar vehículos"
                :botom-props="{ size: 'lg', block: true, class: 'bg-white lg:bg-secondary text-secondary lg:text-white hover:bg-primary hover:text-white transition' }" />
</template>
