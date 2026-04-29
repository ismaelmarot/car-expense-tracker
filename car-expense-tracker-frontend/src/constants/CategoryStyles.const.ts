import { CategoryStyle, ExpenseCategory } from '@/types'
import { CATEGORY_COLORS } from './CategoryColors.const'

export const CATEGORY_STYLES: Record<ExpenseCategory, CategoryStyle> = {
    combustible: CATEGORY_COLORS.orange,
    mantenimiento: CATEGORY_COLORS.blue,
    service: CATEGORY_COLORS.green,
    reparacion: CATEGORY_COLORS.red,
    repuestos: CATEGORY_COLORS.cyan,
    neumaticos: CATEGORY_COLORS.pink,
    seguro: CATEGORY_COLORS.purple,
    patente: CATEGORY_COLORS.yellow,
    vtv: CATEGORY_COLORS.brown,
    estacionamiento: CATEGORY_COLORS.lime,
    peajes: CATEGORY_COLORS.indigo,
    lavado: CATEGORY_COLORS.teal,
    multas: CATEGORY_COLORS.deepOrange,
    accesorios: CATEGORY_COLORS.gray
}

export const DEFAULT_CATEGORY_STYLE: CategoryStyle = CATEGORY_COLORS.neutral

export const getCategoryStyle = (category?: string): CategoryStyle => {
    if (!category) return DEFAULT_CATEGORY_STYLE

    const key = category.toLowerCase() as ExpenseCategory

    return CATEGORY_STYLES[key] || DEFAULT_CATEGORY_STYLE
}