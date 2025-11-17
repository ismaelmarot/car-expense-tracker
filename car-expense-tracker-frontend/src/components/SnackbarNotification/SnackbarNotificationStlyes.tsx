import React from 'react';
import styled from '@emotion/styled';
import { Snackbar, Alert, Backdrop } from '@mui/material';

export const BackdropStyled = styled(Backdrop)`
    z-index: 1301;
    color: rgba(255, 255, 255, 1);
    background-color: rgbaa(0, 0, 0, 0.5);
`;

export const SnackbarStyled = styled(Snackbar)`
    height: 90%;
`;

export const  AlertStyled = styled(Alert)`
    display: flex;
    align-items: center; 
    width: 100%;
    height: 8rem; 
    border: 3px solid grey; 
    background-color: white; 

`;