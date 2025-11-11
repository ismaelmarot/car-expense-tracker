import React from 'react';
import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
import { flex } from '../../helpers/setFlex';
import { size } from '../../helpers/setSize';

export const Container = styled(Grid)`
    margin: .3rem 0 1rem;
    padding-top: 1rem;
    background-color: white;
`;

export const GridPieChart = styled(Grid)`
    ${flex('column', 'center', 'center')}
    ${size('100%', '30rem')}
    background-color: white;
`;

export const TypographyStyled = styled(Typography)`
    font-weight: bold;
`;