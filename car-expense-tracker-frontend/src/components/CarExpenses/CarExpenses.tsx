import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { getCarExpenses, deleteExpense, updateExpense } from '../../api/api';
import { useParams } from 'react-router-dom';
import { formatDate } from '../../functions/formatDate';
import { formatNumberWithCommas } from '../../functions/formatNumberWithCommas';
import { formatNumberByThousands } from '../../functions/formatNumbersByThousands';
import { ExpenseInterface } from '../../interfaces/ExpenseInterface';
import EditExpenseDialog from '../EditExpenseDialog/EditExpenseDialog';
import { 
  Container, 
  TotalCard, 
  TotalLabel, 
  TotalAmountNew, 
  ExpenseList, 
  TableHeader,
  HeaderCell,
  ExpenseItem, 
  ExpenseName,
  ExpenseDate,
  ExpenseKm,
  ExpenseCategory,
  ExpensePrice,
  MobileDate,
  EmptyState,
  EmptyIcon,
  EmptyText,
  PopupOverlay,
  PopupCard,
  PopupHeader,
  PopupTitle,
  PopupContent,
  DetailRow,
  DetailLabel,
  DetailValue,
  CategoryBadge,
  PopupActions,
  PopupButton,
  CloseButton,
  PopupPriceSection,
  PriceLabel,
  PriceValue
} from './CarExpensesStyles';
import { formatCategory } from '../../functions/FormatCategory';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import DeleteCarConfirmationDialog from '../DeletCarConfirmationDialog/DeletCarConfirmationDialog';

const CarExpenses: React.FC = () => {
    const { id } = useParams();
    const [expenses, setExpenses] = useState<ExpenseInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [editExpense, setEditExpense] = useState<ExpenseInterface | null>(null);
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    const [selectedExpense, setSelectedExpense] = useState<ExpenseInterface | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const data = await getCarExpenses(Number(id));
                const sortedData = data.sort((a: any, b: any) => {
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
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
            setShowPopup(false);
            setSelectedExpense(null);
            setShowDeleteConfirm(false);
        } catch (err) {
            setError("Hubo un error al eliminar el gasto.");
        }
    };

    const handleEdit = (expense: ExpenseInterface) => {
        setEditExpense(expense);
        setOpenEditDialog(true);
        setShowPopup(false);
    };

    const handleCloseEdit = () => {
        setEditExpense(null);
        setOpenEditDialog(false);
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
            if (selectedExpense && selectedExpense.id === editExpense.id) {
                setSelectedExpense(editExpense);
            }
            handleCloseEdit();
        } catch (err) {
            setError("Hubo un error al guardar los cambios.");
        }
    };
    
    const handleChange = (field: keyof ExpenseInterface, value: string | number) => {
        if (!editExpense) return;
        setEditExpense({ ...editExpense, [field]: value });
    };

    const handleItemClick = (expense: ExpenseInterface) => {
        setSelectedExpense(expense);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedExpense(null);
    };

    const totalSpent = expenses.reduce((total, expense) => total + expense.price, 0);

    if (loading) return (
        <Container>
            <Typography variant='h6' sx={{ textAlign: 'center', color: '#86868b' }}>Cargando gastos...</Typography>
        </Container>
    );

    if (error) return (
        <Container>
            <Typography variant='h6' color='error' sx={{ textAlign: 'center' }}>{error}</Typography>
        </Container>
    );

    return (
        <Container>
            <TotalCard>
                <TotalLabel>Total gastado</TotalLabel>
                <TotalAmountNew>$ {formatNumberWithCommas(totalSpent)}</TotalAmountNew>
            </TotalCard>
            
            {expenses.length === 0 ? (
                <EmptyState>
                    <EmptyIcon>📋</EmptyIcon>
                    <EmptyText>No hay gastos registrados para este vehículo.</EmptyText>
                </EmptyState>
            ) : (
                <ExpenseList>
                    <TableHeader>
                        <HeaderCell>Descripción</HeaderCell>
                        <HeaderCell>Km</HeaderCell>
                        <HeaderCell>Categoría</HeaderCell>
                        <HeaderCell>Fecha</HeaderCell>
                        <HeaderCell>$</HeaderCell>
                    </TableHeader>
                    {expenses.map((expense) => (
                        <ExpenseItem key={expense.id} onClick={() => handleItemClick(expense)}>
                            <ExpenseName>{expense.description}</ExpenseName>
                            <MobileDate>{formatDate(expense.date)}</MobileDate>
                            <ExpenseKm>{formatNumberByThousands(expense.kilometers)}</ExpenseKm>
                            <ExpenseCategory>
                                <CategoryBadge category={formatCategory(expense.category)}>
                                    {formatCategory(expense.category)}
                                </CategoryBadge>
                            </ExpenseCategory>
                            <ExpenseDate>{formatDate(expense.date)}</ExpenseDate>
                            <ExpensePrice>{formatNumberWithCommas(expense.price)}</ExpensePrice>
                        </ExpenseItem>
                    ))}
                </ExpenseList>
            )}
            
            {showPopup && selectedExpense && (
                <PopupOverlay onClick={handleClosePopup}>
                    <PopupCard onClick={(e: any) => e.stopPropagation()}>
                        <PopupHeader>
                            <CloseButton onClick={handleClosePopup}>
                                <CloseIcon sx={{ fontSize: 16, color: '#fff' }} />
                            </CloseButton>
                            <PopupTitle>{selectedExpense.description}</PopupTitle>
                        </PopupHeader>
                        <PopupContent>
                            <PopupPriceSection>
                                <PriceLabel>Monto total</PriceLabel>
                                <PriceValue>$ {formatNumberWithCommas(selectedExpense.price)}</PriceValue>
                            </PopupPriceSection>
                            <DetailRow>
                                <DetailLabel>Fecha</DetailLabel>
                                <DetailValue>{formatDate(selectedExpense.date)}</DetailValue>
                            </DetailRow>
                            <DetailRow>
                                <DetailLabel>Kilómetros</DetailLabel>
                                <DetailValue>{formatNumberByThousands(selectedExpense.kilometers)} km</DetailValue>
                            </DetailRow>
                            <DetailRow>
                                <DetailLabel>Categoría</DetailLabel>
                                <CategoryBadge category={formatCategory(selectedExpense.category)}>
                                    {formatCategory(selectedExpense.category)}
                                </CategoryBadge>
                            </DetailRow>
                        </PopupContent>
                        <PopupActions>
                            <PopupButton variant="edit" onClick={() => handleEdit(selectedExpense)}>
                                <EditIcon sx={{ fontSize: 16 }} />
                                Editar
                            </PopupButton>
                            <PopupButton variant="delete" onClick={() => setShowDeleteConfirm(true)}>
                                <DeleteIcon sx={{ fontSize: 16 }} />
                                Eliminar
                            </PopupButton>
                        </PopupActions>
                    </PopupCard>
                </PopupOverlay>
            )}
            
            <EditExpenseDialog
                open={openEditDialog}
                expense={editExpense}
                error={error}
                onClose={handleCloseEdit}
                onSave={handleSave}
                onChange={handleChange}
            />
            
            <DeleteCarConfirmationDialog
                open={showDeleteConfirm}
                title="Eliminar gasto"
                description={`¿Estás seguro de que deseas eliminar "${selectedExpense?.description}"? Esta acción no se puede deshacer.`}
                onConfirm={() => selectedExpense && handleDelete(selectedExpense.id)}
                onCancel={() => setShowDeleteConfirm(false)}
            />
        </Container>
    )
}

export default CarExpenses;
