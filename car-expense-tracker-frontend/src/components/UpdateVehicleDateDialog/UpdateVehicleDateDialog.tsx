import React from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { useLanguage } from '@/contexts'
import { UpdateVehicleDateDialogProps } from '@/interfaces'
import {
    StyledDialog,
    Content,
    IconWrapper,
    Title,
    Description,
    Actions,
    ButtonCancel,
    ButtonConfirm
} from './UpdateVehicleDateDialog.styles'

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
        <StyledDialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
        <Content>
            <IconWrapper>
                <CalendarMonthIcon sx={{ fontSize: 32, color: '#0071e3' }} />
            </IconWrapper>

            <Title>
                {t('updateVehicleDate')} {label}?
            </Title>

            <Description>
                {t('updateVehicleDateDesc')} {label}: <strong>{formattedDate}</strong>
            </Description>
        </Content>

        <Actions>
            <ButtonCancel onClick={onCancel} fullWidth>
                {t('no')}
            </ButtonCancel>

            <ButtonConfirm onClick={onConfirm} fullWidth>
                {t('yes')}
            </ButtonConfirm>
        </Actions>
        </StyledDialog>
    )
}