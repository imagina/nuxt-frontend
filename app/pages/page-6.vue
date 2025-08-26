<script setup lang="ts">
import type { PageData } from '#ipage/types/pages'
defineProps<{ page: PageData }>()
import { ref, computed } from "vue";
import type { AccordionItem } from "@nuxt/ui";

type Office = { id:number; title:string; summary:string; iframe?:string; address?:string }

const offices: Office[] = [
  { id:1, title:'Bogotá – Ciudad', summary:'Calle 74 bis No 83-45', address:'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.419937773419!2d-74.10535062603437!3d4.696873541692827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9b47d0914827%3A0xce69a5fdd7f9e823!2sCl.%2074%20Bis%20%2383-45%2C%20Bogot%C3%A1%2C%20Colombia!5e0!3m2!1ses!2sve!4v1756152523919!5m2!1ses!2sve" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' },
  { id:2, title:'Bogotá – Aeropuerto', summary:'Av. El Dorado #102-20 Of 303, Fontibón', address:'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15905.685222585911!2d-74.15809599211197!3d4.696633643673715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9cb6430f8607%3A0x8eea5954ef14af30!2sAeropuerto%20Internacional%20El%20Dorado!5e0!3m2!1ses!2sve!4v1756152404662!5m2!1ses!2sve" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'},
  { id:3, title:'Medellín – Aeropuerto', summary:'José María Córdova (MDE)', address:'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126922.82176769577!2d-75.73102875664063!3d6.219058300000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4429c54fe5652d%3A0x5363838972b34e50!2sAeropuerto%20Olaya%20Herrera!5e0!3m2!1ses!2sve!4v1756152344350!5m2!1ses!2sve" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' },
  { id:4, title:'Bogotá – Ciudad', summary:'Calle 74 bis No 83-45', address:'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.419937773419!2d-74.10535062603437!3d4.696873541692827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9b47d0914827%3A0xce69a5fdd7f9e823!2sCl.%2074%20Bis%20%2383-45%2C%20Bogot%C3%A1%2C%20Colombia!5e0!3m2!1ses!2sve!4v1756152523919!5m2!1ses!2sve" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' },
  { id:5, title:'Bogotá – Aeropuerto', summary:'Av. El Dorado #102-20 Of 303, Fontibón', address:'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15905.685222585911!2d-74.15809599211197!3d4.696633643673715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9cb6430f8607%3A0x8eea5954ef14af30!2sAeropuerto%20Internacional%20El%20Dorado!5e0!3m2!1ses!2sve!4v1756152404662!5m2!1ses!2sve" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' },
  { id:6, title:'Medellín – Aeropuerto', summary:'José María Córdova (MDE)', address:'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126922.82176769577!2d-75.73102875664063!3d6.219058300000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4429c54fe5652d%3A0x5363838972b34e50!2sAeropuerto%20Olaya%20Herrera!5e0!3m2!1ses!2sve!4v1756152344350!5m2!1ses!2sve" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' },
  { id:7, title:'Bogotá – Ciudad', summary:'Calle 74 bis No 83-45', address:'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.419937773419!2d-74.10535062603437!3d4.696873541692827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9b47d0914827%3A0xce69a5fdd7f9e823!2sCl.%2074%20Bis%20%2383-45%2C%20Bogot%C3%A1%2C%20Colombia!5e0!3m2!1ses!2sve!4v1756152523919!5m2!1ses!2sve" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' },
  { id:8, title:'Bogotá – Aeropuerto', summary:'Av. El Dorado #102-20 Of 303, Fontibón', address:'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15905.685222585911!2d-74.15809599211197!3d4.696633643673715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9cb6430f8607%3A0x8eea5954ef14af30!2sAeropuerto%20Internacional%20El%20Dorado!5e0!3m2!1ses!2sve!4v1756152404662!5m2!1ses!2sve" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' },
  { id:9, title:'Medellín – Aeropuerto', summary:'José María Córdova (MDE)', address:'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126922.82176769577!2d-75.73102875664063!3d6.219058300000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4429c54fe5652d%3A0x5363838972b34e50!2sAeropuerto%20Olaya%20Herrera!5e0!3m2!1ses!2sve!4v1756152344350!5m2!1ses!2sve" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' },
  { id:10, title:'Bogotá – Ciudad', summary:'Calle 74 bis No 83-45', address:'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.419937773419!2d-74.10535062603437!3d4.696873541692827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9b47d0914827%3A0xce69a5fdd7f9e823!2sCl.%2074%20Bis%20%2383-45%2C%20Bogot%C3%A1%2C%20Colombia!5e0!3m2!1ses!2sve!4v1756152523919!5m2!1ses!2sve" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' },
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
    <IBreadcrumb
      :title="'Oficinas'"
      :ui="{ link: 'font-bold text-gray-3' }"
    />
    <div class="bg-gray-2">
    <section class=" container mx-auto py-10 px-4 sm:px-6 lg:px-10">
      <div class="grid gap-10 grid-cols-1 md:grid-cols-3">
        <!-- Columna izquierda: Filtros -->
        <aside class="md:col-span-1 filters">
          <UCard class="shadow-md">
            <h1 class="text-[24px]  text-primary font-semibold">Oficinas</h1>
            <UAccordion v-model="active" :items="items" >
              <template #body="{ item }">
                <div class="border-t border-gray-200 pt-4">
                  {{ item.summary }}
                </div>

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
  </div>
</template>

