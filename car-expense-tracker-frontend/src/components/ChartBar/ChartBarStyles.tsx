import React from 'react';
import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { flex } from '../../mixins/setFlex';
import { GeneralColors } from '../../constants/GeneralColors';

export const Container = styled(Grid)`
    margin-top: .5rem;
    padding-top: 1rem;
    background-color: ${GeneralColors.white};
`;

export const GridBar = styled(Grid)`
    ${flex('column','center','center')}
    width: 100%;
    background-color: ${GeneralColors.white}
`;

export const BarStyled = styled(Bar)`
    width: 100%;
    margin: 0 1rem 2rem;
    border: 3px solid ${GeneralColors.grey};
`;

export const TypographyStyled = styled(Typography)`
    font-weight: bold;
`;