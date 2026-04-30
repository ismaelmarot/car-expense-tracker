export const formatKilometers = (value: string): string => {
    const cleanValue = value.replace(/[^\d]/g, '')
    return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}