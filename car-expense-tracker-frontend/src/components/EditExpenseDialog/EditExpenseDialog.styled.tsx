import styled from '@emotion/styled'
import { Button, Typography, DialogActions, DialogContent } from '@mui/material'
import { GeneralColors } from '@/constants'

export const TypographyError = styled(Typography)`
    margin-bottom: 1rem;
`

export const DialogActionsStyled = styled(DialogActions)`
    margin-top: 1rem;
`

export const ButtonSave = styled(Button)`
    color: ${GeneralColors.white};
    background-color: ${GeneralColors.blue};
    border-radius: 35px;
    padding: 8px 19px;
`

export const DialogContentStyled = styled(DialogContent)`
    padding-top: 1rem !important;
`
export const dialogPaperStyles = {
    borderRadius: '20px',
    padding: '0.5rem',
    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
    maxWidth: 400,
    width: '100%',
}