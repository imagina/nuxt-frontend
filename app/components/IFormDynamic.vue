<script setup lang="ts">
import type { ButtonProps, FormSubmitEvent } from '@nuxt/ui'

type Field =
  | { key: string; label?: string; required?: boolean; width?: string; component?: 'input';  type?: string; placeholder?: string; help?: string }
  | { key: string; label?: string; required?: boolean; width?: string; component: 'textarea'; rows?: number; placeholder?: string; help?: string }
  | { key: string; label?: string; required?: boolean; width?: string; component: 'select';  placeholder?: string; options: Array<string | { label: string; value: string }>; help?: string }
  | { key: string; label?: string; required?: boolean; width?: string; component: 'file';    accept?: string; help?: string }
  | { key: string; label: string;  required?: boolean; width?: string; component: 'checkbox' }

const props = withDefaults(defineProps<{
  fields: Field[]
  botomProps?: Partial<ButtonProps> | Record<string, any>
  textBotom?: string
  gridColsBotom?: string
  gridClass?: string
  sizeForm?: string
}>(), {
  botomProps: () => ({
    color: 'primary',
    variant: 'solid',
    size: 'lg',
  }),
  textBotom: 'Enviar',
  gridColsBotom: 'col-span-12',
  gridClass: 'items-end',
  sizeForm: 'lg'
})


// v-model:state (el padre controla el objeto state)
const formState = defineModel<Record<string, any>>('state', { default: {} })

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'El formulario ha sido enviado', color: 'success' })
  console.log(event.data)
}

</script>

<template>
  <UForm :state="formState" @submit="onSubmit">
  <div class="grid grid-cols-12 gap-4" :class="gridClass">
    <template v-for="f in props.fields" :key="f.key">
      <div :class="f.width || 'col-span-12'">
        <UFormField v-if="f.component !== 'checkbox'" :name="f.key" :label="f.label" :help="f.help">
          <template v-if="f.component === 'textarea'">
            <UTextarea :required="f.required" :size="props.sizeForm" v-model="formState[f.key]" :rows="(f as any).rows ?? 4" :placeholder="f.placeholder" class="w-full" />
          </template>

          <template v-else-if="f.component === 'select'">
            <USelect :required="f.required" :size="props.sizeForm" v-model="formState[f.key]"  :items="(f as any).options" :placeholder="f.placeholder" class="w-full"/>
          </template>

          <template v-else-if="f.component === 'file'">
            <UInput :required="f.required" type="file" :size="props.sizeForm" :accept="(f as any).accept" @change="(e:any)=> formState[f.key] = e?.target?.files?.[0] ?? null" class="w-full"/>
          </template>

          <template v-else>
            <UInput
              :required="f.required"
              v-model="formState[f.key]"
              :type="(f as any).type || 'text'"
              :placeholder="f.placeholder" class="w-full" :size="props.sizeForm"
            />
          </template>
        </UFormField>
        <UCheckbox v-else :required="f.required" :size="props.sizeForm" v-model="formState[f.key]" :label="(f as any).label" class="w-full"/>
      </div>
    </template>
    <div :class="gridColsBotom">
      <UButton type="submit"  v-bind="props.botomProps" >
        <slot>{{ props.textBotom }}</slot>
      </UButton>
    </div>
  </div>
</UForm>
</template>
