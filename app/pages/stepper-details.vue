<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui'

const step = ref(0)

const steps: StepperItem[] = [
  { title: 'Tarifas',            icon: 'mdi:car',                        slot: 'rates' },
  { title: 'Añadir Extras',      icon: 'mdi:puzzle-outline',             slot: 'extras' },
  { title: 'Sobre el Contrato',  icon: 'tabler:certificate-2',      slot: 'contract' },
  { title: 'Revisar y Reservar', icon: 'mdi:file-document-outline',    slot: 'review' }
]

// ------- Filtros (demo) -------
const filter = reactive({
  tipo: 'Todos',
  transmision: 'Todos'
})
const tipos = ['Todos', 'Económico', 'Sedán', 'SUV', 'Pick-up']
const transmisiones = ['Todos', 'Mecánico', 'Automático']
function resetFilters () {
  filter.tipo = 'Todos'
  filter.transmision = 'Todos'
}

// ------- Listado -------
type Car = {
  id: number
  name: string
  gama: string
  media: object
  transmision: 'Mecánico' | 'Automático'
  pasajeros: number
  maletas: number
  puertas: number
  price: number
  features: string[]
  recommended?: boolean
}
const cars = ref<Car[]>([
  { id:1, name:'Kia picanto mecánico o similar',   gama:'GAMA E',  media: { isImage: true, url: '/images/kia-automatico.jpg'}, transmision:'Mecánico',  pasajeros:5, maletas:3, puertas:3, price:0, features:['Radio sistema AM/FM','Aire acondicionado','Convertible gasolina','4 airbags'] , recommended:true},
  { id:2, name:'Kia picanto automático o similar', gama:'GAMA EA', media: { isImage: true, url: '/images/kia-automatico.jpg'}, transmision:'Automático', pasajeros:5, maletas:3, puertas:3, price:0, features:['ABS + EBD','Control estabilidad (ESC)','Puerto USB'] },
  { id:3, name:'Renault logan mecánico o similar', gama:'GAMA IM', media: { isImage: true, url: '/images/kia-automatico.jpg'}, transmision:'Mecánico',  pasajeros:5, maletas:3, puertas:4, price:0, features:['Android Auto / CarPlay'] },
  { id:4, name:'Suzuki Swift o similar',           gama:'GAMA IA', media: { isImage: true, url: '/images/kia-automatico.jpg'}, transmision:'Mecánico',  pasajeros:5, maletas:3, puertas:4, price:0, features:['Rines de 14"'] },
  { id:5, name:'Nissan versa automático o similar',gama:'GAMA P',  media: { isImage: true, url: '/images/kia-automatico.jpg'}, transmision:'Automático', pasajeros:5, maletas:3, puertas:4, price:0, features:['Cámara de reversa'] },
  { id:6, name:'Hyundai Tucson automático',        gama:'GAMA FL', media: { isImage: true, url: '/images/kia-automatico.jpg'}, transmision:'Automático', pasajeros:5, maletas:3, puertas:5, price:0, features:['Airbags múltiples'] },
  { id:7, name:'Nissan X-Trail automático',        gama:'GAMA GI', media: { isImage: true, url: '/images/kia-automatico.jpg'}, transmision:'Automático', pasajeros:5, maletas:3, puertas:5, price:0, features:['Control crucero'] },
  { id:8, name:'Ford Explorer automático',         gama:'GAMA GL', media: { isImage: true, url: '/images/kia-automatico.jpg'}, transmision:'Automático', pasajeros:5, maletas:3, puertas:5, price:0, features:['Tapicería premium'] },
])

const filtered = computed(() => {
  return cars.value.filter(c => {
    const okTipo = filter.tipo === 'Todos' || (filter.tipo === 'SUV' ? c.name.toLowerCase().includes('tucson') || c.name.toLowerCase().includes('x-trail') || c.name.toLowerCase().includes('explorer') : true)
    const okTrans = filter.transmision === 'Todos' || c.transmision === filter.transmision
    return okTipo && okTrans
  })
})

// Carro seleccionado
const selectedCar = ref<Car | null>(null)
const isSelected = (c: Car) => selectedCar.value?.id === c.id


function selectCar (car: Car) {
  selectedCar.value = car
  // stepper?.next()
}

// ------- Detalles del viaje (demo) -------
const trip = reactive({
  details: {
      title: 'Detalles del viaje',
      offices: [
        { label: 'Oficina de recogida/devolución', text: 'Bogotá El Dorado International Airport (Bogotá Colombia)'},
      ],
      dates: [
        { label: 'Fecha y hora de la recogida', text: 'Viernes, 10/10/2025 — 12:00'},
        { label: 'Sábado, 10/10/2025 - 12:00', text:  'Sábado, 11/10/2025 — 12:00'}
      ]
  },
  contact: [
    { label: 'Nombre', value: 'Andres', placeholder: "Andres", help: '' },
    { label: 'Apellidos', value: 'Rojas', placeholder: "Rojas", help: '' },
    { label: 'Número de contacto', value: '300 XXX XXXX', placeholder: "300 XXX XXXX", help: 'Para alquileres fuera del país, incluya el prefijo del país (Ej. +1 para USA)' },
    { label: 'Correo electrónico', value: 'correo@mail.com' , placeholder: 'correo@mail.com', help: 'La confirmación se enviará por correo electrónico' }
  ]
})

const formUI = {
  label: 'text-md font-medium text-[#314158]'
}
const badgeUI = {
  base: 'bg-[#2B7FFF26] border-l-2 border-blue-1 rounded-none h-[25px] text-primary text-[13px] px-3 mb-3'
}
const stepperRef = ref<any>(null)
const next = () => stepperRef.value?.next()
const prev = () => stepperRef.value?.prev()

const ahora = [
  { day: 'Lunes',     schedule: '05:00 - 00:00' },
  { day: 'Martes',    schedule: '05:00 - 00:00' },
  { day: 'Miércoles', schedule: '05:00 - 00:00' },
  { day: 'Jueves',    schedule: '05:00 - 00:00' },
  { day: 'Viernes',   schedule: '05:00 - 00:00' },
  { day: 'Sábado',    schedule: '06:00 - 18:00' },
  { day: 'Domingo',   schedule: '06:00 - 18:00' },
]

</script>

<template>
  <section class="container mx-auto py-10 px-4 sm:px-6 lg:px-10">
    <h1 class="text-primary text-[30px] lg:text-[45px] font-semibold leading-none ">Detalles de la reserva</h1>
    <div class="grid gap-10 grid-cols-1 lg:grid-cols-3 mt-6">
      <div class="col-span-12 lg:col-span-2 main-stepper">

        <div class="main-resume">

          <h3 class="stepper-subtitle">Número de confirmación</h3>
          <div class="text-gray-600 text-[20px]">1234567890</div>

          <div class="stepper-description">
            Se ha completado su reserva. Anote su número de confirmación. Si ha introducido una dirección de correo electrónico válida, recibirá una confirmación de esta reserva. Compruebe la carpeta de correo no deseada.
          </div>

        </div>

        <hr class="border-hr my-4" />

        <div class="main-resume">
          <h3 class="stepper-title mb-3 pr-12">Detalles de la reserva</h3>

          <div class="space-y-3 text-md">
            <div  v-for="(detail, i) in trip.details.offices" :key="detail.label || i">
              <div class="font-bold">{{detail.label}}</div>
              <div class="text-gray-600">{{detail.text}}</div>
            </div>
            <div  v-for="(detail, i) in trip.details.dates" :key="detail.label || i">
              <div class="font-bold">{{detail.label}}</div>
              <div class="text-gray-600">{{detail.text}}</div>
            </div>
          </div>
        </div>

        <hr class="border-hr my-4" />

        <div class="main-resume">

          <h3 class="stepper-title mb-3">Enviar copia de la confirmación</h3>

          <UFormField :ui="formUI">
            <UInput size="md"  placeholder="ejemplo@email.com" class="w-full"/>
          </UFormField>

          <div class="mt-4 mb-5 space-x-3">
            <UButton color="secondary">Enviar</UButton>
            <UButton class="bg-gray-4 text-primary hover:bg-gray-4">Confirmación de impresión</UButton>
          </div>

          <div class="stepper-description">Si desea recibir una copia adicional de la confirmación por correo electrónico, introduzca una segunda dirección de correo electrónico.</div>

        </div>

        <hr class="border-hr my-4" />

        <div class="main-resume">

          <h3 class="stepper-title mb-3">Información del titular del contrato</h3>

          <div class="space-y-3 text-sm">
            <div  v-for="(c, i) in trip.contact" :key="c.label || i">
              <div class="font-bold">{{c.label}}</div>
              <div class="text-gray-600">{{c.value}}</div>
            </div>
          </div>

        </div>

        <hr class="border-hr my-4" />

        <div class="main-resume">

          <h3 class="stepper-title mb-3">Información del vehículo</h3>

          <div class="grid grid-cols-12 gap-x-4">
            <!-- Imagen -->
            <div class="col-span-3 ">
                <IMediaRender
                  :media="cars[0].media" :alt="cars[0].name"
                  aspect-ratio="aspect-[1/1]"
                  :ui="{
                    wrapper: '',
                    container: '',
                    media: 'object-cover rounded-lg' }" />
            </div>
            <!-- Texto -->
            <div class="col-span-7">
              <h4 class="font-bold text-primary text-[16px] ">
                {{ cars[0].name }}
              </h4>
              <div class="text-[16px] mb-2">{{ cars[0].gama }}</div>
              <div class="text-[13px] text-gray-3 mb-2">
                <div class="flex items-center gap-1"><Icon size="lg" name="material-symbols:person" /> {{ cars[0].pasajeros }} Pasajeros</div>
                <div class="flex items-center gap-1"><Icon size="lg" name="mdi:briefcase" /> {{ cars[0].maletas }} maletas </div>
              </div>
            </div>

          </div>

        </div>

        <hr class="border-hr my-4" />

        <div class="main-resume relative">
          <h3 class="stepper-title mb-3">Elementos opcionales</h3>

          <div class="item">
            <div class="flex justify-between mt-3">
              <UCheckbox size="lg" color="info" label="Asiento para bebés"/>
              <div class="font-semibold text-gray-800">$000,000 COP</div>
            </div>
            <details class="group inline px-0">
              <summary class="inline-flex text-[14px] items-center gap-1 text-blue-600 cursor-pointer hover:underline mb-3">
                <Icon name="tabler:caret-down-filled" class="h-4 w-4 transition-transform group-open:rotate-270" />
                Detalles
              </summary>
              <div class="pl-3 pb-3">
                  texto
              </div>
            </details>
          </div>

        </div>

        <hr class="border-hr my-4">

        <div class="main-resume relative">
          <h3 class="stepper-title mb-3">A pagar a la llegada</h3>

          <div class="space-y-1 text-sm">
            <div class="flex justify-between">
              Tarifa básica
              <span class="font-semibold">$000.0000 COP</span>
            </div>
            <div class="flex justify-between">
              Impuesto sobre las ventas (19%)
              <span class="font-semibold">(Incluído)</span>
            </div>
            <div class="flex justify-between">
              Tarifa Aeropuerto: 10% (10%)
              <span class="font-semibold">(Incluído)</span>
            </div>
          </div>

        </div>

        <hr class="border-hr my-4">

        <div class="main-resume">
          <div class="flex justify-between items-center">
            <h3 class="stepper-title mb-3">Precio total estimado</h3>
            <div class="stepper-subtitle">$000.000 COP</div>
          </div>

          <div class="space-y-3 text-sm">
              <div>A pagar a la llegada</div>
              <div><span class="font-semibold">$000,00 USD</span> ($000.000 COP)</div>
          </div>

        </div>

        <hr class="border-hr my-4">

        <div class="main-resume">
          <div class="stepper-summary text-gray-3">El precio COP que se muestra se convierte de la moneda de su destino a USD, y está sujeto a modificaciones en función de las variaciones del tipo de divisa. </div>
        </div>

        <hr class="border-hr my-4" />

        <div class="main-resume">
          <UButton size="md" variant="soft" class="text-primary">Términos y condiciones del contrato de alquiler</UButton>
        </div>

        <hr class="border-hr my-4" />

        <div class="main-resume">
          <h3 class="stepper-title mb-3">Cómo recoger el coche</h3>
          <div class="stepper-description">Uno de nuestros representantes le recibirá en la puerta #4 del primer piso (planta baja) llegadas Internacionales.</div>
        </div>

        <hr class="border-hr my-4" />

        <div class="main-resume">
          <div class="stepper-summary text-gray-3 flex items-center">
            <UIcon name="uis:exclamation-triangle" class="mr-1"></UIcon>
            Con este vehículo puede recorrer un kilometraje ilimitado
          </div>
        </div>

        <hr class="border-hr my-4" />

        <div class="botons-down flex gap-2 justify-end mt-4 mb-5">
          <UButton @click="next" color="secondary"> Descargar PDF</UButton>
        </div>


      </div>
      <div class="col-span-12 lg:col-span-1 side-stepper">
        <div class="sticky top-4">
          <div class="side-resumen">
            <h4 class="stepper-title mb-2"> Información adicional</h4>
            <div class="stepper-description">
              <p>Bogotá El Dorado International Airport</p>
              <div
                v-for="d in ahora"
                :key="d.day"
                class="flex justify-between py-1 text-sm last:border-0" >
                <span class="font-medium text-gray-700">{{ d.day }}</span>
                <span class="tabular-nums text-gray-900">{{ d.schedule }}</span>
              </div>
            </div>
          </div>

          <hr class=" border-hr my-4" />

          <div class="side-resumen">
            <h4 class="stepper-title mb-2"> Datos clave del alquiler </h4>
            <div class="stepper-description">
              <p>Descripción general de los detalles más importantes sobre los términos de su alquiler</p>
                <ul>
                <li>Inclusiones y exclusiones</li>
                <li>Costes adicionales posibles y mucho más</li>
              </ul>
              <p><a href="">Lea los datos clave del alquiler </a></p>
            </div>
          </div>

          <hr class=" border-hr my-4" />

          <div class="flex justify-end">
            <UButton size="md" variant="soft" class="text-primary">Términos y condiciones del contrato de alquiler</UButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
@reference "~/assets/css/main.css";
/***** MAIN ******/
.main-stepper .stepper-title {
  @apply font-semibold text-[20px] text-primary;
}
.main-stepper .stepper-subtitle {
  @apply font-bold text-[18px] text-primary;
}
.main-stepper .stepper-summary {
  @apply text-[14px];
}
.main-stepper .stepper-description {
  @apply text-[15px];
  & a, & .active {
    color: var(--color-secondary);
    @apply underline;
  }
}
/***** SIDE ******/
.side-stepper .stepper-title {
  @apply font-semibold text-[18px] text-primary;
}
.side-stepper .stepper-subtitle {
  @apply font-semibold text-[16px] text-primary;
}
.side-stepper .stepper-summary {
  @apply text-[13px] text-primary;
}
.side-stepper .stepper-description {
  @apply text-[14px] text-primary;
  & a, & .active {
    color: var(--color-secondary);
    @apply underline;
  }
  & ol {
    list-style: decimal !important;
    padding-left: 1.25rem;
  }
  & ul {
    list-style: disc !important;
    padding-left: 1.25rem;
  }
}

</style>
