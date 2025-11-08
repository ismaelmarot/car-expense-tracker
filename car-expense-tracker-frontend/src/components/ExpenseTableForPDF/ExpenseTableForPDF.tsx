import React from 'react';
import { formatNumberWithCommas } from '../../functions/formatNumberWithCommas';
import { formatDate } from '../../functions/formatDate';
import { ExpenseTableForPDFInterface } from '../../interfaces/ExpenseTableForPDFInterface';
import { ThStyled, TdStyled, TdStyledRight, TableStyled } from './ExpenseTableForPDFStyles';

const ExpenseTableForPDF: React.FC<ExpenseTableForPDFInterface> = ({ expenses }) => {
    return (
        <>
        {expenses.length > 0 ? (
            <TableStyled>
                <thead>
                    <tr>
                        <ThStyled>Descripción</ThStyled>
                        <ThStyled>Categoría</ThStyled>
                        <ThStyled>Kilómetros</ThStyled>
                        <ThStyled>Monto $</ThStyled>
                        <ThStyled>Fecha</ThStyled>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense, index) => (
                        <tr key={index}>
                            <TdStyled>{expense.description}</TdStyled>
                            <TdStyledRight>{expense.category}</TdStyledRight>
                            <TdStyledRight>{expense.kilometers}</TdStyledRight>
                            <TdStyledRight>{formatNumberWithCommas(expense.price)}</TdStyledRight>
                            <TdStyledRight>{formatDate(expense.date)}</TdStyledRight>
                        </tr>
                    ))}
                </tbody>
            </TableStyled>
            ) : (
            <p>No hay gastos para mostrar.</p>
        )}
        </>
    );
};
  
export default ExpenseTableForPDF;