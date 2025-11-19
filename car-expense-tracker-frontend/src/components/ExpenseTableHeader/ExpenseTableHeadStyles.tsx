import React from 'react';
import styled from '@emotion/styled';
import { TableHead } from '@mui/material';
import { GeneralColors } from '../../constants/GeneralColors';

export const TableHeadStyled = styled(TableHead)`
    position: sticky;
    top: 0;
    background-color: ${GeneralColors.grey};
    z-index: 1;
`;