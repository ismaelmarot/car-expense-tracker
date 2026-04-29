import { Translations } from '@/interfaces'
import { Language } from '@/types'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

const translations: Translations = {
  // Settings
  settings: { es: 'Ajustes', en: 'Settings' },
  language: { es: 'Idioma', en: 'Language' },
  spanish: { es: 'Español', en: 'Spanish' },
  english: { es: 'Inglés', en: 'English' },
  createdBy: { es: 'Creado por', en: 'Created by' },
  legalTerms: { es: 'Términos Legales', en: 'Legal Terms' },
  version: { es: 'Versión', en: 'Version' },
  close: { es: 'Cerrar', en: 'Close' },
  dataExport: { es: 'Exportar datos', en: 'Data export' },
  backup: { es: 'Respaldo', en: 'Backup' },
  generateReport: { es: 'Generar Informe', en: 'Generate Report' },
  reports: { es: 'Reportes', en: 'Reports' },
  from: { es: 'Desde', en: 'From' },
  to: { es: 'Hasta', en: 'To' },
  selectAll: { es: 'Seleccionar todas', en: 'Select all' },
  deselectAll: { es: 'Deseleccionar todas', en: 'Deselect all' },
  generating: { es: 'Generando...', en: 'Generating...' },
  downloadPDF: { es: 'Descargar PDF', en: 'Download PDF' },
  format: { es: 'Formato', en: 'Format' },
  download: { es: 'Descargar', en: 'Download' },
  legalText1: { es: 'Este software está licenciado bajo la Licencia MIT. Esto significa que puede usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar y/o vender copias del software, siempre que se incluya el aviso de derechos de autor original.', en: 'This software is licensed under the MIT License. This means you may use, copy, modify, merge, publish, distribute, sublicense and/or sell copies of the software, as long as the original copyright notice is included.' },
  legalText2: { es: '**Exención de responsabilidad:** El software se proporciona "tal cual", sin garantía de ningún tipo, expresa o implícita, incluyendo pero no limitándose a garantías de comerciabilidad, idoneidad para un propósito particular o no infracción. En ningún caso los autores o titulares del copyright serán responsables de ningún reclamo, daño u otra responsabilidad, ya sea en una acción de contrato, agravio o de otro tipo, que surja del uso del software o su distribución.', en: '**Disclaimer:** The software is provided "as is", without warranty of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose or non-infringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from the use of the software or its distribution.' },
  
  // Cars Page
  myVehicles: { es: 'Mis Vehículos', en: 'My Vehicles' },
  vehicle: { es: 'vehículo', en: 'vehicle' },
  vehicles: { es: 'vehículos', en: 'vehicles' },
  loadingVehicles: { es: 'Cargando vehículos...', en: 'Loading vehicles...' },
  add: { es: 'Agregar', en: 'Add' },
  noVehicles: { es: 'No hay vehículos registrados', en: 'No registered vehicles' },
  addFirstVehicle: { es: 'Agregá tu primer vehículo para comenzar a rastrear tus gastos', en: 'Add your first vehicle to start tracking your expenses' },
  addNewVehicle: { es: 'Agregar nuevo vehículo', en: 'Add new vehicle' },
  
  // Navigation
  back: { es: '← Volver', en: '← Back' },
  
  // Car details
  brand: { es: 'Marca', en: 'Brand' },
  model: { es: 'Modelo', en: 'Model' },
  year: { es: 'Año', en: 'Year' },
  licensePlate: { es: 'Patente', en: 'License Plate' },
  currentKm: { es: 'Kilometraje actual', en: 'Current Km' },
  kilometers: { es: 'Kilometraje', en: 'Kilometers' },
  serviceEvery: { es: 'Service cada', en: 'Service every' },
  lastService: { es: 'Último service', en: 'Last service' },
  lastOilChange: { es: 'Último cambio de aceite', en: 'Last oil change' },
  serviceInterval: { es: 'Intervalo de service', en: 'Service interval' },
  nextServiceKm: { es: 'Próximo service (km)', en: 'Next service (km)' },
  nextOilChange: { es: 'Próximo cambio de aceite', en: 'Next oil change' },
  nextService: { es: 'Próximo service', en: 'Next service' },
  remainingForService: { es: 'Faltan para service', en: 'Remaining for service' },
  nextVTV: { es: 'Próxima VTV', en: 'Next VTV' },
  nextExtinguisher: { es: 'Próximo Extintor', en: 'Next Extinguisher' },
  timeRemaining: { es: 'Tiempo restante', en: 'Time remaining' },
  extintor: { es: 'Extintor', en: 'Extinguisher' },
  vtvExpired: { es: 'VENCIDA', en: 'EXPIRED' },
  extinguisherExpired: { es: 'VENCIDO', en: 'EXPIRED' },
  nextDue: { es: 'Próxima', en: 'Next' },
  edit: { es: 'Editar', en: 'Edit' },
  delete: { es: 'Eliminar', en: 'Delete' },
  deleteCar: { es: 'Eliminar vehículo', en: 'Delete vehicle' },
  deleteCarConfirm: { es: '¿Eliminar', en: 'Delete' },
  carNotFound: { es: 'Vehículo no encontrado', en: 'Vehicle not found' },
  updateVehicleDate: { es: '¿Actualizar fecha de', en: 'Update' },
  updateVehicleDateDesc: { es: '¿Deseás actualizar la fecha del vehículo con', en: 'Do you want to update the vehicle date to' },
  yes: { es: 'Sí, actualizar', en: 'Yes, update' },
  no: { es: 'No, solo guardar gasto', en: 'No, only save expense' },
  
  // Tabs
  expenseTab: { es: 'Gasto', en: 'Expense' },
  history: { es: 'Historial', en: 'History' },
  statistics: { es: 'Gráfica', en: 'Statistics' },
  settingsTab: { es: 'Reportes', en: 'Reports' },
  
  // Add car
  addVehicle: { es: 'Agregar Vehículo', en: 'Add Vehicle' },
  enterVehicleData: { es: 'Ingresá los datos de tu nuevo vehículo', en: 'Enter your new vehicle data' },
  addPhoto: { es: 'Agregar foto', en: 'Add photo' },
  optionalPhoto: { es: 'Opcional: agrega una foto de tu vehículo', en: 'Optional: add a photo of your vehicle' },
  tapToChangePhoto: { es: 'Toca para cambiar la foto', en: 'Tap to change photo' },
  optional: { es: '(opcional)', en: '(optional)' },
  additionalInfo: { es: 'Información adicional', en: 'Additional information' },
  lastServiceKm: { es: 'Último service (km)', en: 'Last service (km)' },
  serviceEveryKm: { es: 'Service cada (km)', en: 'Service every (km)' },
  vtvDate: { es: 'Fecha VTV', en: 'VTV Date' },
  extinguisherDate: { es: 'Fecha extintor', en: 'Extinguisher Date' },
  
  // Expenses
  addExpense: { es: 'Agregar Gasto', en: 'Add Expense' },
  addExpenseSubtitle: { es: 'Registra un nuevo gasto para tu vehículo', en: 'Record a new expense for your vehicle' },
  description: { es: 'Descripción', en: 'Description' },
  price: { es: 'Precio', en: 'Price' },
  date: { es: 'Fecha', en: 'Date' },
  category: { es: 'Categoría', en: 'Category' },
  photos: { es: 'Fotos', en: 'Photos' },
  select: { es: 'Seleccionar', en: 'Select' },
  
  // Categories
  catAccessories: { es: 'Accesorios', en: 'Accessories' },
  catBodyPaint: { es: 'Chapa y pintura', en: 'Body & paint' },
  catFuel: { es: 'Combustible', en: 'Fuel' },
  catElectricity: { es: 'Electricidad', en: 'Electricity' },
  catParking: { es: 'Estacionamiento', en: 'Parking' },
  catExtinguisher: { es: 'Extintor', en: 'Extinguisher' },
  catTowing: { es: 'Grúa / asistencia', en: 'Towing / assistance' },
  catWashing: { es: 'Lavado', en: 'Washing' },
  catMaintenance: { es: 'Mantenimiento', en: 'Maintenance' },
  catImprovements: { es: 'Mejoras / tuning', en: 'Improvements / tuning' },
  catFines: { es: 'Multas', en: 'Fines' },
  catTires: { es: 'Neumáticos', en: 'Tires' },
  catRegistration: { es: 'Patente', en: 'Registration' },
  catTolls: { es: 'Peajes', en: 'Tolls' },
  catRepairs: { es: 'Reparación', en: 'Repairs' },
  catMechanicalRepairs: { es: 'Reparaciones mecánicas', en: 'Mechanical repairs' },
  catParts: { es: 'Repuestos', en: 'Parts' },
  catInsurance: { es: 'Seguro', en: 'Insurance' },
  catService: { es: 'Service (aceite, filtros)', en: 'Service (oil, filters)' },
  catInspection: { es: 'VTV / ITV', en: 'Inspection' },
  catOther: { es: 'Otros', en: 'Other' },
  
  // Statistics
  topExpenses: { es: 'Top 5 gastos más altos', en: 'Top 5 highest expenses' },
  weeklyComparison: { es: 'Comparativo por semana', en: 'Weekly comparison' },
  monthlyDistribution: { es: 'Distribución mensual', en: 'Monthly distribution' },
  highestExpense: { es: 'Gasto más alto', en: 'Highest expense' },
  lowestExpense: { es: 'Gasto más bajo', en: 'Lowest expense' },
  costPerKm: { es: 'Costo por km', en: 'Cost per km' },
  loadingStats: { es: 'Cargando estadísticas...', en: 'Loading statistics...' },
  averagePerExpense: { es: 'Promedio por gasto', en: 'Average per expense' },
  registeredExpenses: { es: 'Gastos registrados', en: 'Registered expenses' },
  totalKilometers: { es: 'Kilómetros totales', en: 'Total kilometers' },
  monthlyAverageExpense: { es: 'Gasto mensual promedio', en: 'Monthly average expense' },
  mostExpensiveCategory: { es: 'Categoría más costosa', en: 'Most expensive category' },
  expenseFrequency: { es: 'Frecuencia de gastos', en: 'Expense frequency' },
  every: { es: 'Cada', en: 'Every' },
  daysFrequency: { es: 'días', en: 'days' },
  monthlyAverageCost: { es: 'Costo promedio por mes', en: 'Average cost per month' },
  expenseTrend: { es: 'Tendencia de gastos', en: 'Expense trend' },
  expensesByCategory: { es: 'Gastos por categoría', en: 'Expenses by category' },
  expenses: { es: 'Gastos', en: 'Expenses' },
  annualExpense: { es: 'Gasto anual', en: 'Annual expense' },
  
  // Common
  save: { es: 'Guardar', en: 'Save' },
  cancel: { es: 'Cancelar', en: 'Cancel' },
  confirm: { es: 'Confirmar', en: 'Confirm' },
  noData: { es: 'Sin registro', en: 'No record' },
  expired: { es: 'Vencido', en: 'Expired' },
  days: { es: 'días', en: 'days' },
  months: { es: 'meses', en: 'months' },
  years: { es: 'años', en: 'years' },
  remaining: { es: 'restantes', en: 'remaining' },
  deleteConfirm: { es: '¿Estás seguro de que deseas eliminar', en: 'Are you sure you want to delete' },
  deleteWarning: { es: 'Esta acción eliminará todos los gastos asociados y no se puede deshacer.', en: 'This action will delete all associated expenses and cannot be undone.' },
  noExpenses: { es: 'No hay gastos registrados para este vehículo.', en: 'No expenses recorded for this vehicle.' },
  loadingExpenses: { es: 'Cargando gastos...', en: 'Loading expenses...' },
  totalSpent: { es: 'Total gastado', en: 'Total spent' },
  totalAmount: { es: ' total', en: ' total' },
  expense: { es: 'gasto', en: 'expense' },
  km: { es: 'Km', en: 'km' },
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language')
    if (saved === 'es' || saved === 'en') return saved
    
    const systemLang = navigator.language.split('-')[0]
    return systemLang === 'es' ? 'es' : 'en'
  });

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}