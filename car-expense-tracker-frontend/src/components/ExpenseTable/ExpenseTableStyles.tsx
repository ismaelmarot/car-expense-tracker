import React from 'react';
import styled from '@emotion/styled';
import { Table, TableCell, TableContainer, TableRow } from '@mui/material';
import { GeneralColors } from '../../constants/GeneralColors';

export const TableCellRight = styled(TableCell)`
    text-align: right;
`;

export const TableContainerStyled = styled(TableContainer)`
    height: 100%;
    box-sizing: border-box;
    border: 3px solid ${GeneralColors.grey};
    border-radius: 3px;
    background-color: ${GeneralColors.white};
`;

export const TableStyled = styled(Table)`
    min-width: 650px;
    width: 100%;
`;

export const TableRowStyled = styled.tr`
    border: 2px solid ${GeneralColors.grey};
`;