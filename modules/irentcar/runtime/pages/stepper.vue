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
    { label: 'Nombre', value: '', placeholder: "Andres", help: '' },
    { label: 'Apellidos', value: '', placeholder: "Rojas", help: '' },
    { label: 'Número de contacto', value: '', placeholder: "300 XXX XXXX", help: 'Para alquileres fuera del país, incluya el prefijo del país (Ej. +1 para USA)' },
    { label: 'Correo electrónico', value: '' , placeholder: 'correo@mail.com', help: 'La confirmación se enviará por correo electrónico' }
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

</script>

<template>
  <section class="container mx-auto py-10 px-4 sm:px-6 lg:px-10">
    <UStepper color="secondary" v-model="step" :items="steps" ref="stepperRef" class="w-full">
    <!-- Paso 1: Tarifas -->
    <template #rates>

        <div class="grid gap-10 grid-cols-1 lg:grid-cols-3 mt-6">

          <!-- Col 1: Main Stepper (Filtros + Listado)  -->
          <div class="col-span-12 lg:col-span-2 main-stepper">
            <!-- Filtros -->
            <div class="filters">
              <h3 class="stepper-title mb-5">Filtros</h3>

              <div class="grid grid-cols-12 gap-4 items-end">

                <div class="col-span-6 md:col-span-5 lg:col-span-5">
                  <UFormField label="Tipo de vehículo" :ui="formUI">
                    <USelect size="md" v-model="filter.tipo" :items="tipos" placeholder="Todos" class="w-full"/>
                  </UFormField>
                </div>

                <div class="col-span-6 md:col-span-4 lg:col-span-5">
                  <UFormField label="Transmisión" :ui="formUI">
                    <USelect size="md" v-model="filter.transmision" :items="transmisiones" placeholder="Todos" class="w-full"/>
                  </UFormField>
                </div>
                <div class="col-span-12 md:col-span-3 lg:col-span-2">
                  <UButton size="md" variant="soft" @click="resetFilters" class="w-full justify-center bg-gray-4">Restablecer</UButton>
                </div>
              </div>
            </div>
            <!-- Listado -->
            <div v-for="car in filtered" :key="car.id" class="transition mt-8 rounded-sm">
              <div class="grid grid-cols-12 justify-between gap-4">
                <!-- Texto -->
                <div class="col-span-8 md:col-span-6 ">

                  <UBadge :ui="badgeUI" v-if="car.recommended" color="primary" variant="soft" size="xs">Recomendado para ti</UBadge>

                  <h4 class="stepper-title"> {{ car.name }} </h4>
                  <div class="text-[16px] text-secondary uppercase mb-2 font-normal">{{ car.gama }}</div>

                  <div class="flex items-center gap-3 text-[13px] text-gray-3 mb-2">
                    <div class="flex items-center gap-1"><Icon size="lg" name="mdi:car-shift-pattern" /> {{ car.transmision }}</div>
                    <div class="flex items-center gap-1"><Icon size="lg" name="material-symbols:person" /> {{ car.pasajeros }}</div>
                    <div class="flex items-center gap-1"><Icon size="lg" name="mdi:briefcase" /> {{ car.maletas }}</div>
                  </div>

                </div>

                <!-- Imagen -->
                <div class="col-span-4 md:col-span-2 ">
                    <IMediaRender
                      :media="car.media" :alt="car.name"
                      aspect-ratio="aspect-[1/1]"
                      :ui="{
                        wrapper: '',
                        container: '',
                        media: 'object-cover rounded-lg' }" />
                </div>

                <!-- Precio / CTA -->
                <div class="col-span-4 md:col-span-2 md:col-start-11 ">
                  <div class="font-semibold text-gray-800">$000,000 COP</div>
                  <UButton :color="isSelected(car) ? 'primary' : 'secondary'"
                            size="md" class="block my-1 text-white hover:bg-primary"
                            @click="selectCar(car)" >
                            {{ isSelected(car) ? 'Seleccionado' : 'Seleccionar' }}
                  </UButton>
                  <NuxtLink to="" class="text-blue-1 text-[12px] underline">Detalles del precio</NuxtLink>

                </div>

                <!-- Detalles -->
                <div class="col-span-12">
                  <details class="group inline px-0">
                    <summary class="list-none inline-flex text-[14px] items-center gap-1 text-blue-600 cursor-pointer hover:underline mb-3">
                      <Icon name="tabler:caret-down-filled" class="h-4 w-4 transition-transform group-open:rotate-270" />
                      Detalles
                    </summary>
                    <div class="text-md text-gray-600 flex items-center" v-for="f in car.features" :key="f">
                      <Icon class="h-4 w-4 mr-1"  name="material-symbols:check-small" />{{ f }}
                    </div>
                  </details>

                </div>
              </div>
              <hr class="border-hr">
            </div>
          </div>

          <!-- Col 2: Side Stepper (Detalles del viaje) -->
          <div class="col-span-12 lg:col-span-1 side-stepper">
            <div class="sticky top-4 ">

              <div class="side-resume relative">
                <UButton size="xs" variant="soft" class="text-primary absolute right-0 top-0">Editar</UButton>
                <h3 class="stepper-title mb-3 pr-12">Detalles del viaje</h3>

                <div class="space-y-3 text-sm">
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

            </div>
          </div>

        </div>

    </template>

    <!-- Paso 2: Añadir Extra -->
    <template #extras>
      <div class="grid gap-10 grid-cols-1 lg:grid-cols-3 mt-6">

           <!-- Col: 1 Main stepper -->
          <div class="col-span-12 lg:col-span-2 main-stepper">

            <div class="botons-up flex gap-2 justify-between mt-4 mb-5">
              <UButton  leading-icon="i-lucide-arrow-left" @click="prev"
                        class="bg-white text-primary hover:bg-white hover:text-secondary">Atrás</UButton>
              <UButton  trailing-icon="i-lucide-arrow-right" @click="next"
                        class="bg-white text-primary hover:bg-white hover:text-secondary">Continuar</UButton>
            </div>

            <div class="main-resume info-card" v-if="selectedCar">
              <div class="grid grid-cols-12 justify-between gap-x-4">
                <!-- Texto -->
                <div class="col-span-12 mb-3">

                  <h4 class="stepper-title inline-block"> {{ selectedCar.name }} </h4>
                  <span class="text-gray-3 mx-2 text-[20px] ">|</span>
                  <div class="text-[20px] text-secondary uppercase mb-2 font-normal inline-block">{{ selectedCar.gama }}</div>

                </div>

                <!-- Imagen -->
                <div class="col-span-3 ">
                    <IMediaRender
                      :media="selectedCar.media" :alt="selectedCar.name"
                      aspect-ratio="aspect-[1/1]"
                      :ui="{
                        wrapper: '',
                        container: '',
                        media: 'object-cover rounded-lg' }" />
                </div>

                <!-- Detalles -->
                <div class="col-span-9 ">

                  <div class="stepper-summary mb-2">
                    Mejore la selección de su vehículo con un “Referencia de carro” o similar por solo $0.000 COP diarios y pague un precio total de $000.000 COP
                  </div>

                  <div class="flex items-center gap-3 text-[13px] text-gray-3 mb-2">
                    <div class="flex items-center gap-1"><Icon size="lg" name="mdi:car-shift-pattern" /> {{ selectedCar.transmision }}</div>
                    <div class="flex items-center gap-1"><Icon size="lg" name="material-symbols:person" /> {{ selectedCar.pasajeros }}</div>
                    <div class="flex items-center gap-1"><Icon size="lg" name="mdi:briefcase" /> {{ selectedCar.maletas }}</div>
                  </div>

                  <details class="group inline px-0">
                    <summary class="list-none inline-flex text-[14px] items-center gap-1 text-blue-600 cursor-pointer hover:underline mb-3">
                      <Icon name="tabler:caret-down-filled" class="h-4 w-4 transition-transform group-open:rotate-270" />
                      Detalles
                    </summary>


                    <div class="text-md text-gray-600 flex items-center" v-for="f in selectedCar.features" :key="f">
                      <Icon class="h-4 w-4 mr-1"  name="material-symbols:check-small" />{{ f }}
                    </div>

                  </details>

                  <div class="flex justify-end">
                    <UButton color="secondary" size="md" class="block my-1 text-white hover:bg-primary" >
                      Mejorar
                    </UButton>
                  </div>
                </div>
              </div>

              <hr class="border-hr my-4" />

              <!-- Description -->
              <div class="description">
                <h4 class="stepper-title mb-2">Descripción</h4>
                <div class="stepper-description text-primary mb-2">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec leo eu ex lacinia tristique.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Duis rhoncus nisl ac mi laoreet, eu pellentesque dui tincidunt.</p>
                  <h5 class="font-semibold my-2">Incluído en la tarifa:</h5>
                  <div class="flex items-center gap-1 active">
                    <Icon size="lg" color="secondary" name="material-symbols:check-circle-outline" /> Impuestos, tasas y cargos
                  </div>
                  <div class="flex items-center gap-1">
                    <Icon size="lg" color="secondary" name="material-symbols:check-circle-outline" /> CDW - Protección contra robo
                  </div>
                  <div class="flex items-center gap-1">
                    <Icon size="lg" color="secondary" name="material-symbols:check-circle-outline" /> Seguro de responsabilidad civil ante terceros
                  </div>
                  <div class="flex items-center gap-1">
                    <Icon size="lg" color="secondary" name="material-symbols:check-circle-outline" /> Asistencia las 24/7
                  </div>
                </div>
              </div>

            </div>

            <div v-else class="text-center py-10"> Debe seleccinar un auto</div>

            <hr class="border-hr my-3">

            <!-- Items -->
            <div class="main-resume ">

              <h4 class="stepper-title mb-2">Elegir elementos opcionales</h4>
              <UBadge :ui="badgeUI"  color="primary" variant="soft" size="xs">Recomendado para ti</UBadge>

              <div class="item">
                <div class="flex justify-between mt-3">
                  <UCheckbox  size="lg" color="info" label="Asiento para bebés"/>
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
              <div class="item">
                <div class="flex justify-between mt-3">
                  <UCheckbox  size="lg" color="info" label="Prelavado de vehículo"/>
                  <div class="font-semibold text-gray-800">$25.000 COP</div>
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

            <hr class="border-hr my-3" />

            <div class="botons-down flex gap-2 justify-between mt-4 mb-5">
              <UButton @click="prev" class="bg-gray-4 text-primary hover:bg-gray-4">Atrás</UButton>
              <UButton @click="next" color="secondary"> Continuar</UButton>
            </div>

          </div>

          <!-- Col: 2 Side stepper -->
          <div class="col-span-12 lg:col-span-1 side-stepper">
            <div class="sticky top-4 ">

              <!-- Detalles -->
              <div class="side-resume relative">
                <UButton size="xs" variant="soft" class="text-primary absolute right-0 top-0">Editar</UButton>
                <h3 class="stepper-title mb-3 pr-12">Detalles del viaje</h3>

                <div class="space-y-3 text-sm">
                  <div  v-for="(detail, i) in trip.details.offices" :key="detail.label || i">
                    <div class="stepper-subtitle">{{detail.label}}</div>
                    <div class="text-gray-600">{{detail.text}}</div>
                  </div>
                  <div  v-for="(detail, i) in trip.details.dates" :key="detail.label || i">
                    <div class="stepper-subtitle">{{detail.label}}</div>
                    <div class="text-gray-600">{{detail.text}}</div>
                  </div>
                </div>
              </div>

              <hr class=" border-hr my-4">

              <div class="side-resume card-mini" v-if="selectedCar">
                <div class="grid grid-cols-12 gap-x-4">

                  <!-- Texto -->
                  <div class="col-span-7">

                    <h4 class="stepper-subtitle"> {{ selectedCar.name }} </h4>
                    <div class="text-[16px] mb-2">{{ selectedCar.gama }}</div>
                    <div class="text-[13px] text-gray-3 mb-2">
                      <div class="flex items-center gap-1"><Icon size="lg" name="material-symbols:person" /> {{ selectedCar.pasajeros }} Pasajeros</div>
                      <div class="flex items-center gap-1"><Icon size="lg" name="mdi:briefcase" /> {{ selectedCar.maletas }} maletas </div>
                    </div>

                  </div>

                  <!-- Imagen -->
                  <div class="col-span-3 ">
                      <IMediaRender
                        :media="selectedCar.media" :alt="selectedCar.name"
                        aspect-ratio="aspect-[1/1]"
                        :ui="{
                          wrapper: '',
                          container: '',
                          media: 'object-cover rounded-lg' }" />
                  </div>

                  <div class="col-span-1">
                    <UButton size="xs" variant="soft" class="text-primary">Editar</UButton>
                  </div>

                </div>
              </div>

              <hr class=" border-hr my-4">

              <div class="side-resume relative">
                <UButton size="xs" variant="soft" class="text-primary absolute right-0 top-0">Editar</UButton>
                <h3 class="stepper-title mb-3 pr-12">Elementos opcionales</h3>

                <div class="item">
                  <div class="flex justify-between mt-3">
                    <UCheckbox size="md" color="info" label="Asiento para bebés"/>
                    <div class="font-semibold text-gray-800">$000,000 COP</div>
                  </div>
                  <details class="group inline px-0">
                    <summary class="inline-flex text-[14px] items-center gap-1 text-blue-600 cursor-pointer hover:underline mb-3">
                      <Icon name="tabler:caret-down-filled" class="h-4 w-4 transition-transform group-open:rotate-270" />
                      Detalles
                    </summary>
                    <div class="stepper-description pl-3 pb-3">
                        texto
                    </div>
                  </details>
                </div>

              </div>

              <hr class="border-hr mt-3 mb-4" />

              <div class="flex justify-end">
                <UButton size="md" variant="soft" class="text-primary">Términos y condiciones del contrato de alquiler</UButton>
              </div>

            </div>
          </div>
      </div>
    </template>

    <!-- Paso 3: Sobre el Contrato-->
    <template #contract>
      <div class="grid gap-10 grid-cols-1 lg:grid-cols-3 mt-6">

           <!-- Col: 1 Main Stepper -->
          <div class="col-span-12 lg:col-span-2 main-stepper">

            <div class="botons-up flex gap-2 justify-between mt-4 mb-5">
              <UButton  leading-icon="i-lucide-arrow-left" @click="prev"
                        class="bg-white text-primary hover:bg-white hover:text-secondary">Atrás</UButton>
              <UButton  trailing-icon="i-lucide-arrow-right" @click="next"
                        class="bg-white text-primary hover:bg-white hover:text-secondary">Continuar</UButton>
            </div>

            <div class="main-resume" >

              <h4 class="stepper-title mb-3"> Nombre del titular del contrato </h4>

              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-12 md:col-span-6" v-for="(c, i ) in trip.contact" :key="i">
                  <UFormField :label="c.label" :ui="formUI" :help="c.help">
                    <UInput size="md" v-model="c.value" :placeholder="c.placeholder" class="w-full"/>
                  </UFormField>
                </div>
              </div>

            </div>

            <hr class="border-hr my-4" />

            <div class="main-resume" >
              <div class="stepper-description">
                    La información de contacto proporcionada se utilizará para comunicarle datos de transacciones sobre este alquiler por teléfono, correo electrónico o mensaje de texto. Para obtener una descripción completa de los usos de los datos personales, consulte nuestra Política de privacidad.
              </div>
            </div>

            <hr class="border-hr my-4" />

            <div class="main-resume">
              <UFormField label="Número de vuelo" :ui="formUI" description="En caso de que su vuelo se retrase, el personal de la oficina de recogida puede gestionar mejor el servicio si dispone de los datos del vuelo (por ejemplo, BA732)">
                <UInput size="md"  placeholder="XX000" class="w-full"/>
              </UFormField>
            </div>

            <hr class="border-hr my-4" />

            <div class="botons-down flex gap-2 justify-between mt-4 mb-5">
              <UButton @click="prev" class="bg-gray-4 text-primary hover:bg-gray-4">Atrás</UButton>
              <UButton @click="next" color="secondary"> Continuar</UButton>
            </div>

          </div>

          <!-- Col: 2 Side Stepper -->
          <div class="col-span-12 lg:col-span-1 side-stepper">
            <div class="sticky top-4 ">

              <!-- Detalles -->
              <div class="side-resume relative">
                <UButton size="xs" variant="soft" class="text-primary absolute right-0 top-0">Editar</UButton>
                <h3 class="stepper-title mb-3 pr-12">Detalles del viaje</h3>

                <div class="space-y-3 text-sm">
                  <div  v-for="(detail, i) in trip.details.offices" :key="detail.label || i">
                    <div class="stepper-subtitle">{{detail.label}}</div>
                    <div class="text-gray-600">{{detail.text}}</div>
                  </div>
                  <div  v-for="(detail, i) in trip.details.dates" :key="detail.label || i">
                    <div class="stepper-subtitle">{{detail.label}}</div>
                    <div class="text-gray-600">{{detail.text}}</div>
                  </div>
                </div>
              </div>

              <hr class="border-hr my-4" />

              <div class="side-resume card-mini" v-if="selectedCar">
                <div class="grid grid-cols-12 gap-x-4">

                  <!-- Texto -->
                  <div class="col-span-7">

                    <h4 class="stepper-subtitle"> {{ selectedCar.name }} </h4>
                    <div class="text-[16px] mb-2">{{ selectedCar.gama }}</div>
                    <div class="text-[13px] text-gray-3 mb-2">
                      <div class="flex items-center gap-1"><Icon size="lg" name="material-symbols:person" /> {{ selectedCar.pasajeros }} Pasajeros</div>
                      <div class="flex items-center gap-1"><Icon size="lg" name="mdi:briefcase" /> {{ selectedCar.maletas }} maletas </div>
                    </div>

                  </div>

                  <!-- Imagen -->
                  <div class="col-span-3 ">
                      <IMediaRender
                        :media="selectedCar.media" :alt="selectedCar.name"
                        aspect-ratio="aspect-[1/1]"
                        :ui="{
                          wrapper: '',
                          container: '',
                          media: 'object-cover rounded-lg' }" />
                  </div>

                  <div class="col-span-1">
                    <UButton size="xs" variant="soft" class="text-primary">Editar</UButton>
                  </div>

                </div>
              </div>

              <hr class="border-hr my-4" />

              <div class="side-resume relative">
                <UButton size="xs" variant="soft" class="text-primary absolute right-0 top-0">Editar</UButton>
                <h3 class="stepper-title mb-3 pr-12">Productos de protección opcionales</h3>

                <div class="item">
                  <div class="flex justify-between mt-3">
                    <UCheckbox  size="md" color="info" label="Paquete de protección Rent Car"/>
                    <div class="font-semibold text-gray-800">$000,000 COP</div>
                  </div>
                  <details class="group inline px-0">
                    <summary class="inline-flex text-[14px] items-center gap-1 text-blue-600 cursor-pointer hover:underline mb-3">
                      <Icon name="tabler:caret-down-filled" class="h-4 w-4 transition-transform group-open:rotate-270" />
                      Detalles
                    </summary>
                    <div class="stepper-description pl-3 pb-3">
                        texto
                    </div>
                  </details>
                </div>
              </div>

              <hr class="border-hr my-4" />

              <div class="side-resume relative">
                <UButton size="xs" variant="soft" class="text-primary absolute right-0 top-0">Editar</UButton>
                <h3 class="stepper-title mb-3 pr-12">Elegir elementos opcionales</h3>

                <div class="item">
                  <div class="flex justify-between mt-3">
                    <UCheckbox  size="md" color="info" label="Asiento para bebés"/>
                    <div class="font-semibold text-gray-800">$000,000 COP</div>
                  </div>
                  <details class="group inline px-0">
                    <summary class="inline-flex text-[14px] items-center gap-1 text-blue-600 cursor-pointer hover:underline mb-3">
                      <Icon name="tabler:caret-down-filled" class="h-4 w-4 transition-transform group-open:rotate-270" />
                      Detalles
                    </summary>
                    <div class="stepper-description pl-3 pb-3">
                        texto
                    </div>
                  </details>
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
    </template>

    <!-- Paso 4: Revisar y Reservar -->
    <template #review>
      <div class="grid gap-10 grid-cols-1 lg:grid-cols-3 mt-6">

           <!-- Col: 1 Main Stepper -->
          <div class="col-span-12 lg:col-span-2 main-stepper">

            <div class="main-resume relative">
              <UButton size="xs" variant="soft" class="text-primary absolute right-0 top-0">Editar</UButton>
              <h3 class="stepper-title mb-3 pr-12">Nombre del titular del contrato</h3>

              <div class="space-y-3 text-sm">
                <div  v-for="(detail, i) in trip.details.dates" :key="detail.label || i">
                  <div class="font-bold">{{detail.label}}</div>
                  <div class="text-gray-600">{{detail.text}}</div>
                </div>
              </div>
            </div>

            <hr class="border-hr my-4" />

            <div class="main-resume relative">
              <UButton size="xs" variant="soft" class="text-primary absolute right-0 top-0">Editar</UButton>
              <h3 class="stepper-title mb-3 pr-12">Información de la oficina</h3>

              <div class="space-y-3 text-sm">
                <div  v-for="(detail, i) in trip.details.offices" :key="detail.label || i">
                  <div class="font-bold">{{detail.label}}</div>
                  <div class="text-gray-600">{{detail.text}}</div>
                </div>
              </div>
            </div>

            <hr class="border-hr my-4">

            <div class="main-resume relative" v-if="selectedCar">
              <UButton size="xs" variant="soft" class="text-primary absolute right-0 top-0">Editar</UButton>
              <h3 class="stepper-title mb-3 pr-12">Información del vehículo</h3>

              <div class="grid grid-cols-12 gap-x-4">
                <!-- Imagen -->
                <div class="col-span-3 ">
                    <IMediaRender
                      :media="selectedCar.media" :alt="selectedCar.name"
                      aspect-ratio="aspect-[1/1]"
                      :ui="{
                        wrapper: '',
                        container: '',
                        media: 'object-cover rounded-lg' }" />
                </div>
                <!-- Texto -->
                <div class="col-span-7">
                  <h4 class="font-bold text-primary text-[16px] ">
                    {{ selectedCar.name }}
                  </h4>
                  <div class="text-[16px] mb-2">{{ selectedCar.gama }}</div>
                  <div class="text-[13px] text-gray-3 mb-2">
                    <div class="flex items-center gap-1"><Icon size="lg" name="material-symbols:person" /> {{ selectedCar.pasajeros }} Pasajeros</div>
                    <div class="flex items-center gap-1"><Icon size="lg" name="mdi:briefcase" /> {{ selectedCar.maletas }} maletas </div>
                  </div>
                </div>

              </div>
            </div>

            <hr class="border-hr my-4" />

            <div class="main-resume relative">
              <UButton size="xs" variant="soft" class="text-primary absolute right-0 top-0">Editar</UButton>
              <h3 class="stepper-title mb-3 pr-12">Elementos opcionales</h3>

              <div class="item">
                <div class="flex justify-between mt-3">
                  <UCheckbox  size="lg" color="info" label="Asiento para bebés"/>
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

            <hr class="border-hr my-4" />

            <div class="main-resume relative">
              <UButton size="xs" variant="soft" class="text-primary absolute right-0 top-0">Editar</UButton>
              <h3 class="stepper-title mb-3 pr-12">Información del titular del contato</h3>

              <div class="space-y-3 text-sm">
                <div  v-for="(c, i) in trip.contact" :key="c.label || i">
                  <div class="font-bold">{{c.label}}</div>
                  <div class="text-gray-600">{{c.value}}</div>
                </div>
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

            <div class="main-resume relative">
              <div class="flex justify-between items-center">
                <h3 class="stepper-title mb-3">Precio total estimado</h3>
                <div class="stepper-subtitle"><span class="text-gray-3 mr-2">|</span>$000.000 COP</div>
              </div>

              <div class="space-y-3 text-sm">
                  <div>A pagar a la llegada</div>
                  <div><span class="font-semibold">$000,00 USD</span> ($000.000 COP)</div>
              </div>

            </div>

            <hr class="border-hr my-4">

            <div class="stepper-summary text-gray-3">El precio COP que se muestra se convierte de la moneda de su destino a USD, y está sujeto a modificaciones en función de las variaciones del tipo de divisa. </div>

            <hr class="border-hr my-4">

            <div class="stepper-summary text-gray-3 flex items-center">
              <UIcon name="uis:exclamation-triangle" class="mr-1"></UIcon>
              Con este vehículo puede recorrer un kilometraje ilimitado
            </div>

            <hr class="border-hr my-4" />

            <div class="botons-down flex gap-2 justify-between mt-4 mb-5">
              <UButton @click="prev" class="bg-gray-4 text-primary hover:bg-gray-4">Atrás</UButton>
              <UButton @click="next" color="secondary"> Continuar</UButton>
            </div>

          </div>

          <!-- Col: 2 Side Stepper -->
          <div class="col-span-12 lg:col-span-1 side-stepper">
            <div class="sticky top-4">

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

              <div class="side-resumen">

                <h4 class="stepper-title mb-2"> Información adicional </h4>
                <div class="stepper-description">
                  <ul>
                    <li>Conductor adicional</li>
                    <li>Servicio fuera del horario de atención</li>
                    <li>Requisitos de edad</li>
                    <li>Entrega y recogida</li>
                    <li>Protección de franquicia</li>
                    <li>Entregas en otra oficina</li>
                    <li>Exención de responsabilidad por daños de colisión y protección contra robo</li>
                    <li>Servicio de repostaje</li>
                    <li>Otras políticas</li>
                    <li>Formas de pago</li>
                    <li>Protección en carretera</li>
                    <li>Requisitos del arrendatario</li>
                    <li>Responsabilidad civil por daños a terceros</li>
                  </ul>
                </div>
              </div>

              <hr class=" border-hr my-4" />

              <div class="flex justify-end">
                <UButton size="md" variant="soft" class="text-primary">Términos y condiciones del contrato de alquiler</UButton>
              </div>


            </div>
          </div>

      </div>
    </template>
  </UStepper>

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
