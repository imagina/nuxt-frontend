export interface DateValidationForm
{
  pickupOffice: {
    label: string,
    value: number,
    cityId: number,
  } | null
  pickupDate: string | null
  pickupTime: string | null
  dropOfficeId: number | null
  dropDate: string | null
  dropTime: string | null
}
