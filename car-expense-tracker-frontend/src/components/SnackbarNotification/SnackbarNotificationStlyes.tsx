import React from 'react';
import styled from '@emotion/styled';
import { Snackbar, Alert, Backdrop } from '@mui/material';
import { flex } from '../../mixins/setFlex';
import { size } from '../../mixins/setSize';
import { GeneralColors } from '../../constants/GeneralColors';

export const BackdropStyled = styled(Backdrop)`
    z-index: 1301;
    color: ${GeneralColors.white};
    background-color: ${GeneralColors.black};
`;

export const SnackbarStyled = styled(Snackbar)`
    height: 90%;
`;

export const  AlertStyled = styled(Alert)`
    ${flex('column','center','center')}
    ${size('8rem','100%')}
    border: 3px solid ${GeneralColors.grey}; 
    background-color: ${GeneralColors.white}; 
`;