export const formatNumberWithCommas = (value: number): string => {
  if (value === undefined || value === null || isNaN(value)) return '0,00';
  const formattedValue = value % 1 === 0 ? `${value}.00` : value.toFixed(2);
  return new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(formattedValue));
};
  