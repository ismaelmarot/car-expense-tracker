import React from 'react';
import styled from '@emotion/styled';
import { Button, FormControl, Select, Grid, TextField, Typography } from '@mui/material';

export const GridContainer = styled(Grid)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`;

export const GridTable = styled(Grid)`
    display: flex;
    justify-content: center;
    margin-top: 1rem;
`;

export const GridTitle = styled(Typography)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.3rem;
    border-radius: 3px;
    font-size: 1.5rem;
    font-weight: bold;
    color:rgba(36,99,235,1);
    background-color:rgba(166,201,238,1);
`;

export const FormStyled = styled('form')`
    border: 3px solid rgba(228,232,236,1);
    border-radius: 3px;
    padding: 2rem 1rem;
    background-color: rgba(228,232,236,1);
    
`;

export const TextFieldStyled = styled(TextField)`
    width: 100%;
    border-radius: 5px;
    background-color: white;
`;

export const GridTextFieldLarge = styled(Grid)`
    margin-bottom: 1rem;
    padding: 0%.3rem;
`;

export const GridTextFieldShort = styled(GridTextFieldLarge)`
    padding: .3rem;
`;

export const GridButtonAddExpense = styled(Grid)`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 1rem;
`;

export const ButtonAddStyled = styled(Button)`
    padding: 1rem 2rem 1rem 1.5rem;
    color: white;
    background-color: rgba(24,118,209,1);
`;

export const ErrorTypography = styled(Typography)`
    margin-top: 1rem;
`;

export const AddExpenseTypography = styled(Typography)`
    margin-left: .5rem;
`;

export const FormControlStyled = styled(FormControl)`
    background-color: white;
`;

export const SelectStyled = styled(Select)`
    text-align: left;
`;