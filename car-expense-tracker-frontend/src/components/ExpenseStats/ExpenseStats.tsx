import React, { useState } from 'react'
import { Line, Doughnut, Bar } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'
import { useLanguage } from '@/contexts'
import { Icons } from '@/constants'
import { formatMoney } from '@/functions'
import { ExpenseInterface } from '@/interfaces'
import { ExpenseDetailModal, ExpenseStatsSummary } from '@/components'
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
  ChartsGrid,
  ChartCard,
  ChartTitle,
  ChartContainer,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
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

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1d1d1f',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      padding: 12,
      cornerRadius: 8,
      displayColors: false,
      callbacks: {
        label: function(context: any) {
          return formatMoney(context.raw)
        }
      }
    }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#86868b' }
    },
    y: {
      grid: { color: 'rgba(0, 0, 0, 0.04)' },
      ticks: {
        color: '#86868b',
        callback: function(value: any) {
          return formatMoney(value)
        }
      }
    }
  }
}

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const,
      labels: {
        padding: 16,
        usePointStyle: true,
        pointStyle: 'circle',
        color: '#1d1d1f'
      }
    },
    tooltip: {
      backgroundColor: '#1d1d1f',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      padding: 12,
      cornerRadius: 8,
      callbacks: {
        label: function(context: any) {
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
          const percentage = ((context.raw / total) * 100).toFixed(1)
          return `${formatMoney(context.raw)} (${percentage}%)`
        }
      }
    }
  },
  cutout: '65%'
}

const horizontalBarOptions = {
  indexAxis: 'y' as const,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1d1d1f',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      padding: 12,
      cornerRadius: 8,
      callbacks: {
        label: function(context: any) {
          return formatMoney(context.raw)
        }
      }
    }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: '#86868b',
        callback: function(value: any) {
          return formatMoney(value)
        }
      }
    },
    y: {
      grid: { display: false },
      ticks: {
        color: '#1d1d1f',
        font: { weight: 500 }
      }
    }
  }
}

export const ExpenseStats: React.FC = () => {
  const { id } = useParams()
  const { t } = useLanguage()

  const { expenses, loading } = useExpenses(id)
  const stats = useExpenseStats(expenses)
  const {
    trendData,
    categoryData,
    monthlyDistributionData,
    weeklyComparisonData,
    topExpenses
  } = useExpenseCharts(expenses, t)

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

  if (!stats || expenses.length === 0) {
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

      {/* ✅ EXTRAÍDO */}
      <ExpenseStatsSummary stats={stats} />

      <ChartsGrid>
        {trendData && (
          <ChartCard>
            <ChartTitle>{t('expenseTrend')}</ChartTitle>
            <ChartContainer>
              <Line data={trendData} options={chartOptions} />
            </ChartContainer>
          </ChartCard>
        )}

        {categoryData && (
          <ChartCard>
            <ChartTitle>{t('expensesByCategory')}</ChartTitle>
            <ChartContainer>
              <Doughnut data={categoryData} options={doughnutOptions} />
            </ChartContainer>
          </ChartCard>
        )}

        {monthlyDistributionData && (
          <ChartCard>
            <ChartTitle>
              <Icons.Calendar sx={{ fontSize: 20, mr: 1, color: '#0071e3' }} />
              {t('monthlyDistribution')}
            </ChartTitle>
            <ChartContainer>
              <Bar data={monthlyDistributionData} options={chartOptions} />
            </ChartContainer>
          </ChartCard>
        )}

        {weeklyComparisonData && (
          <ChartCard>
            <ChartTitle>
              <Icons.DateRange sx={{ fontSize: 20, mr: 1, color: '#34c759' }} />
              {t('weeklyComparison')}
            </ChartTitle>
            <ChartContainer>
              <Bar data={weeklyComparisonData} options={chartOptions} />
            </ChartContainer>
          </ChartCard>
        )}
      </ChartsGrid>

      {topExpenses && (
        <ChartCard style={{ marginBottom: '2rem' }}>
          <ChartTitle>
            <Icons.TrendingUp sx={{ fontSize: 20, mr: 1, color: '#ff9500' }} />
            {t('topExpenses')}
          </ChartTitle>
          <ChartContainer style={{ height: '200px' }}>
            <Bar data={topExpenses} options={horizontalBarOptions} />
          </ChartContainer>
        </ChartCard>
      )}

      <StatsGrid>
        <StatCard onClick={() => setSelectedExpense(stats.highest)} style={{ cursor: 'pointer' }}>
          <Icons.TrendingUp sx={{ fontSize: 24, color: '#ff3b30' }} />
          <StatValue>{formatMoney(stats.highest?.amount || 0)}</StatValue>
          <StatLabel>{t('highestExpense')}</StatLabel>
        </StatCard>

        <StatCard onClick={() => setSelectedExpense(stats.lowest)} style={{ cursor: 'pointer' }}>
          <Icons.TrendingDown sx={{ fontSize: 24, color: '#34c759' }} />
          <StatValue>{formatMoney(stats.lowest?.amount || 0)}</StatValue>
          <StatLabel>{t('lowestExpense')}</StatLabel>
        </StatCard>

        <StatCard>
          <Icons.Speed sx={{ fontSize: 24, color: '#0071e3' }} />
          <StatValue>
            {formatMoney(Math.round((stats.costPerKm || 0) * 100) / 100)}
          </StatValue>
          <StatLabel>{t('costPerKm')}</StatLabel>
        </StatCard>
      </StatsGrid>

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