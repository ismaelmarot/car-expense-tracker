import React from 'react'
import { useLanguage } from '@/contexts'
import { ExpenseListProps } from '@/interfaces'
import {
    formatCategory,
    formatDate,
    formatMoney,
    formatNumberByThousands
} from '@/functions'
import {
    ExpenseList as ListContainer,
    TableHeader,
    HeaderCell,
    ExpenseItem,
    ExpenseName,
    ExpenseDate,
    ExpenseKm,
    ExpenseCategory,
    ExpensePrice,
    MobileDate,
    CategoryBadge,
    SortIndicator,
} from './ExpenseList.styles'

export const ExpenseList: React.FC<ExpenseListProps> = ({
    expenses,
    sortBy,
    sortOrder,
    onSort,
    onItemClick,
}) => {
    const { t } = useLanguage()

    return (
        <ListContainer>
            <TableHeader>
                <HeaderCell onClick={() => onSort('description')}>
                    {t('description')}
                    {sortBy === 'description' && (
                        <SortIndicator>{sortOrder === 'asc' ? '↑' : '↓'}</SortIndicator>
                    )}
                </HeaderCell>

                <HeaderCell onClick={() => onSort('kilometers')}>
                    {t('km')}
                    {sortBy === 'kilometers' && (
                        <SortIndicator>{sortOrder === 'asc' ? '↑' : '↓'}</SortIndicator>
                    )}
                </HeaderCell>

                <HeaderCell onClick={() => onSort('category')}>
                    {t('category')}
                    {sortBy === 'category' && (
                        <SortIndicator>{sortOrder === 'asc' ? '↑' : '↓'}</SortIndicator>
                    )}
                </HeaderCell>

                <HeaderCell onClick={() => onSort('date')}>
                    {t('date')}
                    {sortBy === 'date' && (
                        <SortIndicator>{sortOrder === 'asc' ? '↑' : '↓'}</SortIndicator>
                    )}
                </HeaderCell>

                <HeaderCell onClick={() => onSort('amount')}>
                    ${t('totalAmount')}
                    {sortBy === 'amount' && (
                        <SortIndicator>{sortOrder === 'asc' ? '↑' : '↓'}</SortIndicator>
                    )}
                </HeaderCell>
            </TableHeader>

            {expenses.map(expense => {
                const category = formatCategory(expense.category)

                return (
                    <ExpenseItem
                        key={expense.id}
                        onClick={() => onItemClick(expense)}
                    >
                        <ExpenseName>{expense.description}</ExpenseName>

                        <MobileDate>{formatDate(expense.date)}</MobileDate>

                        <ExpenseKm>
                            {formatNumberByThousands(expense.kilometers)}
                        </ExpenseKm>

                        <ExpenseCategory>
                            <CategoryBadge category={category}>
                                {category}
                            </CategoryBadge>
                        </ExpenseCategory>

                        <ExpenseDate>{formatDate(expense.date)}</ExpenseDate>

                        <ExpensePrice>
                            {formatMoney(expense.amount)}
                        </ExpensePrice>
                    </ExpenseItem>
                )
            })}
        </ListContainer>
    )
}