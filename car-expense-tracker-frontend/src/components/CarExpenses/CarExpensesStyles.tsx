import React from 'react';
import styled from '@emotion/styled';
import { Box, Grid, Typography } from '@mui/material';
import { flex } from '../../helpers/setFlex';
import { GeneralColors } from '../../constants/GeneralColors';

export const BoxCarExpenses = styled(Box)`
    height: 50vh;
    border: 3px solid red;
    padding: 0%.5rem;
`;

export const GridTotalAmount = styled(Grid)`
    ${flex('row', 'center', 'center')}
    margin-bottom: 1rem;
`;
export const TotalAmount = styled(Typography)`
    ${flex('row', 'center', 'flex-end')}
    width: 100%;
    border-radius: 3px;
    font-size: 1.5rem;
    font-weight: bold;
    padding: .3rem 1rem;
    color:${GeneralColors.white};
    background-color: ${GeneralColors.black};
`;
