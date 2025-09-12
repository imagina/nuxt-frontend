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
  gamma_office_extra_ids: string;
}
