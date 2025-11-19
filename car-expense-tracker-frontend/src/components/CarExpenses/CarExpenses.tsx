import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { getCarExpenses, deleteExpense, updateExpense } from '../../api/api';
import { useParams } from 'react-router-dom';
import { formatDate } from '../../functions/formatDate';
import { formatNumberWithCommas } from '../../functions/formatNumberWithCommas';
import { formatNumberByThousands } from '../../functions/formatNumbersByThousands';
import { ExpenseInterface } from '../../interfaces/ExpenseInterface';
import EditExpenseDialog from '../EditExpenseDialog/EditExpenseDialog';
import ExpenseTable from '../ExpenseTable/ExpenseTable';
import { GridTotalAmount, TotalAmount } from './CarExpensesStyles';
import { formatCategory } from '../../functions/FormatCategory';

const CarExpenses: React.FC = () => {
    const { id } = useParams();
    const [expenses, setExpenses] = useState<ExpenseInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [editExpense, setEditExpense] = useState<ExpenseInterface | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const data = await getCarExpenses(Number(id));
                const sortedData = data.sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) => {
                    const dateA = new Date(a.date).getTime();
                    const dateB = new Date(b.date).getTime();
                    return dateB - dateA;
                });

                setExpenses(sortedData);
                setLoading(false);
            } catch (err) {
                setError("Hubo un error al cargar los gastos.");
                setLoading(false);
            }
        }
        fetchExpenses();
    }, [id]);

    const handleDelete = async (expenseId: number) => {
        try {
            deleteExpense(expenseId);
            setExpenses(expenses.filter(expense => expense.id !== expenseId));
        } catch (err) {
            setError("Hubo un error al eliminar el gasto.");
        }
    };

    const handleEdit = (expense: ExpenseInterface) => {
        setEditExpense(expense);
        setOpen(true);
    };

    const handleClose = () => {
        setEditExpense(null);
        setOpen(false);
    }

    const handleSave = async () => {
        if (!editExpense) return;
        try {
            await updateExpense(editExpense.id, editExpense);
            setExpenses(prevExpenses => {
                const updatedExpenses = prevExpenses.map(exp =>
                    exp.id === editExpense.id ? editExpense : exp
                );
                return updatedExpenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            });
            handleClose();
            setEditExpense(null);
        } catch (err) {
            setError("Hubo un error al guardar los cambios.");
        }
    };
    
    const handleChange = (field: keyof ExpenseInterface, value: string | number) => {
        if (!editExpense) return;
        setEditExpense({ ...editExpense, [field]: value });
    };

    const totalSpent = expenses.reduce((total, expense) => total + expense.price, 0);

    if (loading) return <Typography variant='h6'>Cargando gastos...</Typography>;

    if (error) return <Typography variant='h6' color='error'>{error}</Typography>;

    function renderTotalAmount() {
        return (
            <GridTotalAmount>
                <TotalAmount>
                    Total: $ { formatNumberWithCommas(totalSpent) }
                </TotalAmount>
            </GridTotalAmount>
        )
    };

    const mappedExpenses = expenses.map(expense => ({
        ...expense,
        category: formatCategory(expense.category)
    }));

    return (
        <Box>
            { renderTotalAmount() }
            <ExpenseTable
                expenses={mappedExpenses}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                formatNumberByThousands={formatNumberByThousands}
                formatNumberWithCommas={formatNumberWithCommas}
                formatDate={formatDate}
            />
            <EditExpenseDialog
                open={open}
                expense={editExpense}
                error={error}
                onClose={handleClose}
                onSave={handleSave}
                onChange={handleChange}
            />
        </Box>
    )
}

export default CarExpenses;
