export const formatPrice = (value: string): string => {
    const cleanValue = value.replace(/[^\d,]/g, '')
    const parts = cleanValue.split(',')

    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')

    if (parts.length > 1) {
        return `${integerPart},${parts[1].slice(0, 2)}`
    }

    return integerPart
}