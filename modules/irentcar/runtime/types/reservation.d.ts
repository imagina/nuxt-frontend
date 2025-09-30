import type {Gamma} from "#irentcar/types/gamma";
import type {Office} from "#irentcar/types/office";
import type {PriceConversion} from "#irentcar/types/priceConversion";
import type {GammaOfficeExtra} from "#irentcar/types/extra";

export interface Slot
{
  hour: string;            // e.g., "08:00"
  available: boolean;
}

export interface DateValidation
{
  reservationDates: {
    pickupDate: string;        // e.g., "2025-09-10"
    minDropoffDate: string;    // e.g., "2025-09-12"
    maxDropoffDate: string;    // e.g., "2025-09-18"
    extraInfor: {
      minDropoffDays: number;
      maxDropoffDays: number;
      localTime: string;       // e.g., "2025-09-08 09:01"
    };
  };
  pickupHourSlots: {
    slots: Slot[];
    extraInfor: {
      minAdvanceMinutes: number;
      slotsIntervalMinutes: number;
      slotRangeStart: string;  // e.g., "08:00"
      slotRangeEnd: string;    // e.g., "20:00"
    };
  };
}

export interface CreateReservationData
{
  pickup_office_id: number;
  pickup_date: string;
  dropoff_office_id: number;
  dropoff_date: string;
  gamma_office_id: number;
  gamma_office_extra_ids: number[];
}

export interface Reservation {
  id: number
  userId: number
  gammaId: number
  gammaOfficeId: number
  pickupOfficeId: number
  pickupOffice: Office
  dropoffOfficeId: number
  dropoffOffice: Office
  pickupDate: string
  dropoffDate: string
  statusId: number
  gammaOfficeTax: number
  gammaOfficeExtraIds: string
  totalPriceUsd: number
  options: Record<string, unknown>
  createdAt: string
  updatedAt: string
  status: Status
  gammaData: Gamma
  gamma: Gamma
  extrasData: GammaOfficeExtra[] | []
  rentalDays: number,

  gammaOfficePrice: number | null
  gammaOfficePriceConversions: PriceConversion | null

  gammaOfficeExtraTotalPrice: number | null
  gammaOfficeExtraTotalPriceConversions: PriceConversion | null

  totalPrice: number | null
  totalPriceConversions: PriceConversion | null

  withPrefix: string
}
