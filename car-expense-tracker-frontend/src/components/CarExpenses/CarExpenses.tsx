import React from 'react'
import { Typography } from '@mui/material'
import { useLanguage } from '@/contexts'
import { Icons } from '@/constants'
import { formatMoney } from '@/functions'
import {
    EditExpenseDialog,
    DeleteCarConfirmationDialog,
    ExpenseDetailModal,
    PhotoViewer,
    usePhotoViewer,
    ExpenseList as ExpenseListComponent
} from '@/components'

import { useCarExpenses } from './useCarExpenses'
import { useCarExpensesUI } from './useCarExpensesUI'

import {
    Container,
    TotalCard,
    TotalLabel,
    TotalAmountNew,
    EmptyState,
    EmptyText,
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
    } = useCarExpenses()

    const {
        editExpense,
        openEditDialog,
        selectedExpense,
        showPopup,
        showDeleteConfirm,
        setOpenEditDialog,
        setShowDeleteConfirm,
        handleItemClick,
        handleEdit,
        handleSave,
        handleClosePopup,
        handleChange,
    } = useCarExpensesUI(handleUpdate)

    // PhotoViewer hook
    const {
        open: photoViewerOpen,
        photos: viewerPhotos,
        currentIndex,
        openViewer,
        closeViewer,
        prev,
        next,
    } = usePhotoViewer()

    const openPhotoViewer = (photos: string[], index: number) => {
        openViewer(photos, index)
    }

    // LOADING
    if (loading) {
        return (
            <Container>
                <Typography variant="h6" sx={{ textAlign: 'center', color: '#86868b' }}>
                    {t('loadingExpenses')}
                </Typography>

                <PhotoViewer
                    open={photoViewerOpen}
                    photos={viewerPhotos}
                    currentIndex={currentIndex}
                    onClose={closeViewer}
                    onPrev={prev}
                    onNext={next}
                />
            </Container>
        )
    }

    // ERROR
    if (error) {
        return (
            <Container>
                <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
                    {error}
                </Typography>

                <PhotoViewer
                    open={photoViewerOpen}
                    photos={viewerPhotos}
                    currentIndex={currentIndex}
                    onClose={closeViewer}
                    onPrev={prev}
                    onNext={next}
                />
            </Container>
        )
    }

    // NORMAL RENDER
    return (
        <Container>
            {/* TOTAL */}
            <TotalCard>
                <TotalLabel>{t('totalSpent')}</TotalLabel>
                <TotalAmountNew>$ {formatMoney(totalSpent)}</TotalAmountNew>
            </TotalCard>

            {/* EMPTY */}
            {sortedExpenses.length === 0 ? (
                <EmptyState>
                    <Icons.Expenses sx={{ fontSize: 48, color: '#86868b', mb: 1 }} />
                    <EmptyText>{t('noExpenses')}</EmptyText>
                </EmptyState>
            ) : (
                <ExpenseListComponent
                    expenses={sortedExpenses}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                    onItemClick={handleItemClick}
                />
            )}

            {/* MODALS */}
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
                onChange={handleChange}
                onPhotosChange={(photos) => handleChange('photos', photos)}
            />

            <DeleteCarConfirmationDialog
                open={showDeleteConfirm}
                title={`${t('delete')} ${t('expense')}`}
                description={`${t('deleteConfirm')} "${selectedExpense?.description}"?`}
                onConfirm={() => selectedExpense && handleDelete(selectedExpense.id)}
                onCancel={() => setShowDeleteConfirm(false)}
            />

            {/* PHOTO VIEWER */}
            <PhotoViewer
                open={photoViewerOpen}
                photos={viewerPhotos}
                currentIndex={currentIndex}
                onClose={closeViewer}
                onPrev={prev}
                onNext={next}
            />
        </Container>
    )
}