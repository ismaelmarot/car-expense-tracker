import React from 'react';
import styled from '@emotion/styled';
import { Button, Typography, DialogActions, DialogContent, TextField, FormControl, InputLabel } from '@mui/material';

export const TypographyError = styled(Typography)`
    margin-bottom: 1rem;
`;

export const DialogActionsStyled = styled(DialogActions)`
    margin-top: 1rem;
`;

export const ButtonSave = styled(Button)`
    color: rgba(255, 255, 255,1);
    background-color:rgba(24,118,208,1);
`;

export const DialogContentStyled = styled(DialogContent)`
    padding-top: 1rem !important;
`;

export const TextFieldStyled = styled(TextField)`
    margin-bottom: 1rem;
    width: 100%;
`;

export const FormControlStyled = styled(FormControl)`
    width: 100%;
    margin-bottom: 1rem;
`;

export const InputLabelStyled = styled(InputLabel)`
    padding: 0 3px;
    background-color: rgba(255, 255, 255, 1);
`;