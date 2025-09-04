<script setup lang="ts">
import { ref } from 'vue';
import type { IFormFieldConfig } from '~/components/IForm/IForm.d'
import type { PageData } from '#ipage/types/pages'
defineProps<{ page: PageData }>()

const formData = ref<Record<string, any>>({})

const fields: IFormFieldConfig[] = [
  {
    name: 'nombre',
    type: 'input',
    default: '',
    rules: ['required'],
    formFieldProps: { label: '', class: 'col-span-12', ui: { label: 'sr-only' } },
    fieldProps: { placeholder: 'Nombre', size:'xl' }
  },
  {
    name: 'apellidos',
    type: 'input',
    default: '',
    rules: ['required'],
    formFieldProps: { label: '', class: 'col-span-12', ui: { label: 'sr-only' } },
    fieldProps: { placeholder: 'Apellidos', size:'xl' }
  },
  {
    name: 'telefono',
    type: 'input',
    default: '',
    rules: ['required'],
    formFieldProps: { label: '', class: 'col-span-12', ui: { label: 'sr-only' } },
    fieldProps: { placeholder: 'Número de contacto', type: 'tel', size:'xl' }
  },
  {
    name: 'email',
    type: 'input',
    default: '',
    rules: ['required', 'email'],
    formFieldProps: { label: '', class: 'col-span-12', ui: { label: 'sr-only' } },
    fieldProps: { placeholder: 'Correo electrónico', type: 'email', autocomplete: 'email', size:'xl' }
  },
  {
    name: 'ciudad',
    type: 'select',
    default: null,
    rules: ['required'],
    formFieldProps: { label: '', class: 'col-span-12', ui: { label: 'sr-only' }  },
    fieldProps: {
      placeholder: 'Ciudad',
      size:'xl',
      items: ['Bogotá', 'Medellín', 'Cali']
    }
  },
  {
    name: 'mensaje',
    type: 'textarea',
    default: '',
    rules: ['required'],
    formFieldProps: { label: '', class: 'col-span-12', ui: { label: 'sr-only' } },
    fieldProps: { rows: 4, placeholder: 'Mensaje…' }
  },
  {
    name: 'archivo',
    type: 'input',
    default: null,
    rules: [],
    formFieldProps: { label: '', class: 'col-span-12', help: '(Adjunta un .PDF o .JPG si lo requieres)' },
    fieldProps: { type: 'file', accept: '.pdf,.jpg,.jpeg,.png' } as any
  },
  {
    name: 'autorizo',
    type: 'checkbox',
    default: false,
    rules: ['required'],
    formFieldProps: { label: '', class: 'col-span-12' },
    fieldProps: { label: 'Autorizo el manejo de datos personales' }
  }
]

const buttonProps = {
  size: 'xl',
  class: 'justify-center bg-secondary  text-white hover:bg-primary hover:text-white transition'
}
const ui = {
  form: 'grid grid-cols-12 gap-4',
  actions: 'col-span-12 mt-2'
}

const onSubmit = (values: Record<string, any>) => {
  console.log('Form submitted:', values)
}

const impBody = "<h2 style=\"text-align: center;\">&iexcl;Escr&iacute;benos!</h2>\n\n<p style=\"text-align: center;\">Completa el formulario. Te contactaremos tan pronto como nos sea posible. &iexcl;Gracias!</p>";

</script>

<template>
  <div>
    <!-- Contacto -->
     <IBreadcrumb
      :title="page.title ?? '...'"
      :ui="{ link: 'font-bold text-gray-3' }">
      <template #extraUp>
        <IsliderCarousel
          system-name="publi_contacto"
          dots-position="inside-left-middle"
          item-theme="ItemTheme2"
          :carousel-props="{
          dots: true,
          autoplay: true,
          loop: true,
          ui: {
            item: 'h-[260px] sm:h-[360px] md:h-[400px]',
            dot: 'w-[16px] h-[16px] rounded-full bg-[#FFFFFF80] data-[state=active]:bg-secondary'
          }
        }"
        />
      </template>
    </IBreadcrumb>
    <div class="bg-gray-2">
      <section class="container mx-auto py-10 px-4 sm:px-6 lg:px-10 contacto">
        <h1 class="page-title hidden">{{ page.title }}</h1>
        <div class="page-body mb-9" v-html="page.body"></div>
        <div class="grid grid-cols-12 gap-10">
          <div class="col-span-12 lg:col-span-6">
            <IForm
              v-model="formData"
              :fields="fields"
              submit-label="Enviar"
              @submit="onSubmit"
              :button-props="buttonProps"
              :ui="ui"
            />
          </div>
          <div class="col-span-12 lg:col-span-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63623.92796860637!2d-74.13125156112116!3d4.683603391468811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9aeed5ded35d%3A0xf23844a180342b9c!2sAlquiler%20de%20Carros%20Bogot%C3%A1%20-%20ABC%20RENT%20A%20CAR!5e0!3m2!1ses!2sve!4v1755888820280!5m2!1ses!2sve"
              width="100%"
              height="550"
              class="rounded-lg"
              style="border:0;"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped>
@reference "~/assets/css/main.css";

.contacto .page-body {
  font-family: 'DM Sans', ui-sans-serif, system-ui;
  @apply font-normal text-[18px] leading-[20px] md:text-[20px] md:leading-[30px];

  & :deep(img) { object-fit: cover; border-radius: 30px; }

  /* grid dentro del HTML inyectado */
  & :deep(:is(.grid)) { @apply gap-10; }

  /* Títulos */
  & :deep(:is(h1,h2,h3,h4)) { @apply font-semibold mb-[15px]; }
  & :deep(:is(h1,h2)) { @apply text-[30px] leading-[40px] md:text-[40px] md:leading-[50px]; }
  & :deep(:is(h3)) { @apply text-[20px] leading-[25px] md:text-[30px] md:leading-[40px]; }
  & :deep(:is(h4)) { @apply text-[16px] leading-[20px] md:text-[20px] md:leading-[30px]; }

  /* Listas */
  & :deep(:is(ul)) { @apply list-disc pl-5 mt-[15px]; }
  & :deep(:is(ul li)) { @apply list-item mb-2; }
  & :deep(:is(ol)) { @apply list-decimal pl-5 mt-[15px]; }
  & :deep(:is(ol li)) { @apply list-item mb-2; }

  /* Énfasis y enlaces */
  & :deep(:is(strong,a)) { @apply text-primary; }

  /* Separador */
  & :deep(:is(hr)) {
    @apply border-t;
    border-color: #00000026;
  }
}

.contacto :deep(input[type="file"]) {
  border: 0;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
  height: 40px;
  background: transparent;
}
.contacto :deep(input[type="file"])::file-selector-button {
  background: #EFEFEF;
  color: #444444;
  font-weight: 500;
  font-size: 16px;
  border: 1px solid #5B6077;
  padding: 6px 20px;
  transition: .2s;
}
.contacto :deep(input[type="file"])::file-selector-button:hover {
  background-color: #cccccc;
}
</style>

