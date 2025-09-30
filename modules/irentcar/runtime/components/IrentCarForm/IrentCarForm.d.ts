import type {IFormProps} from "~/components/IForm/IForm";
import type {Office} from "#irentcar/types/office";

export interface IrentCarFormEmits
{
  (e: "submit", payload: RentAvailability): void
}

export interface OfficeOption
{
  label: string;
  value: number;
  cityId: number;
}

export interface RentAvailability
{
  pickupOfficeId: number | null
  pickupDate: string | null
  pickupTime: string | null
  dropOfficeId: number | null
  dropDate: string | null
  dropTime: string | null
  pickupOffice?: Office | null,
  dropoffOffice?: Office | null
}

export interface IrentCarFormProps extends Pick<IFormProps, 'ui'>
{
  id?: string
}

export interface dropLimitCalendarType {
  min : string,
  max : string,
}

export type ResettableKeys = 'pickupTime' | 'dropOfficeId' | 'dropDate' | 'dropTime'
