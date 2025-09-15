import type {PriceConversion} from "#irentcar/types/priceConversion";

export function useIPriceConversion ()
{

  function getAsLabel (priceList: PriceConversion | null)
  {
    return Object.entries(priceList ?? {})
      .map(([currency, value]) => `${currency} ${value}`)
      .join(', ')
  }


  return {getAsLabel}
}
