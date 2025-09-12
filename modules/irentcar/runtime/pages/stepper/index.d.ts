import type {GammaOffice, Extra} from "#irentcar/types/gammaOffice";
import type {RentAvailability} from "#irentcar/components/IrentCarForm/IrentCarForm";
import type {CheckboxGroupProps} from "#ui/components/CheckboxGroup.vue";

export interface ReservationData extends RentAvailability
{
  gammaOffice: GammaOffice | null
  gammaOfficeExtras: Extra[]
  flyNumber: string
}

export interface RentCtx
{
  step: Ref<number>
  gammaOffices: Ref<GammaOffice[]>
  reservationData: Ref<ReservationData>
  next: () => void
  prev: () => void
}
