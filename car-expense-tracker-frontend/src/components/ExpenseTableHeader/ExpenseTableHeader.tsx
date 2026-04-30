import { TableRow, TableCell } from '@mui/material'
import { ExpenseTableHeaderInterface } from '@/interfaces'
import { TableHeadStyled } from './ExpenseTableHead.styles'

export const ExpenseTableHeader = ({ headers }: { headers: ExpenseTableHeaderInterface[] }) => {
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
}