import React from 'react'
import { AccordionDetails, AccordionSummary, Dialog, DialogContent, DialogTitle, Button, Grid } from '@mui/material'
import { Icons } from '@/constants'
import { ExpenseTableForPDF } from '@/components'
import { useDownloadPDF } from './useDownloadPDFComponent'
import {
    AccordionStyled,
    ButtonDownloadPDF,
    DialogActionsStyled,
    PictureAsPdfIconStyled,
    TypographyStyled,
    VehicleDescription,
    VehicleDescriptionText,
    ExpencesToDate,
} from './DownloadPDFComponent.styles'

export const DownloadPDFComponent: React.FC = () => {
    const vehicleId = window.location.pathname.split('/')[2]

    const {
        open,
        vehicle,
        expenses,
        handleOpen,
        handleClose,
        generatePDF,
    } = useDownloadPDF(vehicleId)

    return (
        <AccordionStyled>
            {/* HEADER */}
            <AccordionSummary
                expandIcon={<Icons.ExpandMore />}
                aria-controls='panel1-content'
                id='panel1-header'
            >
                <PictureAsPdfIconStyled />
                <TypographyStyled>
                    Descargar informe del vehículo (.pdf)
                </TypographyStyled>
            </AccordionSummary>

            {/* CONTENT */}
            <AccordionDetails>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleOpen}
                >
                    Descargar PDF
                </Button>

                {/* DIALOG */}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth='md'
                    fullWidth
                >
                    {/* TITLE */}
                    <DialogTitle>
                        {vehicle && (
                            <Grid container>
                                <VehicleDescription item xs={6}>
                                    <VehicleDescriptionText>
                                        Vehículo:{' '}
                                        <strong>
                                            {vehicle.data.brand}{' '}
                                            {vehicle.data.model}{' '}
                                            {vehicle.data.year}
                                        </strong>
                                    </VehicleDescriptionText>
                                </VehicleDescription>

                                <ExpencesToDate item xs={6}>
                                    Gastos a la fecha
                                </ExpencesToDate>

                                <Grid item xs={12}>
                                    <VehicleDescriptionText>
                                        Patente:{' '}
                                        <strong>{vehicle.data.vin}</strong>
                                    </VehicleDescriptionText>
                                </Grid>
                            </Grid>
                        )}
                    </DialogTitle>

                    {/* CONTENT TABLE */}
                    <DialogContent>
                        <ExpenseTableForPDF expenses={expenses} />
                    </DialogContent>

                    {/* ACTIONS */}
                    <DialogActionsStyled>
                        <Button onClick={handleClose} color='primary'>
                            Cerrar
                        </Button>

                        <ButtonDownloadPDF
                            onClick={generatePDF}
                            disabled={!vehicle || expenses.length === 0}
                        >
                            Descargar PDF
                        </ButtonDownloadPDF>
                    </DialogActionsStyled>
                </Dialog>
            </AccordionDetails>
        </AccordionStyled>
    )
}