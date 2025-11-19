import React from 'react';
import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
import { GeneralColors } from '../../constants/GeneralColors';
import { flex } from '../../mixins/setFlex';
import { size } from '../../mixins/setSize';

export const Container = styled(Grid)`
    margin-top: .5rem;
    padding-top: 1rem;
    background-color: ${GeneralColors.white};
`;

export const GridPieChart = styled(Grid)`
    ${flex('column','center','center')}
    ${size('90%','22rem')}
    margin: 0 1rem 2rem;
    background-color: ${GeneralColors.white};
`;

export const TypographyStyled = styled(Typography)`
    font-weight: bold;
`;