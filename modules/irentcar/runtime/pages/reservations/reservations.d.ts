import type {Reservation} from "#irentcar/types/reservation";

export interface ItemsCollapsible {
  label: string;
  icon: string;
  reservation: Reservation;
}
