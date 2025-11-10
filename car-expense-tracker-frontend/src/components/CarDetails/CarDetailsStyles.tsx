import React from 'react';
import styled from '@emotion/styled';
import { Grid, Box, Button } from '@mui/material';
import { flex } from '../../helpers/setFlex';
import { size } from '../../helpers/setSize';
import { GeneralColors } from '../../constants/GeneralColors';

export const BoxStyled = styled(Box)`
    ${flex('row','center','center')}
    ${size('100vh','auto')}
`;

export const GridCarDetails = styled(Grid)`
    ${flex('row','center','center')}
    margin: 0 .5rem;
    background-color: ${GeneralColors.grey};
`;

export const GridDeleteCarIcon = styled(Grid)`
    ${flex('row','center','flex-end')}
    width: 100%;
    padding: 0 .5rem 0 1rem;
`;

export const ButtonDeleteCar = styled(Button)`
    background-color: ${GeneralColors.red};
`;
