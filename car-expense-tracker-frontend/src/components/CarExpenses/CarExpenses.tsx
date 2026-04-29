import React, { useState } from 'react'
import { Typography, Box } from '@mui/material'
import { useLanguage } from '@/contexts'
import { Icons } from '@/constants'
import { ExpenseInterface } from '@/interfaces'
import { formatCategory, formatDate, formatMoney, formatNumberByThousands } from '@/functions'
import { EditExpenseDialog, DeleteCarConfirmationDialog } from '@/components'
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

  if (loading) return (
    <Container>
      <Typography variant='h6' sx={{ textAlign: 'center', color: '#86868b' }}>
        {t('loadingExpenses')}
      </Typography>
    </Container>
  )

  if (error) return (
    <Container>
      <Typography variant='h6' color='error' sx={{ textAlign: 'center' }}>
        {error}
      </Typography>
    </Container>
  )

  return (
    <Container>
      <TotalCard>
        <TotalLabel>{t('totalSpent')}</TotalLabel>
        <TotalAmountNew>{formatMoney(totalSpent)}</TotalAmountNew>
      </TotalCard>

      {sortedExpenses.length === 0 ? (
        <EmptyState>
          <Icons.Receipt sx={{ fontSize: 48, color: '#86868b', mb: 1 }} />
          <EmptyText>{t('noExpenses')}</EmptyText>
        </EmptyState>
      ) : (
        <ExpenseList>
          <TableHeader>
            <HeaderCell onClick={() => handleSort('description')}>
              {t('description')}
            </HeaderCell>
            <HeaderCell onClick={() => handleSort('kilometers')}>
              {t('km')}
            </HeaderCell>
            <HeaderCell onClick={() => handleSort('category')}>
              {t('category')}
            </HeaderCell>
            <HeaderCell onClick={() => handleSort('amount')}>
              ${t('totalAmount')}
            </HeaderCell>
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

      {/* POPUP */}
      {showPopup && selectedExpense && (
        <PopupOverlay onClick={handleClosePopup}>
          <PopupCard onClick={(e: any) => e.stopPropagation()}>
            <PopupHeader>
              <CloseButton onClick={handleClosePopup}>
                <Icons.Close sx={{ fontSize: 16, color: '#fff' }} />
              </CloseButton>
              <PopupTitle>{selectedExpense.description}</PopupTitle>
            </PopupHeader>

            <PopupContent>
              <PopupPriceSection>
                <PriceLabel>{t('totalAmount')}</PriceLabel>
                <PriceValue>{formatMoney(selectedExpense.amount)}</PriceValue>
              </PopupPriceSection>

              {(selectedExpense.photos?.length ?? 0) > 0 && (
                <Box>
                  <PhotosLabel>{t('photos')}</PhotosLabel>
                  <PhotosSection>
                    {selectedExpense.photos?.map((photo, index) => (
                      <PhotoThumb
                        key={index}
                        src={photo}
                        onClick={() => openPhotoViewer(selectedExpense.photos!, index)}
                      />
                    ))}
                  </PhotosSection>
                </Box>
              )}
            </PopupContent>

            <PopupActions>
              <PopupButton variant="edit" onClick={() => handleEdit(selectedExpense)}>
                <Icons.Edit sx={{ fontSize: 16 }} />
                {t('edit')}
              </PopupButton>

              <PopupButton variant="delete" onClick={() => setShowDeleteConfirm(true)}>
                <Icons.Delete sx={{ fontSize: 16 }} />
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
    </Container>
  )
}