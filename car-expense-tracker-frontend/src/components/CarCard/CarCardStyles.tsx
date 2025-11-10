import React from 'react';
import styled from '@emotion/styled';
import { Card, Typography } from '@mui/material';
import { size } from '../../helpers/setSize';

export const CardStyled = styled(Card)`
    ${size('100%', '100%')}
    transition: font-size 0.3s ease;
    &:hover {
        color: rgba(37,100,235,1);
    }
`;

export const CarType = styled(Typography)`
    margin: 1rem 0;
    font-weight: bold;
    font-size: 2.5rem;
`;

export const CarInfo = styled(Typography)`
    font-size: 1.3rem;
`;
