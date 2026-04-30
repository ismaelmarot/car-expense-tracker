import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'
import { useLanguage } from '@/contexts'
import { Icons } from '@/constants'
import { formatMoney } from '@/functions'
import { ExpenseInterface } from '@/interfaces'
import { ExpenseDetailModal } from '@/components'
import { useExpenses } from './useExpenses'
import { useExpenseStats } from './useExpenseStats'
import { useExpenseCharts } from './useExpenseCharts'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import {
  Container,
  Header,
  Title as PageTitle,
  Subtitle,
  SummaryGrid,
  SummaryCard,
  SummaryIcon,
  SummaryLabel,
  SummaryValue,
  ChartCard,
  ChartTitle,
  ChartContainer,
  LoadingContainer,
  EmptyState,
  EmptyTitle,
  EmptyText
} from './ExpenseStats.styles'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export const ExpenseStats: React.FC = () => {
  const { id } = useParams()
  const { t } = useLanguage()

  const { expenses, loading } = useExpenses(id)
  const stats = useExpenseStats(expenses)
  const { trendData } = useExpenseCharts(expenses, t)

  const [selectedExpense, setSelectedExpense] = useState<ExpenseInterface | null>(null)

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <PageTitle>{t('loadingStats')}</PageTitle>
        </LoadingContainer>
      </Container>
    )
  }

  if (!stats) {
    return (
      <Container>
        <EmptyState>
          <Icons.Report sx={{ fontSize: 48, color: '#86868b' }} />
          <EmptyTitle>No hay datos suficientes</EmptyTitle>
          <EmptyText>Agrega gastos</EmptyText>
        </EmptyState>
      </Container>
    )
  }

  return (
    <Container>
      <Header>
        <PageTitle>Estadísticas</PageTitle>
        <Subtitle>Análisis completo</Subtitle>
      </Header>

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
      </SummaryGrid>

      {trendData && (
        <ChartCard>
          <ChartTitle>{t('expenseTrend')}</ChartTitle>
          <ChartContainer>
            <Line data={trendData} />
          </ChartContainer>
        </ChartCard>
      )}

      <ExpenseDetailModal
        open={!!selectedExpense}
        expense={selectedExpense}
        onClose={() => setSelectedExpense(null)}
        onEdit={(expense) => console.log(expense)}
        onDelete={() => console.log('delete')}
        onOpenPhoto={(photos, index) => console.log(photos, index)}
        t={t}
      />
    </Container>
  )
}