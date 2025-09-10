import type {StepperItem} from "@nuxt/ui";

export const RENT_CTX = Symbol('RENT_CTX')
export const steps: StepperItem[] = [
  {title: 'Tarifas', icon: 'mdi:car', slot: 'rates'},
  {title: 'Añadir Extras', icon: 'mdi:puzzle-outline', slot: 'extras'},
  {title: 'Sobre el Contrato', icon: 'tabler:certificate-2', slot: 'contract'},
  {title: 'Revisar y Reservar', icon: 'mdi:file-document-outline', slot: 'review'}
]
