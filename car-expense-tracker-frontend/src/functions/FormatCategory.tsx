export const formatCategory = (category: string): string => {
    const categoryMap: { [key: string]: string } = {
        'combustible': 'combustible',
        'mantenimiento': 'mantenimiento',
        'seguro': 'seguro',
        'reparacion': 'reparación',
        'otros': 'otros'
    };

    return categoryMap[category] || category;
};
