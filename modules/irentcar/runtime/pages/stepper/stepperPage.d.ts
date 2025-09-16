import type {GammaOffice} from "#irentcar/types/gammaOffice";
import type {Office} from "#irentcar/types/office";
import type {Gamma} from "#irentcar/types/gamma";
import type {GammaOfficeExtra} from "#irentcar/types/extra";

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
  gammaOfficeTax: number | null
  gammaOfficeTaxAmount: number | null
  totalPrice: number | null
  gammaOfficeExtraTotalPrice: number | null
  rentalDays: number | null

  //totalPriceUsd: number | null
}

export interface RentCtx
{
  step: Ref<number>
  gammaOffices: Ref<GammaOffice[]>
  reservationPreview: Ref<ReservationData>
  next: () => void
  prev: () => void
  completeReservation: () => void
}
