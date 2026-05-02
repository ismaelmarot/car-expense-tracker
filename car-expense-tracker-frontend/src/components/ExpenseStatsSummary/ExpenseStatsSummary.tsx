import React from 'react'
import { Icons } from '@/constants'
import { useLanguage } from '@/contexts'
import { formatMoney, formatNumberWithCommas } from '@/functions'
import { ExpenseStatsSummaryProps } from '@/interfaces/ExpenseStatsSummary.interface'
import {
  SummaryGrid,
  SummaryCard,
  SummaryIcon,
  SummaryLabel,
  SummaryValue,
} from './ExpenseStatsSummary.styles'

export const ExpenseStatsSummary: React.FC<ExpenseStatsSummaryProps> = ({ stats }) => {
  const { t } = useLanguage()

  return (
    <>
      <SummaryGrid>
        <SummaryCard>
          <SummaryIcon style={{ background: '#e8f4fd', color: '#0071e3' }}>
            <Icons.Money />
          </SummaryIcon>
          <SummaryLabel>{t('totalSpent')}</SummaryLabel>
          <SummaryValue>{formatMoney(stats.total)}</SummaryValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryIcon style={{ background: '#e8f5e9', color: '#34c759' }}>
            <Icons.Chart />
          </SummaryIcon>
          <SummaryLabel>{t('averagePerExpense')}</SummaryLabel>
          <SummaryValue>{formatMoney(Math.round(stats.average))}</SummaryValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryIcon style={{ background: '#fff3e0', color: '#ff9500' }}>
            <Icons.List />
          </SummaryIcon>
          <SummaryLabel>{t('registeredExpenses')}</SummaryLabel>
          <SummaryValue>{stats.count}</SummaryValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryIcon style={{ background: '#fce4ec', color: '#ff3b30' }}>
            <Icons.Speed />
          </SummaryIcon>
          <SummaryLabel>{t('totalKm')}</SummaryLabel>
          <SummaryValue>{formatNumberWithCommas(stats.totalKm || 0)} km</SummaryValue>
        </SummaryCard>
      </SummaryGrid>

      <SummaryGrid>
        <SummaryCard>
          <SummaryIcon style={{ background: '#f3e5f5', color: '#af52de' }}>
            <Icons.CalendarMonth />
          </SummaryIcon>
          <SummaryLabel>{t('monthlyAverage')}</SummaryLabel>
          <SummaryValue>{formatMoney(Math.round(stats.monthlyAverage || 0))}</SummaryValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryIcon style={{ background: '#e0f7fa', color: '#5ac8fa' }}>
            <Icons.Category />
          </SummaryIcon>
          <SummaryLabel>{t('mostExpensiveCategory')}</SummaryLabel>
          <SummaryValue>{stats.mostExpensiveCategory?.[0] || 'N/A'}</SummaryValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryIcon style={{ background: '#fff8e1', color: '#ff9500' }}>
            <Icons.Recurring />
          </SummaryIcon>
          <SummaryLabel>{t('expenseFrequency')}</SummaryLabel>
          <SummaryValue>
            {t('every')} {Math.round(stats.frequency || 0)} {t('daysFrequency')}
          </SummaryValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryIcon style={{ background: '#e8eaf6', color: '#5856d6' }}>
            <Icons.Speed />
          </SummaryIcon>
          <SummaryLabel>{t('costPerKm')}</SummaryLabel>
          <SummaryValue>{formatMoney(stats.costPerKm || 0)} $/km</SummaryValue>
        </SummaryCard>
      </SummaryGrid>
    </>
  )
}