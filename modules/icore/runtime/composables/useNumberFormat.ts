export function useNumberFormat (locale = 'es-CO')
{
  const nf = new Intl.NumberFormat(locale)
  const format = (value: number | string) => nf.format(Number(value))

  const formatCurrency = (
    value: number | string,
    currency: string = 'COP',
    opts: Intl.NumberFormatOptions = {style: 'currency', currency, maximumFractionDigits: 0}
  ) => new Intl.NumberFormat(locale, opts).format(Number(value))

  return {format, formatCurrency}
}
