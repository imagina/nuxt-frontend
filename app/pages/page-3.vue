<script setup lang="ts">
  import type { PageData } from '#ipage/types/pages'
  defineProps<{ page: PageData }>()
  import { ref } from 'vue'
  import type { IFormFieldConfig } from '~/components/IForm/IForm.d'

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
          system-name="slider_home"
          dots-position="inside-left-middle"
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
        <div class="page-body mb-10" v-html="impBody"></div>
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
<style>
.contacto .page-body {
  font-family: DM Sans;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  text-align: justify;

  & h1, & h2, & h3, & h4 {
    font-weight: 600;
    margin-bottom: 15px;
  }
  & h1, h2 {
    font-size: 40px;
    line-height: 50px;
  }
  & h3, & h4 {
    font-size: 20px;
    line-height: 30px;
  }

    & ul {
    list-style: disc !important;
    padding-left: 1.25rem;
    margin-top: 15px;
    & li {
    display: list-item;
    margin-bottom: .5rem;
    }
  }

  & ol {
    list-style: decimal !important;
    padding-left: 1.25rem;
    margin-top: 15px;
    & li {
    display: list-item;
    margin-bottom: .5rem;
    }
  }

  @media (max-width: 767.98px) {
  font-size: 18px;
    & h1, h2 {
    font-size: 30px;
    line-height: 40px;
    }

    & h3, & h4 {
    font-size: 20px;
    line-height: 25px;
    }
  }

  & strong, & a {
  color: var(--primary);
  }

}
.contacto input[type="file"] {
  border: 0;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
  height: 40px;
  background: transparent;
}
.contacto input[type="file"]::file-selector-button {
  background: #EFEFEF;
  color: #444444;
  font-weight: 500;
  font-size: 16px;
  border: 1px solid #5B6077;
  padding: 6px 20px;
  transition: .2s;
}
.contacto input[type="file"]::file-selector-button:hover {
  background-color: #cccccc;
}
</style>

