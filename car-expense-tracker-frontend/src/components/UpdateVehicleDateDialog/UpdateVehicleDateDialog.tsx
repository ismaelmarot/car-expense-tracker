import React from 'react'
import { Dialog, DialogContent, Box, Typography } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { useLanguage } from '../../contexts/LanguageContext'
import { ButtonCancel, ButtonConfirm } from './UpdateVehicleDateDialog.styles'

interface UpdateVehicleDateDialogProps {
    open: boolean
    category: 'vtv_itv' | 'extintor'
    date: string
    onConfirm: () => void
    onCancel: () => void
}

export const UpdateVehicleDateDialog: React.FC<UpdateVehicleDateDialogProps> = ({
    open,
    category,
    date,
    onConfirm,
    onCancel
}) => {
    const { t } = useLanguage()

    const label = category === 'vtv_itv' ? 'VTV' : t('extintor')
    const formattedDate = date ? date.split('-').reverse().join('/') : ''

    return (
        <Dialog
            open={open}
            onClose={onCancel}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '20px',
                    padding: '0.5rem',
                    overflow: 'visible'
                }
            }}
        >
            <DialogContent sx={{ textAlign: 'center', px: 3, pt: 3, pb: 1 }}>
                <Box sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #e8f4fd 0%, #cce5ff 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                    border: '1px solid #cce5ff'
                }}>
                    <CalendarMonthIcon sx={{ fontSize: 32, color: '#0071e3' }} />
                </Box>

                <Typography sx={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#1d1d1f',
                    mb: 1
                }}>
                    {t('updateVehicleDate')} {label}?
                </Typography>

                <Typography sx={{
                    fontSize: '0.9375rem',
                    color: '#86868b',
                    lineHeight: 1.5
                }}>
                    {t('updateVehicleDateDesc')} {label}: <strong>{formattedDate}</strong>
                </Typography>
            </DialogContent>

            <Box sx={{
                display: 'flex',
                gap: '0.75rem',
                px: 3,
                pb: 3,
                pt: 1.5
            }}>
                <ButtonCancel onClick={onCancel} fullWidth>
                    {t('no')}
                </ButtonCancel>
                <ButtonConfirm onClick={onConfirm} fullWidth>
                    {t('yes')}
                </ButtonConfirm>
            </Box>
        </Dialog>
    )
}
