export const formatCategory = (category: string): string => {
    const categoryMap: { [key: string]: string } = {
        'accesorios': 'Accesorios',
        'chapa_pintura': 'Chapa y pintura',
        'combustible': 'Combustible',
        'electricidad': 'Electricidad',
        'estacionamiento': 'Estacionamiento',
        'extintor': 'Extintor',
        'grua_asistencia': 'Grúa / asistencia',
        'lavado': 'Lavado',
        'mantenimiento': 'Mantenimiento',
        'mejoras_tuning': 'Mejoras / tuning',
        'multas': 'Multas',
        'neumaticos': 'Neumáticos',
        'patente': 'Patente',
        'peajes': 'Peajes',
        'reparacion': 'Reparación',
        'reparaciones_mecanicas': 'Reparaciones mecánicas',
        'repuestos': 'Repuestos',
        'seguro': 'Seguro',
        'service': 'Service',
        'vtv_itv': 'VTV / ITV',
        'otros': 'Otros'
    };

    return categoryMap[category] || category;
};
