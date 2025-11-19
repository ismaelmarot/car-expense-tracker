import React from 'react';
import { ExpenseTableInterface } from '../../interfaces/ExpenseTableInterface';
import { TableBody, TableCell, Typography } from '@mui/material';
import { TableCellRight, TableContainerStyled, TableRowStyled, TableStyled } from './ExpenseTableStyles';
import ExpenseTableHeader from '../ExpenseTableHeader/ExpenseTableHeader';
import { headers } from '../../constants/ExpenseTableHeaders';
import ExpenseActionButtons from '../ExpenseActionButtons/ExpenseActionButtons';

const ExpenseTable: React.FC<ExpenseTableInterface> =({
    expenses,
    handleEdit,
    handleDelete,
    formatNumberByThousands,
    formatNumberWithCommas,
    formatDate,
}) => {
    if (expenses.length === 0) {
        return <Typography>No hay gastos registrados para este vehículo.</Typography>
    }

    return(
        <TableContainerStyled>
            <TableStyled aria-label='expenses table'>
                <ExpenseTableHeader headers={headers} />
                <TableBody>
                    {expenses.map((expense) => (
                        <TableRowStyled key={expense.id}>
                            <TableCell component='th' scope='row'>
                                {expense.description}
                            </TableCell>
                            <TableCellRight>
                                {expense.category}
                            </TableCellRight>
                            <TableCellRight>
                                {formatNumberByThousands(expense.kilometers)}
                            </TableCellRight>
                            <TableCellRight>
                                {formatNumberWithCommas(expense.price)}
                            </TableCellRight>
                            <TableCellRight>
                               {formatDate(expense.date)}
                            </TableCellRight>   
                            <ExpenseActionButtons
                                onEdit={() => handleEdit(expense)}
                                onDelete={() => handleDelete(expense.id)}
                            />
                        </TableRowStyled>
                    ))}
                </TableBody>
            </TableStyled>
        </TableContainerStyled>
    )
};

export default ExpenseTable;
