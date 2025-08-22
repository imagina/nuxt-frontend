<script setup lang="ts">
import { reactive } from 'vue'

type Field =
  | { key: string; label?: string; required?: boolean; width?: string; component?: 'input';  type?: string; placeholder?: string; help?: string }
  | { key: string; label?: string; required?: boolean; width?: string; component: 'textarea'; rows?: number; placeholder?: string; help?: string }
  | { key: string; label?: string; required?: boolean; width?: string; component: 'select';  placeholder?: string; options: Array<string | { label: string; value: string }>; help?: string }
  | { key: string; label?: string; required?: boolean; width?: string; component: 'file';    accept?: string; help?: string }
  | { key: string; label: string;  required?: boolean; width?: string; component: 'checkbox' }

const fields: Field[] = [
  { required: true, key: 'nombre', label: 'Nombre', placeholder: 'Nombre', width: 'col-span-12' },
  { required: true, key: 'apellidos', label: 'Apellidos', placeholder: 'Apellidos', width: 'col-span-12' },
  { required: true, key: 'telefono',  label: 'Número de contacto', placeholder: 'Número de contacto', type: 'tel', width: 'col-span-12' },
  { required: true, key: 'email',     label: 'Correo electrónico', placeholder: 'Correo electrónico', type: 'email', width: 'col-span-12' },
  { required: true, key: 'ciudad',    label: 'Ciudad', placeholder: 'Ciudad', component: 'select', options: ['Bogotá', 'Medellín', 'Cali'], width: 'col-span-12' },
  { required: true, key: 'mensaje',   label: 'Mensaje…', component: 'textarea', rows: 4, placeholder: 'Mensaje…', width: 'col-span-12' },
  { required: false, key: 'archivo',   label: 'Adjuntar Archivo', component: 'file', accept: '.pdf,.jpg,.jpeg,.png', help: '(Adjunta un .PDF o .JPG si lo requieres)', width: 'col-span-12' },
  { required: true,key: 'autorizo',  label: 'Autorizo el manejo de datos personales', component: 'checkbox', width: 'col-span-12' }
]

const state = reactive<Record<string, any>>({
  apellidos: '', telefono: '', email: '', ciudad: '', mensaje: '', archivo: null, autorizo: false
})

const size = 'xl'

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'El formulario ha sido enviado', color: 'success' })
  console.log(event.data)
}
</script>

<template>
  <UForm :state="state"  @submit="onSubmit">
  <div class="grid grid-cols-12 gap-4">
    <template v-for="f in fields" :key="f.key">
      <div :class="f.width || 'col-span-12'">
        <!-- Campos “normales” dentro de UFormField -->
        <UFormField  :name="f.key" :help="f.help">
          <template v-if="f.component === 'textarea'">
            <UTextarea :required="f.required" :size="size" v-model="state[f.key]" :rows="(f as any).rows ?? 4" :placeholder="f.placeholder" class="w-full" />
          </template>

          <template v-else-if="f.component === 'select'">
            <USelect :required="f.required" :size="size" v-model="state[f.key]"  :items="(f as any).options" :placeholder="f.placeholder" class="w-full"/>
          </template>

          <template v-else-if="f.component === 'file'">
            <UInput :required="f.required" type="file" :size="size" :accept="(f as any).accept" @change="(e:any)=> state[f.key] = e?.target?.files?.[0] ?? null" class="w-full"/>
          </template>

          <template v-else-if="f.component === 'checkbox'">
             <UCheckbox :required="f.required" :size="size" v-model="state[f.key]" :label="(f as any).label" class="w-full"/>
          </template>

          <template v-else>
            <UInput
              :required="f.required"
              v-model="state[f.key]"
              :type="(f as any).type || 'text'"
              :placeholder="f.placeholder" class="w-full" :size="size"
            />
          </template>
        </UFormField>
      </div>
    </template>
  </div>
  <div class="mt-4">
    <UButton type="submit"
      class="w-full justify-center bg-secondary h-[45px] text-white hover:bg-primary hover:text-white transition">
      Enviar
    </UButton>
  </div>
  </UForm>
</template>
