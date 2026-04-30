import styled from '@emotion/styled';
import { Button, Typography, DialogActions, DialogContent, TextField, FormControl, InputLabel } from '@mui/material';
import { GeneralColors } from '../../constants/GeneralColors';

export const TypographyError = styled(Typography)`
    margin-bottom: 1rem;
`;

export const DialogActionsStyled = styled(DialogActions)`
    margin-top: 1rem;
`;

export const ButtonSave = styled(Button)`
    color: ${GeneralColors.white};
    background-color: ${GeneralColors.blue};
    border-radius: 35px;
    padding: 8px 19px;
`;

export const DialogContentStyled = styled(DialogContent)`
    padding-top: 1rem !important;
`;

export const TextFieldStyled = styled(TextField)`
    width: 100%;
    margin-bottom: 1rem;
    
    & .MuiOutlinedInput-root {
        border-radius: 35px;
    }
`;

export const FormControlStyled = styled(FormControl)`
    width: 100%;
    margin-bottom: 1rem;
    & .MuiOutlinedInput-root {
        border-radius: 35px;
    }
`;

export const InputLabelStyled = styled(InputLabel)`
    padding: 0 3px;
    background-color: ${GeneralColors.white};
`;