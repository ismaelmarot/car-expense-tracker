export const formatDate = (dateString: string): string => {
    const datePart = dateString.split('T')[0]
    const parts = datePart.split('-')
    if (parts.length !== 3) return "Fecha inválida"
    return `${parts[2]}/${parts[1]}/${parts[0]}`
};
