import React from 'react';
import styled from '@emotion/styled';
import { Card, Typography } from '@mui/material';
import { size } from '../../helpers/setSize';
import { GeneralColors } from '../../constants/GeneralColors';

export const CardStyled = styled(Card)`
    ${size('100%', '100%')}
    transition: font-size 0.3s ease;
    &:hover {
        color: ${GeneralColors.blue};
    }
`;

export const CarType = styled(Typography)`
    margin: 1rem 0;
    font-weight: bold;
    font-size: 2.5rem;
`;

export const CarInfo = styled(Typography)`
    font-size: 1.3rem;
    margin-top: .5rem;
`;
