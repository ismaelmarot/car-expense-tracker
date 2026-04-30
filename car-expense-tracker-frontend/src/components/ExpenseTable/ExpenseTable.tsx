import React from 'react'
import { TableBody, TableCell, Typography } from '@mui/material'
import { headers } from '@/constants'
import { ExpenseTableInterface } from '@/interfaces'
import { ExpenseActionButtons, ExpenseTableHeader } from '@/components'
import {
    TableCellRight,
    TableContainerStyled,
    TableRowStyled,
    TableStyled
} from './ExpenseTable.styles'

export const ExpenseTable: React.FC<ExpenseTableInterface> =({
    expenses,
    handleEdit,
    handleDelete,
    formatNumberByThousands,
    formatMoney,
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
                                {formatMoney(expense.amount)}
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
}