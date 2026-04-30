import styled from '@emotion/styled'
import { Box, Button, Dialog, Typography } from '@mui/material'
import { GeneralColors, Icons } from '@/constants'
import { size } from '@/mixins'


export const ButtonCancel = styled(Button)`
    padding: 0.75rem 1.25rem;
    border-radius: 35px;
    font-size: 0.9375rem;
    font-weight: 500;
    text-transform: none;
    color: ${GeneralColors.blue};
    background: #f5f5f7;
    border: 1px solid rgba(0, 0, 0, 0.04);
    transition: all 0.2s ease;

    &:hover {
        background: #e8e8ed;
    }

    &:active {
        transform: scale(0.97);
    }
`

export const ButtonConfirm = styled(Button)`
    padding: 0.75rem 1.25rem;
    border-radius: 35px;
    font-size: 0.9375rem;
    font-weight: 500;
    text-transform: none;
    color: ${GeneralColors.white};
    background-color: ${GeneralColors.red};
    transition: all 0.2s ease;

    &:hover {
        background-color: #e5342b;
    }

    &:active {
        transform: scale(0.97);
    }
`

export const DialogStyled = styled(Dialog)`
    border-radius: 25px;
    padding: 0.5rem;
    overflow: visible;
`

export const DialogContentStyled = styled(Dialog)`
    display: flex;
    align-items: center;
    justify-content: center;
    ${size(64,64)}
    border-radius: 50%;
    background: linear-gradient(135deg, #fff5f5 0%, #ffe5e5 100%);
    margin: 0 auto 1.25rem;
    border: 1px solid #ffe5e5;
`

export const TitleStyled = styled(Typography)`
    font-size: 1.25rem;
    font-weight: 700;
    color: #1d1d1f;
`

export const DescriptionStyled = styled(Typography)`
    font-size: 0.9375rem;
    color: #86868b;
`

export const DeleteWarningStyled = styled(Typography)`
    font-size: 0.8125rem;
    color: #aeaeb2;
    line-height: 1.4;
`

export const BoxStyled = styled(Box)`
    display: flex;
    gap: 0.75rem;
`

export const IconWarningStyled = styled(Icons.Warning)`
    font-size: 32;
    color: #ff3b30;
`