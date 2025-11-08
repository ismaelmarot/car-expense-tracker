import React from 'react';
import styled from '@emotion/styled';
import { Grid, Box, Button } from '@mui/material';

export const BoxStyled = styled(Box)`
    display:flex;
    justify-content:center;
    align-items: center;
    height: 100vh;
`;

export const GridCarDetails = styled(Grid)`
    display: flex;
    justify-content: senter;
    margin: 0 .5rem;
    background-color:rgba(228,232,237,1);
`;

export const GridDeleteCarIcon = styled(Grid)`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    padding: 0 .5rem 0 1rem;
`;

export const ButtonDeleteCar = styled(Button)`
    background-color: rgba(211, 47, 47 , 1);
`;
