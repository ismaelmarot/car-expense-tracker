export const formatNumberByThousands = (value: number): string => {
  return new Intl.NumberFormat('es-ES', { useGrouping: true }).format(value);
};
  