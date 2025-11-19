import React from 'react';
import styled from '@emotion/styled';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { flex } from '../../mixins/setFlex';
import { GeneralColors } from '../../constants/GeneralColors';

export const Container = styled(Grid)`
    ${flex('column', 'center', 'center')}
    padding: 0 .5rem;
`;

export const Title = styled(Typography)`
    font-size: 2rem;
    margin-bottom: 1rem;
`;

export const FormGrid = styled(Grid)`
    ${flex('column', 'center', 'center')}
    padding-top: 2rem;
    border-radius: 5px;
    background-color: ${GeneralColors.grey};
`;

export const ButtonStyled = styled(Button)`
    width: 50%;
    margin: 2rem;
    padding: 1rem 0;
`;

export const TextFieldStyled = styled(TextField)`
    width: 90%;
    margin: .5rem 0 .5rem;
    border-radius: 5px;
    background-color: ${GeneralColors.white};
`;