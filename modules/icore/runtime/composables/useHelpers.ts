export function useHelpers ()
{

  const formatDate = (input: string, locale = 'es-CO') =>
  {
    const safe = input.replace(' ', 'T').replace(/\.\d+$/, '')
    const d = new Date(safe)
    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(d)
  }

  const formatNumber = (value: number | string, locale = 'es-CO') =>
  {
    return new Intl.NumberFormat(locale).format(Number(value))
  }

  const formatCurrency = (
    value: number | string,
    currency: string = 'COP',
    opts: Intl.NumberFormatOptions = {style: 'currency', currency, maximumFractionDigits: 0},
    locale = 'es-CO'
  ) => new Intl.NumberFormat(locale, opts).format(Number(value))

  return {formatDate, formatNumber, formatCurrency}
}
