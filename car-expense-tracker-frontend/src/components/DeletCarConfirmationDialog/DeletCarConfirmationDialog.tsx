import { Dialog, DialogContent, Box, Typography } from '@mui/material'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import { DeleteCarConfirmationDialogInterface } from '@/interfaces'
import { useLanguage } from '../../contexts/LanguageContext'
import { ButtonCancel, ButtonConfirm } from './DeletCarConfirmationDialog.styles'

export const DeleteCarConfirmationDialog: React.FC<DeleteCarConfirmationDialogInterface> = ({ open, title, description, onConfirm, onCancel }) => {
    const { t } = useLanguage()

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
                    background: 'linear-gradient(135deg, #fff5f5 0%, #ffe5e5 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                    border: '1px solid #ffe5e5'
                }}>
                    <WarningAmberRoundedIcon sx={{ fontSize: 32, color: '#ff3b30' }} />
                </Box>

                <Typography sx={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#1d1d1f',
                    mb: 1
                }}>
                    {title || t('deleteCar')}
                </Typography>

                <Typography sx={{
                    fontSize: '0.9375rem',
                    color: '#86868b',
                    lineHeight: 1.5,
                    mb: 0.5
                }}>
                    {description}
                </Typography>

                <Typography sx={{
                    fontSize: '0.8125rem',
                    color: '#aeaeb2',
                    lineHeight: 1.4
                }}>
                    {t('deleteWarning')}
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
                    {t('cancel')}
                </ButtonCancel>
                <ButtonConfirm onClick={onConfirm} fullWidth>
                    {t('delete')}
                </ButtonConfirm>
            </Box>
        </Dialog>
    )
}
