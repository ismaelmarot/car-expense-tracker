import styled from '@emotion/styled'
import { FormControl, InputLabel, TextField } from '@mui/material'
import { GeneralColors } from '@/constants'

export const TextFieldStyled = styled(TextField)`
    width: 100%;
    margin-bottom: 1rem;
    
    & .MuiOutlinedInput-root {
        border-radius: 35px;
    }
`

export const FormControlStyled = styled(FormControl)`
    width: 100%;
    margin-bottom: 1rem;
    & .MuiOutlinedInput-root {
        border-radius: 35px;
    }
`

export const InputLabelStyled = styled(InputLabel)`
    padding: 0 3px;
    background-color: ${GeneralColors.white};
`