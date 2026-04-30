import React, { useState } from 'react'
import { Typography, Box } from '@mui/material'
import { useLanguage } from '@/contexts'
import { Icons } from '@/constants'
import { ExpenseInterface } from '@/interfaces'
import { formatCategory, formatDate, formatMoney, formatNumberByThousands } from '@/functions'
import { EditExpenseDialog, DeleteCarConfirmationDialog, ExpenseDetailModal } from '@/components'
import { useCarExpenses } from './useCarExpenses'

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
    EmptyText,
    CategoryBadge,
    SortIndicator,
} from './CarExpenses.styles'

export const CarExpenses: React.FC = () => {
    const { t } = useLanguage()

    const {
        sortedExpenses,
        loading,
        error,
        totalSpent,
        sortBy,
        sortOrder,
        handleSort,
        handleDelete,
        handleUpdate,
        setError
    } = useCarExpenses()

    const [editExpense, setEditExpense] = useState<ExpenseInterface | null>(null)
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [selectedExpense, setSelectedExpense] = useState<ExpenseInterface | null>(null)
    const [showPopup, setShowPopup] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    const [photoViewerOpen, setPhotoViewerOpen] = useState(false)
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
    const [viewerPhotos, setViewerPhotos] = useState<string[]>([])
    const [photoZoom, setPhotoZoom] = useState(false)

    const handleItemClick = (expense: ExpenseInterface) => {
        const expenseWithPhotos = {
        ...expense,
        photos: typeof expense.photos === 'string'
            ? JSON.parse(expense.photos || '[]')
            : (expense.photos || [])
        }
        setSelectedExpense(expenseWithPhotos)
        setShowPopup(true)
    }

    const handleEdit = (expense: ExpenseInterface) => {
        setEditExpense(expense)
        setOpenEditDialog(true)
        setShowPopup(false)
    }

    const handleSave = async () => {
        if (!editExpense) return
        await handleUpdate(editExpense)

        if (selectedExpense?.id === editExpense.id) {
            setSelectedExpense(editExpense)
        }

        setOpenEditDialog(false)
        setEditExpense(null)
    }

    const handleClosePopup = () => {
        setShowPopup(false)
        setSelectedExpense(null)
    }

    

    

const openPhotoViewer = (photos: string[], index: number, e?: React.MouseEvent) => {
        setViewerPhotos(photos)
        setCurrentPhotoIndex(index)
        setPhotoViewerOpen(true)
    }

    if (loading) return (
        <Container>
            <Typography variant='h6' sx={{ textAlign: 'center', color: '#86868b' }}>
                {t('loadingExpenses')}
            </Typography>
            
            {/* Photo Viewer Full Screen */}
            {photoViewerOpen && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.95)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }} 
                    onClick={() => setPhotoViewerOpen(false)}
                >
                    <img 
                        src={viewerPhotos[currentPhotoIndex]} 
                        style={{
                            maxWidth: '95vw',
                            maxHeight: '95vh',
                            objectFit: 'contain'
                        }}
                        alt="Full size"
                        onClick={(e) => e.stopPropagation()}
                    />
                    {viewerPhotos.length > 1 && (
                        <>
                            <button 
                                onClick={(e) => { 
                                    e.stopPropagation(); 
                                    setCurrentPhotoIndex((prev) => Math.max(0, prev - 1)); 
                                }}
                                style={{
                                    position: 'absolute',
                                    left: '20px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'rgba(255,255,255,0.2)',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '40px',
                                    padding: '10px 15px',
                                    cursor: 'pointer',
                                    borderRadius: '5px'
                                }}
                            >‹</button>
                            <button 
                                onClick={(e) => { 
                                    e.stopPropagation(); 
                                    setCurrentPhotoIndex((prev) => Math.min(viewerPhotos.length - 1, prev + 1)); 
                                }}
                                style={{
                                    position: 'absolute',
                                    right: '20px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'rgba(255,255,255,0.2)',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '40px',
                                    padding: '10px 15px',
                                    cursor: 'pointer',
                                    borderRadius: '5px'
                                }}
                            >›</button>
                        </>
                    )}
                </div>
            )}
        </Container>
    )

    if (error) return (
        <Container>
            <Typography variant='h6' color='error' sx={{ textAlign: 'center' }}>
                {error}
            </Typography>
            
            {/* Photo Viewer Full Screen */}
            {photoViewerOpen && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.95)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }} 
                    onClick={() => setPhotoViewerOpen(false)}
                >
                    <img 
                        src={viewerPhotos[currentPhotoIndex]} 
                        style={{
                            maxWidth: '95vw',
                            maxHeight: '95vh',
                            objectFit: 'contain'
                        }}
                        alt="Full size"
                        onClick={(e) => e.stopPropagation()}
                    />
                    {viewerPhotos.length > 1 && (
                        <>
                            <button 
                                onClick={(e) => { 
                                    e.stopPropagation(); 
                                    setCurrentPhotoIndex((prev) => Math.max(0, prev - 1)); 
                                }}
                                style={{
                                    position: 'absolute',
                                    left: '20px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'rgba(255,255,255,0.2)',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '40px',
                                    padding: '10px 15px',
                                    cursor: 'pointer',
                                    borderRadius: '5px'
                                }}
                            >‹</button>
                            <button 
                                onClick={(e) => { 
                                    e.stopPropagation(); 
                                    setCurrentPhotoIndex((prev) => Math.min(viewerPhotos.length - 1, prev + 1)); 
                                }}
                                style={{
                                    position: 'absolute',
                                    right: '20px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'rgba(255,255,255,0.2)',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '40px',
                                    padding: '10px 15px',
                                    cursor: 'pointer',
                                    borderRadius: '5px'
                                }}
                            >›</button>
                        </>
                    )}
                </div>
            )}
        </Container>
    )

    return (
        <Container>
            <TotalCard>
                <TotalLabel>{t('totalSpent')}</TotalLabel>
                <TotalAmountNew>$ {formatMoney(totalSpent)}</TotalAmountNew>
            </TotalCard>

            {sortedExpenses.length === 0 ? (
                <EmptyState>
                <Icons.Expenses sx={{ fontSize: 48, color: '#86868b', mb: 1 }} />
                <EmptyText>{t('noExpenses')}</EmptyText>
                </EmptyState>
            ) : (
                <ExpenseList>
                    <TableHeader>
                        <HeaderCell onClick={() => handleSort('description')}>
                            {t('description')}
                        {sortBy === 'description' && <SortIndicator>{sortOrder === 'asc' ? '↑' : '↓'}</SortIndicator>}</HeaderCell>
                        <HeaderCell onClick={() => handleSort('kilometers')}>
                            {t('km')}
                        {sortBy === 'kilometers' && <SortIndicator>{sortOrder === 'asc' ? '↑' : '↓'}</SortIndicator>}</HeaderCell>
                        <HeaderCell onClick={() => handleSort('category')}>
                            {t('category')}
                        {sortBy === 'category' && <SortIndicator>{sortOrder === 'asc' ? '↑' : '↓'}</SortIndicator>}</HeaderCell>
                        <HeaderCell onClick={() => handleSort('date')}>
                            {t('date')}
                        {sortBy === 'date' && <SortIndicator>{sortOrder === 'asc' ? '↑' : '↓'}</SortIndicator>}</HeaderCell>
                        <HeaderCell onClick={() => handleSort('amount')}>
                            ${t('totalAmount')}
                        {sortBy === 'amount' && <SortIndicator>{sortOrder === 'asc' ? '↑' : '↓'}</SortIndicator>}</HeaderCell>
                    </TableHeader>

                    {sortedExpenses.map(expense => (
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
                        <ExpensePrice>{formatMoney(expense.amount)}</ExpensePrice>
                        </ExpenseItem>
                    ))}
                </ExpenseList>
            )}

            <ExpenseDetailModal
                open={showPopup}
                expense={selectedExpense}
                onClose={handleClosePopup}
                onEdit={handleEdit}
                onDelete={() => setShowDeleteConfirm(true)}
                onOpenPhoto={openPhotoViewer}
                t={t}
            />

            <EditExpenseDialog
                open={openEditDialog}
                expense={editExpense}
                error={error}
                onClose={() => setOpenEditDialog(false)}
                onSave={handleSave}
                onChange={(field, value) =>
                setEditExpense(prev => prev ? { ...prev, [field]: value } : prev)
                }
            />

            <DeleteCarConfirmationDialog
                open={showDeleteConfirm}
                title={`${t('delete')} ${t('expense')}`}
                description={`${t('deleteConfirm')} "${selectedExpense?.description}"?`}
                onConfirm={() => selectedExpense && handleDelete(selectedExpense.id)}
                onCancel={() => setShowDeleteConfirm(false)}
            />
            
            {/* Photo Viewer Full Screen */}
            {photoViewerOpen && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.95)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }} 
                    onClick={() => setPhotoViewerOpen(false)}
                >
                    <img 
                        src={viewerPhotos[currentPhotoIndex]} 
                        style={{
                            maxWidth: '95vw',
                            maxHeight: '95vh',
                            objectFit: 'contain'
                        }}
                        alt="Full size"
                        onClick={(e) => e.stopPropagation()}
                    />
                    {viewerPhotos.length > 1 && (
                        <>
                            <button 
                                onClick={(e) => { 
                                    e.stopPropagation(); 
                                    setCurrentPhotoIndex((prev) => Math.max(0, prev - 1)); 
                                }}
                                style={{
                                    position: 'absolute',
                                    left: '20px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'rgba(255,255,255,0.2)',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '40px',
                                    padding: '10px 15px',
                                    cursor: 'pointer',
                                    borderRadius: '5px'
                                }}
                            >‹</button>
                            <button 
                                onClick={(e) => { 
                                    e.stopPropagation(); 
                                    setCurrentPhotoIndex((prev) => Math.min(viewerPhotos.length - 1, prev + 1)); 
                                }}
                                style={{
                                    position: 'absolute',
                                    right: '20px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'rgba(255,255,255,0.2)',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '40px',
                                    padding: '10px 15px',
                                    cursor: 'pointer',
                                    borderRadius: '5px'
                                }}
                            >›</button>
                        </>
                    )}
                </div>
            )}
        </Container>
    )
}