import React from 'react';
import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { flex } from '../../helpers/setFlex'

export const Container = styled(Grid)`
    padding-top: 1rem;
    background-color: white;
`;

export const GridBar = styled(Grid)`
    ${flex('column','center','center')}
    background-color: white;
`;

export const BarStyled = styled(Bar)`
    margin: 1rem;
    border: 3px solid rgba(228,232,236,1);
`;

export const TypographyStyled = styled(Typography)`
    font-weight: bold;
`;