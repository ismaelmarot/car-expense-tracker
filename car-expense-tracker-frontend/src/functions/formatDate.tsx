export const formatDate = (dateString: string): string => {
    const dateStr = dateString.includes('T') ? dateString : dateString + 'T12:00:00'
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
        return "Fecha inválida";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${day}/${month}/${year}`;
};
