<script setup lang="ts">
import { ref, computed } from "vue";
import type { AccordionItem } from "@nuxt/ui";

definePageMeta({
  layout: 'master'
})

type Office = { id:number; title:string; summary:string; iframe?:string; address?:string }

const offices: Office[] = [
  { id:1, title:'Bogotá – Ciudad', summary:'Calle 74 bis No 83-45', address:'<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15700.36871199531!2d-68.7305246!3d10.3345081!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e80cf4c64184d33%3A0x608f8f4b001fa24f!2sParque%20Arqueol%C3%B3gico%20de%20San%20Felipe!5e0!3m2!1ses!2sve!4v1755734552063!5m2!1ses!2sve" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' },
  { id:2, title:'Bogotá – Aeropuerto', summary:'Av. El Dorado #102-20 Of 303, Fontibón', address:'<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15700.36871199531!2d-68.7305246!3d10.3345081!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e80c5e46d8719d5%3A0x78c3c4c23ceaf18a!2sParque%20de%20la%20Ex%C3%B3tica%20Flora%20Tropical!5e0!3m2!1ses!2sve!4v1755736537413!5m2!1ses!2sve" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
  { id:3, title:'Medellín – Aeropuerto', summary:'José María Córdova (MDE)', address:'<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15700.36871199531!2d-68.7305246!3d10.3345081!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e80cf4c64184d33%3A0x608f8f4b001fa24f!2sParque%20Arqueol%C3%B3gico%20de%20San%20Felipe!5e0!3m2!1ses!2sve!4v1755734552063!5m2!1ses!2sve" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' },
  { id:4, title:'Bogotá – Ciudad', summary:'Calle 74 bis No 83-45', address:'<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15700.36871199531!2d-68.7305246!3d10.3345081!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e80cf4c64184d33%3A0x608f8f4b001fa24f!2sParque%20Arqueol%C3%B3gico%20de%20San%20Felipe!5e0!3m2!1ses!2sve!4v1755734552063!5m2!1ses!2sve" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' },
  { id:5, title:'Bogotá – Aeropuerto', summary:'Av. El Dorado #102-20 Of 303, Fontibón', address:'<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15700.36871199531!2d-68.7305246!3d10.3345081!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e80cf4c64184d33%3A0x608f8f4b001fa24f!2sParque%20Arqueol%C3%B3gico%20de%20San%20Felipe!5e0!3m2!1ses!2sve!4v1755734552063!5m2!1ses!2sve" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' },
  { id:6, title:'Medellín – Aeropuerto', summary:'José María Córdova (MDE)', address:'<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15700.36871199531!2d-68.7305246!3d10.3345081!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e80cf4c64184d33%3A0x608f8f4b001fa24f!2sParque%20Arqueol%C3%B3gico%20de%20San%20Felipe!5e0!3m2!1ses!2sve!4v1755734552063!5m2!1ses!2sve" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' },
  { id:7, title:'Bogotá – Ciudad', summary:'Calle 74 bis No 83-45', address:'<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15700.36871199531!2d-68.7305246!3d10.3345081!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e80cf4c64184d33%3A0x608f8f4b001fa24f!2sParque%20Arqueol%C3%B3gico%20de%20San%20Felipe!5e0!3m2!1ses!2sve!4v1755734552063!5m2!1ses!2sve" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' },
  { id:8, title:'Bogotá – Aeropuerto', summary:'Av. El Dorado #102-20 Of 303, Fontibón', address:'<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15700.36871199531!2d-68.7305246!3d10.3345081!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e80cf4c64184d33%3A0x608f8f4b001fa24f!2sParque%20Arqueol%C3%B3gico%20de%20San%20Felipe!5e0!3m2!1ses!2sve!4v1755734552063!5m2!1ses!2sve" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' },
  { id:9, title:'Medellín – Aeropuerto', summary:'José María Córdova (MDE)', address:'<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15700.36871199531!2d-68.7305246!3d10.3345081!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e80cf4c64184d33%3A0x608f8f4b001fa24f!2sParque%20Arqueol%C3%B3gico%20de%20San%20Felipe!5e0!3m2!1ses!2sve!4v1755734552063!5m2!1ses!2sve" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' },
  { id:10, title:'Bogotá – Ciudad', summary:'Calle 74 bis No 83-45', address:'<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15700.36871199531!2d-68.7305246!3d10.3345081!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e80c5e46d8719d5%3A0x78c3c4c23ceaf18a!2sParque%20de%20la%20Ex%C3%B3tica%20Flora%20Tropical!5e0!3m2!1ses!2sve!4v1755736537413!5m2!1ses!2sve" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' },
]

const extractIframeSrc = (html?: string) =>
  html?.match(/src=["']([^"']+)["']/i)?.[1] ?? ''

// Mapeo label = title, iframe = extraer el src
const items = computed<AccordionItem[]>(() =>
  offices.map(o => ({
    label: o.title,
    iframe: extractIframeSrc(o.address),
    ...o,
  }))
)

const iframeSrc = computed(() => {
  const list = items.value
  if (!list.length) return ''
  const i = Number(active.value) || 0
  return list[i]?.iframe ?? list[0]?.iframe ?? ''
})


const active = ref("0");


</script>


  <template>
  <div>
    <!-- Oficinas -->
    <section class="container mx-auto py-10 px-4 ">
      <div class="grid gap-10 grid-cols-1 md:grid-cols-3">
        <!-- Columna izquierda: Filtros -->
        <aside class="md:col-span-1 filters">
          <UCard class="shadow-md">
            <h1 class="font-[24px] font-semibold text-primary">Oficinas</h1>
            <UAccordion v-model="active" :items="items" >
              <template #body="{ item }">
                {{ item.summary }}
              </template>
            </UAccordion>
          </UCard>
        </aside>

        <!-- Columna derecha: Maps -->
        <div class="md:col-span-2 maps">
            <iframe
              :src="iframeSrc"
              class="h-[600px] w-full rounded-lg"
              style="border:0"
              loading="lazy"
              allowfullscreen
              referrerpolicy="no-referrer-when-downgrade"
            />
        </div>
      </div>
    </section>
  </div>
</template>

