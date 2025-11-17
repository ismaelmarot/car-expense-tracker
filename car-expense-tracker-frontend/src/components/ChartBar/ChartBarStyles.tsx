import React from 'react';
import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';

export const Container = styled(Grid)`
    margin-top: .5rem;
    padding-top: 1rem;
    background-color: white;
`;

export const GridBar = styled(Grid)`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: white;
`;

export const BarStyled = styled(Bar)`
    width: 100%;
    margin: 0 1rem 2rem;
    border: 3px solid rgba(228,232,236,1);
`;

export const TypographyStyled = styled(Typography)`
    font-weight: bold;
`;