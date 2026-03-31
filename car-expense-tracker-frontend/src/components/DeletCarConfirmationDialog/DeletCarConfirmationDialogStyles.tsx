import styled from '@emotion/styled'
import { Button } from '@mui/material'

export const ButtonCancel = styled(Button)`
    padding: 0.75rem 1.25rem;
    border-radius: 35px;
    font-size: 0.9375rem;
    font-weight: 500;
    text-transform: none;
    color: #1d1d1f;
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
    color: white;
    background-color: #ff3b30;
    transition: all 0.2s ease;

    &:hover {
        background-color: #e5342b;
    }

    &:active {
        transform: scale(0.97);
    }
`
