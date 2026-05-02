import React from 'react'
import { Dialog, DialogTitle, Button } from '@mui/material'
import { useLanguage } from '@/contexts'
import { EditExpenseDialogPropsInterface } from '@/interfaces'
import { ExpenseFormFields, PhotoUploader } from '@/components'
import { useEditExpenseDialog } from './useEditExpenseDialog'
import {
    ButtonSave,
    DialogActionsStyled,
    DialogContentStyled,
    TypographyError,
    dialogPaperStyles,
} from './EditExpenseDialog.styled'

export const EditExpenseDialog: React.FC<EditExpenseDialogPropsInterface> = ({
    open,
    expense,
    error,
    onClose,
    onSave,
    onChange,
    onPhotosChange,
}) => {
    const { t } = useLanguage()

    const {
        priceDisplay,
        kmDisplay,
        handlePriceChange,
        handleKmChange,
    } = useEditExpenseDialog(expense, onChange)

    const photos = (expense as any)?.photos || []

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: { dialogPaperStyles },
            }}
        >
            {/* TITLE */}
            <DialogTitle sx={{ fontWeight: 600, fontSize: '1.25rem' }}>
                {t('edit')} {t('expense')}
            </DialogTitle>

            <DialogContentStyled>
                {/* ERROR */}
                {error && (
                    <TypographyError color="error">
                        {error}
                    </TypographyError>
                )}

                {/* FORM */}
                {expense && (
                    <>
                        <ExpenseFormFields
                            expense={expense}
                            priceDisplay={priceDisplay}
                            kmDisplay={kmDisplay}
                            onChange={onChange}
                            handlePriceChange={handlePriceChange}
                            handleKmChange={handleKmChange}
                        />

                        {/* PHOTOS */}
                        {onPhotosChange && (
                            <PhotoUploader
                                photos={photos}
                                onPhotosChange={onPhotosChange}
                                maxPhotos={3}
                            />
                        )}
                    </>
                )}

                {/* ACTIONS */}
                <DialogActionsStyled>
                    <Button
                        onClick={onClose}
                        sx={{ borderRadius: '34px' }}
                    >
                        {t('cancel')}
                    </Button>

                    <ButtonSave onClick={onSave}>
                        {t('save')}
                    </ButtonSave>
                </DialogActionsStyled>
            </DialogContentStyled>
        </Dialog>
    )
}