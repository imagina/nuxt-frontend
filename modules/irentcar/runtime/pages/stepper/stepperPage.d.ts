import type {GammaOffice} from "#irentcar/types/gammaOffice";
import type {Office} from "#irentcar/types/office";
import type {Gamma} from "#irentcar/types/gamma";
import type {GammaOfficeExtra} from "#irentcar/types/extra";
import type {PriceConversion} from "#irentcar/types/priceConversion";

export interface ReservationData
{
  pickupOfficeId: number | null
  pickupOffice: Office | null
  dropoffOfficeId: number | null
  dropoffOffice: Office | null
  pickupDate: string | null
  dropoffDate: string | null

  gammaOffice: GammaOffice | null
  gamma: Gamma | null
  extrasData: GammaOfficeExtra[] | []
  options: { flyNumber: string } | Record<string, unknown>

  gammaOfficePrice: number | null
  gammaOfficePriceConversions: PriceConversion | null

  gammaOfficeExtraTotalPrice: number | null
  gammaOfficeExtraTotalPriceConversions: PriceConversion | null

  totalPrice: number | null
  totalPriceConversions: PriceConversion | null

  gammaOfficeTax: number | null
  rentalDays: number | null
}

export type StepKey = 'gamma' | 'extras' | 'contract' | 'review'

export interface RentCtx
{
  step: Ref<number>
  gammaOffices: Ref<GammaOffice[]>
  reservationPreview: Ref<ReservationData>
  next: () => void
  prev: () => void
  editStep: (stepName: StepKey) => void
  completeReservation: () => void
}

export interface ExtrasCheckBoxItem
{
  label: string,
  id: number,
  description: string,
  price: string,
  priceConversions: string
}
