import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { GeneralColors } from '../../constants/GeneralColors';

export const ButtonCancel = styled(Button)`
    color: ${GeneralColors.blue};
`;

export const ButtonDelete = styled(Button)`
    color: ${GeneralColors.white};
    background-color: ${GeneralColors.red};
`;