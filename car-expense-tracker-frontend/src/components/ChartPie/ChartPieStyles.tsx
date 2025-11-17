import React from 'react';
import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';

export const Container = styled(Grid)`
    margin-top: .5rem;
    padding-top: 1rem;
    background-color: white;
`;

export const GridPieChart = styled(Grid)`
    display: flex;
    justify-content: center;
    height: 22rem;
    width: 90%;
    margin: 0 1rem 2rem;
    background-color: white;
`;

export const TypographyStyled = styled(Typography)`
    font-weight: bold;
`;