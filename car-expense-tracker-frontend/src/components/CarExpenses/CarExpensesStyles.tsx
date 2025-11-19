import React from 'react';
import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
import { GeneralColors } from '../../constants/GeneralColors';
import { flex } from '../../mixins/setFlex';

export const GridTotalAmount = styled(Grid)`
    ${flex('row', 'center', 'center')}
`;
export const TotalAmount = styled(Typography)`
    ${flex('row', 'center', 'flex-end')}
    width: 100%;
    padding: .3rem 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    color:${GeneralColors.white};
    background-color: ${GeneralColors.black};
`;
