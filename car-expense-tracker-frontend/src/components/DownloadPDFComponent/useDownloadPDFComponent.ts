import { useState } from 'react'
import jsPDF from 'jspdf'
import { getCarExpenses, getCarById } from '@/api'
import { getCurrentDate } from '@/functions'

export const useDownloadPDF = (vehicleId: string | number | undefined) => {
    const [expenses, setExpenses] = useState<any[]>([])
    const [vehicle, setVehicle] = useState<any | null>(null)
    const [open, setOpen] = useState(false)

    const handleOpen = async () => {
        if (vehicleId) {
            const vehicleData = await getCarById(Number(vehicleId))
            setVehicle(vehicleData || null)

            const expensesData = await getCarExpenses(Number(vehicleId))
            setExpenses(expensesData || [])
        }
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const formatDate = (date: string) => {
        const d = new Date(date)
        const day = String(d.getDate()).padStart(2, '0')
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const year = d.getFullYear()
        return `${day}/${month}/${year}`
    }

    const generatePDF = () => {
        const doc = new jsPDF('landscape', 'mm', 'a4')

        if (vehicle?.data) {
            doc.setFontSize(16)
            doc.text("Informe de Gastos", 20, 20)
            doc.setFontSize(12)
            doc.text(`Marca: ${vehicle.data.brand}`, 20, 30)
            doc.text(`Modelo: ${vehicle.data.model}`, 20, 35)
            doc.text(`Año: ${vehicle.data.year}`, 20, 40)
            doc.text(`Patente: ${vehicle.data.vin}`, 20, 45)
        }

        doc.setFontSize(12)
        doc.text(`Gastos a la fecha: ${getCurrentDate()}`, 20, 50)

        let y = 60
        const startX = 20
        const colWidths = [60, 40, 40, 30, 40]
        const totalWidth = colWidths.reduce((a, b) => a + b, 0)

        doc.text("Descripción", startX + 5, y)
        doc.text("Categoría", startX + colWidths[0] + 5, y)
        doc.text("Kilómetros", startX + colWidths[0] + colWidths[1] + 5, y)
        doc.text("Monto $", startX + colWidths[0] + colWidths[1] + colWidths[2] + 5, y)
        doc.text("Fecha", startX + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + 5, y)

        y += 10

        expenses.forEach((e) => {
            if (y > 270) {
                doc.addPage()
                y = 20
            }

            doc.text(e.description || '', startX + 3, y)
            doc.text(e.category || '', startX + colWidths[0] + 3, y)
            doc.text(String(e.kilometers || 0), startX + colWidths[0] + colWidths[1] + 3, y)
            doc.text(Number(e.amount || 0).toFixed(2), startX + colWidths[0] + colWidths[1] + colWidths[2] + 3, y)
            doc.text(formatDate(e.date || ''), startX + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + 3, y)

            y += 10
        })

        doc.save(
            `informe_${vehicle?.data?.brand || 'vehiculo'}_${vehicle?.data?.model || 'modelo'}.pdf`
        )
    }

    return {
        open,
        vehicle,
        expenses,
        handleOpen,
        handleClose,
        generatePDF,
    }
}