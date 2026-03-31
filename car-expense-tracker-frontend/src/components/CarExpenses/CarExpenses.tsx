import React, { useEffect, useState, useMemo } from 'react'
import { Typography, Box, IconButton } from '@mui/material'
import { getCarExpenses, deleteExpense, updateExpense } from '../../api/api'
import { useParams } from 'react-router-dom'
import { formatDate } from '../../functions/formatDate'
import { formatNumberWithCommas } from '../../functions/formatNumberWithCommas'
import { formatNumberByThousands } from '../../functions/formatNumbersByThousands'
import { ExpenseInterface } from '@/interfaces'
import { EditExpenseDialog } from '../EditExpenseDialog/EditExpenseDialog'
import { useLanguage } from '../../contexts/LanguageContext'
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
  PriceValue,
  PhotosSection,
  PhotoThumb,
  PhotosLabel,
  PhotoViewerOverlay,
  PhotoViewerImage,
  PhotoViewerClose,
  PhotoViewerNav,
  PhotoViewerCounter
} from './CarExpensesStyles'
import { formatCategory } from '../../functions/FormatCategory'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { DeleteCarConfirmationDialog } from '../DeletCarConfirmationDialog/DeletCarConfirmationDialog'

type SortField = 'description' | 'kilometers' | 'category' | 'date' | 'price'
type SortOrder = 'asc' | 'desc'

export const CarExpenses: React.FC = () => {
    const { id } = useParams()
    const { t } = useLanguage()
    const [expenses, setExpenses] = useState<ExpenseInterface[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('')
    const [editExpense, setEditExpense] = useState<ExpenseInterface | null>(null)
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false)
    const [selectedExpense, setSelectedExpense] = useState<ExpenseInterface | null>(null)
    const [showPopup, setShowPopup] = useState<boolean>(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false)
    const [photoViewerOpen, setPhotoViewerOpen] = useState<boolean>(false)
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0)
    const [viewerPhotos, setViewerPhotos] = useState<string[]>([])
    const [photoZoom, setPhotoZoom] = useState<boolean>(false)
    const [sortBy, setSortBy] = useState<SortField>('date')
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

    const handleSort = (field: SortField) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(field)
            setSortOrder('desc')
        }
    }

    const sortedExpenses = useMemo(() => {
        return [...expenses].sort((a, b) => {
            let comparison = 0
            
            switch (sortBy) {
                case 'description':
                    comparison = (a.description || '').localeCompare(b.description || '')
                    break
                case 'kilometers':
                    comparison = (a.kilometers || 0) - (b.kilometers || 0)
                    break
                case 'category':
                    comparison = (a.category || '').localeCompare(b.category || '')
                    break
                case 'date':
                    comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
                    break
                case 'price':
                    comparison = (a.price || 0) - (b.price || 0)
                    break
                default:
                    comparison = 0
            }
            
            return sortOrder === 'asc' ? comparison : -comparison
        })
    }, [expenses, sortBy, sortOrder])

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const data = await getCarExpenses(Number(id));
                const expensesWithPhotos = data.map((expense: any) => ({
                    ...expense,
                    photos: typeof expense.photos === 'string' 
                        ? JSON.parse(expense.photos || '[]') 
                        : (expense.photos || [])
                }));
                setExpenses(expensesWithPhotos)
                setLoading(false)
            } catch (err) {
                setError("Hubo un error al cargar los gastos.")
                setLoading(false)
            }
        }
        fetchExpenses()
    }, [id])

    const handleDelete = async (expenseId: number) => {
        try {
            deleteExpense(expenseId)
            setExpenses(expenses.filter(expense => expense.id !== expenseId))
            setShowPopup(false);
            setSelectedExpense(null)
            setShowDeleteConfirm(false)
        } catch (err) {
            setError("Hubo un error al eliminar el gasto.")
        }
    }

    const handleEdit = (expense: ExpenseInterface) => {
        const expenseWithPhotos = {
            ...expense,
            photos: typeof expense.photos === 'string' 
                ? JSON.parse(expense.photos || '[]') 
                : (expense.photos || [])
        }
        setEditExpense(expenseWithPhotos);
        setOpenEditDialog(true);
        setShowPopup(false);
    }

    const handleCloseEdit = () => {
        setEditExpense(null);
        setOpenEditDialog(false)
    }

    const handleSave = async () => {
        if (!editExpense) return
        try {
            await updateExpense(editExpense.id, editExpense)
            setExpenses(prevExpenses => {
                const updatedExpenses = prevExpenses.map(exp =>
                    exp.id === editExpense.id ? editExpense : exp
                )
                return updatedExpenses
            })
            if (selectedExpense && selectedExpense.id === editExpense.id) {
                setSelectedExpense(editExpense);
            }
            handleCloseEdit();
        } catch (err) {
            setError("Hubo un error al guardar los cambios.")
        }
    }
    
    const handleChange = (field: keyof ExpenseInterface, value: string | number | string[]) => {
        if (!editExpense) return
        setEditExpense({ ...editExpense, [field]: value })
    }

    const handlePhotoChange = (newPhotos: string[]) => {
        if (!editExpense) return;
        setEditExpense({ ...editExpense, photos: newPhotos })
    }

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

    const handleClosePopup = () => {
        setShowPopup(false)
        setSelectedExpense(null)
    }

    const openPhotoViewer = (photos: string[], index: number) => {
        setViewerPhotos(photos)
        setCurrentPhotoIndex(index)
        setPhotoViewerOpen(true)
    }

    const closePhotoViewer = () => {
        setPhotoViewerOpen(false)
        setViewerPhotos([])
        setCurrentPhotoIndex(0)
        setPhotoZoom(false)
    }

    const toggleZoom = () => {
        setPhotoZoom(!photoZoom)
    }

    const goToPrevPhoto = () => {
        setCurrentPhotoIndex(prev => (prev > 0 ? prev - 1 : viewerPhotos.length - 1))
    }

    const goToNextPhoto = () => {
        setCurrentPhotoIndex(prev => (prev < viewerPhotos.length - 1 ? prev + 1 : 0))
    }

    const totalSpent = expenses.reduce((total, expense) => total + (expense.price || 0), 0)

    if (loading) return (
        <Container>
            <Typography variant='h6' sx={{ textAlign: 'center', color: '#86868b' }}>{t('loadingExpenses')}</Typography>
        </Container>
    )

    if (error) return (
        <Container>
            <Typography variant='h6' color='error' sx={{ textAlign: 'center' }}>{error}</Typography>
        </Container>
    )

    return (
        <Container>
            <TotalCard>
                <TotalLabel>{t('totalSpent')}</TotalLabel>
                <TotalAmountNew>$ {formatNumberWithCommas(totalSpent)}</TotalAmountNew>
            </TotalCard>
            
            {sortedExpenses.length === 0 ? (
                <EmptyState>
                    <ReceiptLongIcon sx={{ fontSize: 48, color: '#86868b', mb: 1 }} />
                    <EmptyText>{t('noExpenses')}</EmptyText>
                </EmptyState>
            ) : (
                <ExpenseList>
                    <TableHeader>
                        <HeaderCell 
                            onClick={() => handleSort('description')}
                            sx={{ cursor: 'pointer', userSelect: 'none' }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                {t('description')}
                                {sortBy === 'description' && (
                                    sortOrder === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: 14 }} /> : <ArrowDownwardIcon sx={{ fontSize: 14 }} />
                                )}
                            </Box>
                        </HeaderCell>
                        <HeaderCell 
                            onClick={() => handleSort('kilometers')}
                            sx={{ cursor: 'pointer', userSelect: 'none' }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                                {t('km')}
                                {sortBy === 'kilometers' && (
                                    sortOrder === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: 14 }} /> : <ArrowDownwardIcon sx={{ fontSize: 14 }} />
                                )}
                            </Box>
                        </HeaderCell>
                        <HeaderCell 
                            onClick={() => handleSort('category')}
                            sx={{ cursor: 'pointer', userSelect: 'none' }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                                {t('category')}
                                {sortBy === 'category' && (
                                    sortOrder === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: 14 }} /> : <ArrowDownwardIcon sx={{ fontSize: 14 }} />
                                )}
                            </Box>
                        </HeaderCell>
                        <HeaderCell 
                            onClick={() => handleSort('date')}
                            sx={{ cursor: 'pointer', userSelect: 'none' }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                                {t('date')}
                                {sortBy === 'date' && (
                                    sortOrder === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: 14 }} /> : <ArrowDownwardIcon sx={{ fontSize: 14 }} />
                                )}
                            </Box>
                        </HeaderCell>
                        <HeaderCell 
                            onClick={() => handleSort('price')}
                            sx={{ cursor: 'pointer', userSelect: 'none' }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                                $
                                {sortBy === 'price' && (
                                    sortOrder === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: 14 }} /> : <ArrowDownwardIcon sx={{ fontSize: 14 }} />
                                )}
                            </Box>
                        </HeaderCell>
                    </TableHeader>
                    {sortedExpenses.map((expense) => (
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
                                <PriceLabel>{t('totalAmount')}</PriceLabel>
                                <PriceValue>$ {formatNumberWithCommas(selectedExpense.price)}</PriceValue>
                            </PopupPriceSection>
                            <DetailRow>
                                <DetailLabel>{t('date')}</DetailLabel>
                                <DetailValue>{formatDate(selectedExpense.date)}</DetailValue>
                            </DetailRow>
                            <DetailRow>
                                <DetailLabel>{t('kilometers')}</DetailLabel>
                                <DetailValue>{formatNumberByThousands(selectedExpense.kilometers)} km</DetailValue>
                            </DetailRow>
                            <DetailRow>
                                <DetailLabel>{t('category')}</DetailLabel>
                                <CategoryBadge category={formatCategory(selectedExpense.category)}>
                                    {formatCategory(selectedExpense.category)}
                                </CategoryBadge>
                            </DetailRow>
                            {selectedExpense.photos && selectedExpense.photos.length > 0 && (
                                <Box>
                                    <PhotosLabel>{t('photos')}</PhotosLabel>
                                    <PhotosSection>
                                        {selectedExpense.photos && selectedExpense.photos.map((photo, index) => (
                                            <PhotoThumb 
                                                key={index} 
                                                src={photo}
                                                onClick={() => openPhotoViewer(selectedExpense.photos || [], index)}
                                            />
                                        ))}
                                    </PhotosSection>
                                </Box>
                            )}
                        </PopupContent>
                        <PopupActions>
                            <PopupButton variant="edit" onClick={() => handleEdit(selectedExpense)}>
                                <EditIcon sx={{ fontSize: 16 }} />
                                {t('edit')}
                            </PopupButton>
                            <PopupButton variant="delete" onClick={() => setShowDeleteConfirm(true)}>
                                <DeleteIcon sx={{ fontSize: 16 }} />
                                {t('delete')}
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
                onPhotosChange={handlePhotoChange}
            />
            
            <DeleteCarConfirmationDialog
                open={showDeleteConfirm}
                title={`${t('delete')} ${t('expense')}`}
                description={`${t('deleteConfirm')} "${selectedExpense?.description}"? ${t('deleteWarning')}`}
                onConfirm={() => selectedExpense && handleDelete(selectedExpense.id)}
                onCancel={() => setShowDeleteConfirm(false)}
            />

            {photoViewerOpen && (
                <PhotoViewerOverlay onClick={closePhotoViewer}>
                    <PhotoViewerClose onClick={closePhotoViewer}>
                        <CloseIcon sx={{ fontSize: 24, color: 'white' }} />
                    </PhotoViewerClose>
                    
                    {viewerPhotos.length > 1 && (
                        <>
                            <PhotoViewerNav side="left" onClick={(e: any) => { e.stopPropagation(); goToPrevPhoto(); }}>
                                <ChevronLeftIcon sx={{ fontSize: 32, color: 'white' }} />
                            </PhotoViewerNav>
                            <PhotoViewerNav side="right" onClick={(e: any) => { e.stopPropagation(); goToNextPhoto(); }}>
                                <ChevronRightIcon sx={{ fontSize: 32, color: 'white' }} />
                            </PhotoViewerNav>
                        </>
                    )}
                    
                    <PhotoViewerImage 
                        src={viewerPhotos[currentPhotoIndex]} 
                        zoomed={photoZoom}
                        onClick={(e: any) => {
                            e.stopPropagation();
                            toggleZoom();
                        }}
                    />
                    
                    {viewerPhotos.length > 1 && (
                        <PhotoViewerCounter>
                            {currentPhotoIndex + 1} / {viewerPhotos.length}
                        </PhotoViewerCounter>
                    )}
                </PhotoViewerOverlay>
            )}
        </Container>
    )
}