import React from 'react'
import { Box } from '@mui/material'
import { Icons } from '@/constants'
import { ExpenseDetailModalProps, ExpenseInterface } from '@/interfaces'
import { formatMoney } from '@/functions'
import {
    PopupOverlay,
    PopupCard,
    PopupHeader,
    PopupTitle,
    PopupContent,
    PopupActions,
    PopupButton,
    CloseButton,
    PopupPriceSection,
    PriceLabel,
    PriceValue,
    PhotosSection,
    PhotoThumb,
    PhotosLabel,
} from './ExpeneDetailModal.styles'

export const ExpenseDetailModal: React.FC<ExpenseDetailModalProps> = ({
    open,
    expense,
    onClose,
    onEdit,
    onDelete,
    onOpenPhoto,
  t
}) => {
    if (!open || !expense) return null

    const photos = expense.photos ?? []

    return (
        <PopupOverlay onClick={onClose}>
            <PopupCard onClick={(e: any) => e.stopPropagation()}>
                <PopupHeader>
                    <CloseButton onClick={onClose}>
                        <Icons.Close sx={{ fontSize: 16, color: '#fff' }} />
                    </CloseButton>
                    <PopupTitle>{expense.description}</PopupTitle>
                </PopupHeader>

                <PopupContent>
                    <PopupPriceSection>
                        <PriceLabel>{t('totalAmount')}</PriceLabel>
                        <PriceValue>{formatMoney(expense.amount)}</PriceValue>
                    </PopupPriceSection>

                {photos.length > 0 && (
                    <Box>
                        <PhotosLabel>{t('photos')}</PhotosLabel>
                        <PhotosSection>
                            {photos.map((photo, index) => (
                                <PhotoThumb
                                    key={index}
                                    src={photo}
                                    onClick={() => onOpenPhoto(photos, index)}
                                />
                            ))}
                        </PhotosSection>
                    </Box>
                )}
                </PopupContent>

                <PopupActions>
                    <PopupButton variant="edit" onClick={() => onEdit(expense)}>
                        <Icons.Edit sx={{ fontSize: 16 }} />
                        {t('edit')}
                    </PopupButton>

                    <PopupButton variant="delete" onClick={onDelete}>
                        <Icons.Delete sx={{ fontSize: 16 }} />
                        {t('delete')}
                    </PopupButton>
                </PopupActions>
            </PopupCard>
        </PopupOverlay>
    )
}