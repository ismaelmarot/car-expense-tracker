import React from 'react';
import styled from '@emotion/styled';
import { Table, TableRow, TableCell, TableContainer } from '@mui/material';
import { GeneralColors } from '../../constants/GeneralColors';


export const TableCellRight = styled(TableCell)`
    text-align: right;
`;

export const TableContainerStyled = styled(TableContainer)`
    max-height: 20rem;
    margin-right: 2px;
    box-sizing: border-box;
    border: 3px solid rgba(228,232,236,1);
    border-radius: 3px;
    background-color: white;
`;

export const TableStyled = styled(Table)`
    min-width: 650;
    width: 100%;
`;

export const TableRowStyled = styled(TableRow)`
    border: 1px solid ${GeneralColors.grey}
`;