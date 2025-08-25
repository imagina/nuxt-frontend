<script setup lang="ts">

type Field =
  | { key: string; label?: string; required?: boolean; width?: string; component?: 'input';  type?: string; placeholder?: string; help?: string }
  | { key: string; label?: string; required?: boolean; width?: string; component: 'textarea'; rows?: number; placeholder?: string; help?: string }
  | { key: string; label?: string; required?: boolean; width?: string; component: 'select';  placeholder?: string; options: Array<string | { label: string; value: string }>; help?: string }
  | { key: string; label?: string; required?: boolean; width?: string; component: 'file';    accept?: string; help?: string }
  | { key: string; label: string;  required?: boolean; width?: string; component: 'checkbox' }

const fields: Field[] = [
  { required: true, key: 'nombre', label: '', placeholder: 'Nombre', width: 'col-span-12' },
  { required: true, key: 'apellidos', label: '', placeholder: 'Apellidos', width: 'col-span-12' },
  { required: true, key: 'telefono',  label: '', placeholder: 'Número de contacto', type: 'tel', width: 'col-span-12' },
  { required: true, key: 'email',     label: '', placeholder: 'Correo electrónico', type: 'email', width: 'col-span-12' },
  { required: true, key: 'ciudad',    label: '', placeholder: 'Ciudad', component: 'select', options: ['Bogotá', 'Medellín', 'Cali'], width: 'col-span-12' },
  { required: true, key: 'mensaje',   label: '', component: 'textarea', rows: 4, placeholder: 'Mensaje…', width: 'col-span-12' },
  { required: false, key: 'archivo',   label: '', component: 'file', accept: '.pdf,.jpg,.jpeg,.png', help: '(Adjunta un .PDF o .JPG si lo requieres)', width: 'col-span-12' },
  { required: true,key: 'autorizo',  label: 'Autorizo el manejo de datos personales', component: 'checkbox', width: 'col-span-12' }
]

const state = reactive<Record<string, any>>({
  apellidos: '', telefono: '', email: '', ciudad: '', mensaje: '', archivo: null, autorizo: false
})

</script>
<style>
input[type="file"] {
border: 0;
padding: 0;
border-radius: 0;
box-shadow: none;
height: 40px;
background: transparent;
}
input[type="file"]::file-selector-button {
  background: #EFEFEF;
  color: #444444;
  font-weight: 500;
  font-size: 16px;
  border: 1px solid #5B6077;
  padding: 6px 20px;
  transition: .2s;
}
input[type="file"]::file-selector-button:hover {
    background-color: #cccccc;
}
</style>
<template>
  <IFormDynamic :fields="fields"
                v-model:state="state"
                text-botom="Enviar"
                sizeForm="xl"
                :botom-props="{ size: 'xl', block: true, class: 'justify-center bg-secondary h-[45px] text-white hover:bg-primary hover:text-white transition' }" />

</template>
