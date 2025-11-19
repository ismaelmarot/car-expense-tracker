import React, { useState } from 'react';
import { AccordionDetails, AccordionSummary, Dialog, DialogContent, DialogTitle, Button, Grid } from '@mui/material';
import { AccordionStyled, ButtonDownloadPDF, DialogActionsStyled, ExpencesToDate, PictureAsPdfIconStyled, TypographyStyled, VehicleDescription, VehicleDescriptionText } from './DownloadPDFComponentStyles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getCarExpenses, getCarById } from '../../api/api';
import { getCurrentDate } from '../../functions/getCurrentDate';
import jsPDF from 'jspdf';
import ExpenseTableForPDF from '../ExpenseTableForPDF/ExpenseTableForPDF';

const DownloadPDFComponent: React.FC = () => {
    const [expenses, setExpenses] = useState<any[]>([]);
    const [vehicle, setVehicle] = useState<any | null>(null);
    const [open, setOpen] = useState(false);

    const vehicleId = window.location.pathname.split('/')[2];

    const handleOpen = async () => {
        if (vehicleId) {
            const vehicleData = await getCarById(Number(vehicleId));
            setVehicle(vehicleData || null);

            const expensesData = await getCarExpenses(Number(vehicleId));
            setExpenses(expensesData || []);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const formatDate = (date: string) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const generatePDF = () => {
        const doc = new jsPDF('landscape', 'mm', 'a4');

        if (vehicle?.data) {
            doc.setFontSize(16);
            doc.text("Informe de Gastos", 20, 20);
            doc.setFontSize(12);
            doc.text(`Marca: ${vehicle.data.brand}`, 20, 30);
            doc.text(`Modelo: ${vehicle.data.model}`, 20, 35);
            doc.text(`Año: ${vehicle.data.year}`, 20, 40);
            doc.text(`Patente: ${vehicle.data.vin}`, 20, 45);
        } else {
            console.error("Los datos del vehículo no están disponibles.");
        }

        const currentDate = getCurrentDate();
        doc.setFontSize(12);
        doc.text(`Gastos a la fecha: ${currentDate}`, 20, 50);

        let yPosition = 60;
        const startX = 20;
        const colWidths = [60, 40, 40, 30, 40];
        const totalWidth = colWidths.reduce((a, b) => a + b, 0);

        doc.setFontSize(12);
        doc.text("Descripción", startX + 5, yPosition);
        doc.text("Categoría", startX + colWidths[0] + 5, yPosition);
        doc.text("Kilómetros", startX + colWidths[0] + colWidths[1] + 5, yPosition);
        doc.text("Monto $", startX + colWidths[0] + colWidths[1] + colWidths[2] + 5, yPosition);
        doc.text("Fecha", startX + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + 5, yPosition);

        yPosition += 5;
        doc.line(startX, yPosition, startX + totalWidth, yPosition);

        yPosition += 10;
        expenses.forEach((expense, index) => {
            if (yPosition + 10 > 270) {
                doc.addPage();
                yPosition = 20;
            }

            doc.text(expense.description || '', startX + 3, yPosition);
            doc.text(expense.category || '', startX + colWidths[0] + 3, yPosition);
            doc.text((expense.kilometers || 0).toString(), startX + colWidths[0] + colWidths[1] + 3, yPosition);
            doc.text(Number(expense.price || 0).toFixed(2), startX + colWidths[0] + colWidths[1] + colWidths[2] + 3, yPosition);
            doc.text(formatDate(expense.date || ''), startX + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + 3, yPosition);
            yPosition += 10;
        });

        doc.save(`informe_gastos_${vehicle?.data?.brand || 'vehiculo'}_${vehicle?.data?.model || 'modelo'}_Patente:${vehicle?.data?.vin || 'N/A'}.pdf`);
    };

    return (
        <AccordionStyled>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1-content'
                id='panel1-header'
            >
                <PictureAsPdfIconStyled />
                <TypographyStyled>
                    Descargar informe del veh&iacute;culo (.pdf)
                </TypographyStyled>
            </AccordionSummary>
            <AccordionDetails>
                <Button variant='contained' color='primary' onClick={handleOpen}>
                    Descargar PDF
                </Button>

                <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
                    <DialogTitle>
                        {vehicle && (
                            <Grid container>
                                <VehicleDescription item xs={6}>
                                    <VehicleDescriptionText>
                                        Vehículo: <strong>{vehicle.data.brand} {vehicle.data.model} {vehicle.data.year}</strong>
                                    </VehicleDescriptionText>
                                </VehicleDescription>
                                <ExpencesToDate item xs={6}>
                                    Gastos a la fecha: {getCurrentDate()}
                                </ExpencesToDate>
                                <Grid item xs={12}>
                                    <VehicleDescriptionText>
                                        Patente: <strong>{vehicle.data.vin}</strong>
                                    </VehicleDescriptionText>
                                </Grid>
                            </Grid>
                        )}
                    </DialogTitle>
                    <DialogContent>
                        <ExpenseTableForPDF expenses={expenses} />
                    </DialogContent>

                    <DialogActionsStyled>
                        <Button onClick={handleClose} color='primary'>
                            Cerrar
                        </Button>
                        <ButtonDownloadPDF onClick={generatePDF} disabled={expenses.length === 0 || !vehicle}>
                            Descargar PDF
                        </ButtonDownloadPDF>
                    </DialogActionsStyled>

                </Dialog>
            </AccordionDetails>
        </AccordionStyled>
    );
};

export default DownloadPDFComponent;
