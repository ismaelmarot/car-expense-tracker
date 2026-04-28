import styled from '@emotion/styled'
import { Button } from '@mui/material'
import { GeneralColors } from '../../constants/GeneralColors'

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