import React from 'react';
import styled from '@emotion/styled';
import { Table, TableRow, TableCell, TableContainer } from '@mui/material';
import { GeneralColors } from '../../constants/GeneralColors';


export const TableContainerStyled = styled(TableContainer)`
    max-height: 55vh;
    box-sizing: border-box;
    border-radius: 3px;
    border: 3px solid ${GeneralColors.grey};
    background-color: ${GeneralColors.white};
`;

export const TableCellRight = styled(TableCell)`
    text-align: right;
`;

export const TableStyled = styled(Table)`
    min-width: 650;
    width: 100%;
`;

export const TableRowStyled = styled(TableRow)`
    border: 1px solid ${GeneralColors.grey}
`;