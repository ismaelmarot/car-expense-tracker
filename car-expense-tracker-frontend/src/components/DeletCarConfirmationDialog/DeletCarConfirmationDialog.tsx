import { DialogContent } from '@mui/material'
import { useLanguage } from '@/contexts'
import { DeleteCarConfirmationDialogInterface } from '@/interfaces'
import {
    BoxStyled,
    ButtonCancel,
    ButtonConfirm,
    DeleteWarningStyled,
    DescriptionStyled,
    DialogContentStyled,
    DialogStyled,
    IconWarningStyled,
    TitleStyled
} from './DeletCarConfirmationDialog.styles'

export const DeleteCarConfirmationDialog: React.FC<DeleteCarConfirmationDialogInterface> = ({ open, title, description, onConfirm, onCancel }) => {
    const { t } = useLanguage()

    return (
        <DialogStyled
            open={open}
            onClose={onCancel}
            maxWidth='xs'
            fullWidth
        >
            <DialogContent sx={{ textAlign: 'center', px: 3, pt: 3, pb: 1 }}>
                <DialogContentStyled open={false}>
                    <IconWarningStyled />
                </DialogContentStyled>

                <TitleStyled sx={{ mb: 1 }}>
                    {title || t('deleteCar')}
                </TitleStyled>

                <DescriptionStyled sx={{ mb: 0.5 }}>
                    {description}
                </DescriptionStyled>

                <DeleteWarningStyled>
                    {t('deleteWarning')}
                </DeleteWarningStyled>
            </DialogContent>

            <BoxStyled sx={{ px: 3, pb: 3, pt: 1.5 }}>
                <ButtonCancel onClick={onCancel} fullWidth>
                    {t('cancel')}
                </ButtonCancel>
                <ButtonConfirm onClick={onConfirm} fullWidth>
                    {t('delete')}
                </ButtonConfirm>
            </BoxStyled>
        </DialogStyled>
    )
}
