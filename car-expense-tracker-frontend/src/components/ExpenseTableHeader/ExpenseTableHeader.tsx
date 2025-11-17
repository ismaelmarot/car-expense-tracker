import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import { ExpenseTableHeaderInterface } from '../../interfaces/ExpenseTableHeaderInterface';
import { TableHeadStyled } from './ExpenseTableHeadStyles';

const ExpenseTableHeader = ({ headers }: { headers: ExpenseTableHeaderInterface[] }) => {
    return(
        <TableHeadStyled>
                <TableRow>
                    {headers.map((header, index) => (
                        <TableCell key={index} align={header.align || 'left'}>
                            <b>{header.label}</b>
                        </TableCell>
                    ))}
                </TableRow>
        </TableHeadStyled>
    )
};

export default ExpenseTableHeader;