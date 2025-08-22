<script setup lang="ts">

type Field =
  | { key: string; label?: string; required?: boolean; width?: string; component?: 'input';  type?: string; placeholder?: string; help?: string }
  | { key: string; label?: string; required?: boolean; width?: string; component: 'textarea'; rows?: number; placeholder?: string; help?: string }
  | { key: string; label?: string; required?: boolean; width?: string; component: 'select';  placeholder?: string; options: Array<string | { label: string; value: string }>; help?: string }
  | { key: string; label?: string; required?: boolean; width?: string; component: 'file';    accept?: string; help?: string }
  | { key: string; label: string;  required?: boolean; width?: string; component: 'checkbox' }

const fields: Field[] = [
  { required: true, key: 'devolver', label: 'Devolver a una oficina diferente', component: 'checkbox', width: 'col-span-12' },
  { required: true, key: 'oficina', label: 'Oficina de recogida', placeholder: 'Oficina de recogida', width: 'col-span-12' },
  { required: true, key: 'recogida', label: 'Fecha y hora de recogida', placeholder: 'dd/mm/aaaa', type: 'datetime-local', width: 'col-span-12 md:col-span-3' },
  { required: true, key: 'devolucion',  label: 'Fecha y hora de la devolución', placeholder: 'dd/mm/aaaa', type: 'datetime-local', width: 'col-span-12 md:col-span-3' },
  { required: true, key: 'edad',     label: 'Edad del conductor', placeholder: '35', type: 'email', width: 'col-span-12 md:col-span-3' },
]

const size = 'lg'

const state = reactive<Partial<Schema>>({
  devolver: false,
  oficina: '',
  recogida: '',
  devolucion: '',
  edad: undefined
})

const classButton = 'col-span-12 md:col-span-3'

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'El formulario ha sido enviado', color: 'success' })
  console.log(event.data)
}
</script>

<template>
    <UForm :state="state"  @submit="onSubmit">
    <div class="grid grid-cols-12 gap-4 items-end">
    <template v-for="f in fields" :key="f.key">
      <div :class="f.width || 'col-span-12'">
        <UFormField v-if="f.component !== 'checkbox'" :name="f.key" :label="f.label" :help="f.help">
          <template v-if="f.component === 'textarea'">
            <UTextarea :required="f.required" :size="size" v-model="state[f.key]" :rows="(f as any).rows ?? 4" :placeholder="f.placeholder" class="w-full" />
          </template>

          <template v-else-if="f.component === 'select'">
            <USelect :required="f.required" :size="size" v-model="state[f.key]"  :items="(f as any).options" :placeholder="f.placeholder" class="w-full"/>
          </template>

          <template v-else-if="f.component === 'file'">
            <UInput :required="f.required" type="file" :size="size" :accept="(f as any).accept" @change="(e:any)=> state[f.key] = e?.target?.files?.[0] ?? null" class="w-full"/>
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

        <UCheckbox v-else :required="f.required" :size="size" v-model="state[f.key]" :label="(f as any).label" class="w-full"/>

      </div>
    </template>
    <div :class="classButton">
        <UButton
        :size="size"
          type="submit"
          class="bg-white w-full justify-center lg:bg-secondary text-secondary lg:text-white hover:bg-primary hover:text-white transition"
        >
          Buscar vehículos
        </UButton>
      </div>
  </div>
  </UForm>
</template>
