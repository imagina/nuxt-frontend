import type {GammaOffice, Extra} from "#irentcar/types/gammaOffice";
import type {RentAvailability} from "#irentcar/components/IrentCarForm/IrentCarForm";

export interface ReservationData extends RentAvailability
{
  gammaOffice: GammaOffice | null
  gammaOfficeExtras: Extra[] | null
}

export interface RentCtx
{
  step: Ref<number>
  gammaOffices: Ref<GammaOffice[]>
  reservationData: Ref<ReservationData>
  next: () => void
  prev: () => void
  // rentParams: Ref<RentAvailability | undefined>
  // loading: Ref<boolean>
  // getAvailableGammas: (filter: RentAvailability) => Promise<void>
  // selectedCar: Ref<GammaOffice | null>
  // selectCar: (car: GammaOffice) => void
  // isSelected: (c: GammaOffice) => boolean
}
