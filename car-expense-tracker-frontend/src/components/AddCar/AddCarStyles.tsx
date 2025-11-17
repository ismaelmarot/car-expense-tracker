import React from 'react';
import styled from '@emotion/styled';
import { Button, Grid, TextField, Typography } from '@mui/material';

export const Container = styled(Grid)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 .5rem;
`;

export const Title = styled(Typography)`
    font-size: 2rem;
    margin-bottom: 1rem;
`;

export const FormGrid = styled(Grid)`
    padding-top: 2rem;
    background-color: rgba(228,232,236,1);
    border-radius: 5px;
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
    background-color: rgba(255, 255, 255,1);
`;