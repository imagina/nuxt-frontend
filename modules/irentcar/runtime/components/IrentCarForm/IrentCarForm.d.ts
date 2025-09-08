import type {IFormProps} from "~/components/IForm/IForm";

export interface OfficeOption
{
  label: string;
  value: number;
  cityId: number;
}

export interface DateValidationForm
{
  pickupOfficeId: number | null
  pickupDate: string | null
  pickupTime: string | null
  dropOfficeId: number | null
  dropDate: string | null
  dropTime: string | null
}

export interface IrentCarFormProps extends Pick<IFormProps, 'ui'>
{

}
