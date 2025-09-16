import type {StepperItem} from "@nuxt/ui";
import type {ReservationData} from "#irentcar/pages/stepper/stepperPage";

export const RENT_CTX = Symbol('RENT_CTX')
export const STEPS: StepperItem[] = [
  {title: 'Tarifas', icon: 'mdi:car', slot: 'rates'},
  {title: 'Añadir Extras', icon: 'mdi:puzzle-outline', slot: 'extras'},
  {title: 'Sobre el Contrato', icon: 'tabler:certificate-2', slot: 'contract'},
  {title: 'Revisar y Reservar', icon: 'mdi:file-document-outline', slot: 'review'}
]

export const INITIAL_RESERVATION_DATA: ReservationData = {
  pickupOfficeId: null,
  pickupOffice: null,
  dropoffOfficeId: null,
  dropoffOffice: null,
  pickupDate: null,
  dropoffDate: null,

  gammaOffice: null,
  gamma: null,
  extrasData: [],
  options: { flyNumber: '' }
}
