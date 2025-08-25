<script setup lang="ts">
  import type { PageData } from '#ipage/types/pages'
  defineProps<{ page: PageData }>()

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


const impBody = "<h2 style=\"text-align: center;\">&iexcl;Escr&iacute;benos!</h2>\n\n<p style=\"text-align: center;\">Completa el formulario. Te contactaremos tan pronto como nos sea posible. &iexcl;Gracias!</p>";

</script>
<style>
.nosotros .page-body {
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

}</style>
<template>
  <div>
    <!-- Nosotros -->
    <IBreadcrumb
      :title="page.title ?? '...'"
      :ui="{ link: 'font-bold text-gray-3' }"
    />
    <div class="bg-gray-2">
    <section class="container mx-auto py-10 px-4 sm:px-6 lg:px-10 nosotros">
      <h1 class="page-title hidden">{{ page.title }}</h1>
      <div class="page-body mb-10" v-html="impBody"></div>
      <div class="grid grid-cols-12 gap-10">
        <div class="col-span-12 lg:col-span-6">
           <IFormDynamic :fields="fields"
                v-model:state="state"
                text-botom="Enviar" sizeForm="xl"
                :botom-props="{ size: 'xl', class: 'justify-center bg-secondary h-[45px] text-white hover:bg-primary hover:text-white transition' }" />

        </div>
        <div class="col-span-12 lg:col-span-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63623.92796860637!2d-74.13125156112116!3d4.683603391468811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9aeed5ded35d%3A0xf23844a180342b9c!2sAlquiler%20de%20Carros%20Bogot%C3%A1%20-%20ABC%20RENT%20A%20CAR!5e0!3m2!1ses!2sve!4v1755888820280!5m2!1ses!2sve"
            width="100%"
            height="550"
            class="rounded-lg"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
</div>

    </section>
</div>
  </div>
</template>

