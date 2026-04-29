export const formatMoney = (value: number | null | undefined): string => {
  if (value === undefined || value === null || isNaN(value)) return '0,00'
  return '' + new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}