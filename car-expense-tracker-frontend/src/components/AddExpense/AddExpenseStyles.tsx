import React from 'react';
import styled from '@emotion/styled';
import { Button, FormControl, Select, Grid, TextField, Typography } from '@mui/material';
import { GeneralColors } from '../../constants/GeneralColors';
import { flex } from '../../helpers/setFlex';

export const GridContainer = styled(Grid)`
    ${flex('column', 'center', 'center')}
    width: 100%;
    margin-top: .1rem;
`;

export const GridTitle = styled(Typography)`
    ${flex('row', 'center', 'center')}
    width: 100%;
    padding: 0.3rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: ${GeneralColors.white};
    background-color: ${GeneralColors.black};
`;

export const GridTable = styled(Grid)`
    ${flex('column', 'center', 'center')}
    margin-top: 1rem;
`;

export const FormStyled = styled('form')`
    border-radius: 3px;
    padding: 3rem 2rem;
    background-color: ${GeneralColors.grey};
`;

export const TextFieldStyled = styled(TextField)`
    width: 100%;
    border-radius: 5px;
    background-color: ${GeneralColors.white};
`;

export const GridTextFieldLarge = styled(Grid)`
    margin-bottom: 1rem;
    padding: 0%.3rem;
`;

export const GridTextFieldShort = styled(GridTextFieldLarge)`
    padding: .3rem;
`;

export const GridButtonAddExpense = styled(Grid)`
    ${flex('row', 'center', 'center')}
    width: 100%;
    margin-top: 1rem;
`;

export const ButtonAddStyled = styled(Button)`
    padding: 1rem 2rem 1rem 1.5rem;
    color: ${GeneralColors.white};
    background-color: ${GeneralColors.lightBlue};
`;

export const ErrorTypography = styled(Typography)`
    margin-top: 1rem;
`;

export const AddExpenseTypography = styled(Typography)`
    margin-left: .5rem;
`;

export const FormControlStyled = styled(FormControl)`
    background-color: ${GeneralColors.white};
`;

export const SelectStyled = styled(Select)`
    text-align: left;
`;