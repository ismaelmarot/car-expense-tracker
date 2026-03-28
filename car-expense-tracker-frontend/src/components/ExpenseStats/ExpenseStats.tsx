import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getCarExpenses } from '../../api/api';
import { ExpenseInterface } from '../../interfaces/ExpenseInterface';
import { formatNumberWithCommas } from '../../functions/formatNumberWithCommas';
import { formatCategory } from '../../functions/FormatCategory';
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
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { Dialog, DialogContent, IconButton as MuiIconButton, Box, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BarChartIcon from '@mui/icons-material/BarChart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import SpeedIcon from '@mui/icons-material/Speed';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CategoryIcon from '@mui/icons-material/Category';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import GridOnIcon from '@mui/icons-material/GridOn';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import TimelineIcon from '@mui/icons-material/Timeline';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import Speed from '@mui/icons-material/Speed';
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
  EmptyIcon,
  EmptyTitle,
  EmptyText
} from './ExpenseStatsStyles';

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
);

const formatMonth = (date: Date): string => {
  return date.toLocaleDateString('es-ES', { month: 'short', year: '2-digit' });
};

const ExpenseStats: React.FC = () => {
  const { id } = useParams();
  const [expenses, setExpenses] = useState<ExpenseInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseInterface | null>(null);
  const [popupType, setPopupType] = useState<'highest' | 'lowest' | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getCarExpenses(Number(id));
        setExpenses(data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, [id]);

  const stats = useMemo(() => {
    if (expenses.length === 0) return null;

    const total = expenses.reduce((sum, exp) => sum + exp.price, 0);
    const sortedByPrice = [...expenses].sort((a, b) => b.price - a.price);
    const highest = sortedByPrice[0];
    const lowest = sortedByPrice[sortedByPrice.length - 1];
    const average = total / expenses.length;

    const totalKm = expenses.reduce((sum, exp) => sum + (exp.kilometers || 0), 0);
    const costPerKm = totalKm > 0 ? total / totalKm : 0;

    // Gasto mensual promedio
    const dates = expenses.map(exp => new Date(exp.date));
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
    const monthsDiff = (maxDate.getFullYear() - minDate.getFullYear()) * 12 + (maxDate.getMonth() - minDate.getMonth()) + 1;
    const monthlyAverage = monthsDiff > 0 ? total / monthsDiff : total;

    // Gasto anual
    const yearlyTotals: { [key: string]: number } = {};
    expenses.forEach(exp => {
      const year = new Date(exp.date).getFullYear().toString();
      yearlyTotals[year] = (yearlyTotals[year] || 0) + exp.price;
    });

    // Categoría más costosa
    const categoryTotals: { [key: string]: number } = {};
    expenses.forEach(exp => {
      const cat = formatCategory(exp.category);
      categoryTotals[cat] = (categoryTotals[cat] || 0) + exp.price;
    });
    const mostExpensiveCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

    // Mes con más gastos
    const monthlyTotals: { [key: string]: number } = {};
    expenses.forEach(exp => {
      const date = new Date(exp.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyTotals[monthKey] = (monthlyTotals[monthKey] || 0) + exp.price;
    });
    const highestMonth = Object.entries(monthlyTotals).sort((a, b) => b[1] - a[1])[0];

    // Frecuencia de gastos
    const sortedDates = [...dates].sort((a, b) => a.getTime() - b.getTime());
    let totalDays = 0;
    for (let i = 1; i < sortedDates.length; i++) {
      totalDays += Math.abs(sortedDates[i].getTime() - sortedDates[i - 1].getTime()) / (1000 * 60 * 60 * 24);
    }
    const frequency = sortedDates.length > 1 ? totalDays / (sortedDates.length - 1) : 0;

    return {
      total,
      average,
      highest,
      lowest,
      count: expenses.length,
      totalKm,
      costPerKm,
      monthlyAverage,
      yearlyTotals,
      mostExpensiveCategory,
      highestMonth,
      frequency
    };
  }, [expenses]);

  const trendData = useMemo(() => {
    if (expenses.length === 0) return null;

    const monthlyTotals: { [key: string]: number } = {};
    expenses.forEach(exp => {
      const date = new Date(exp.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyTotals[monthKey] = (monthlyTotals[monthKey] || 0) + exp.price;
    });

    const sortedMonths = Object.keys(monthlyTotals).sort();
    const labels = sortedMonths.map(key => {
      const [year, month] = key.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return formatMonth(date);
    });

    const data = sortedMonths.map(key => monthlyTotals[key]);
    console.log('Trend data - labels:', labels);
    console.log('Trend data - values:', data);

    return {
      labels,
      datasets: [{
        label: 'Gastos',
        data: data,
        borderColor: '#0071e3',
        backgroundColor: 'rgba(0, 113, 227, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#0071e3',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4
      }]
    };
  }, [expenses]);

  const categoryData = useMemo(() => {
    if (expenses.length === 0) return null;

    const categoryTotals: { [key: string]: number } = {};
    expenses.forEach(exp => {
      const cat = formatCategory(exp.category);
      categoryTotals[cat] = (categoryTotals[cat] || 0) + exp.price;
    });

    const categories = Object.keys(categoryTotals).sort((a, b) => categoryTotals[b] - categoryTotals[a]);
    const colors = [
      '#0071e3', '#34c759', '#ff9500', '#ff3b30', '#af52de',
      '#5856d6', '#5ac8fa', '#ff2d55', '#a2845e', '#8e8e93'
    ];

    return {
      labels: categories,
      datasets: [{
        data: categories.map(cat => categoryTotals[cat]),
        backgroundColor: colors.slice(0, categories.length),
        borderColor: '#ffffff',
        borderWidth: 2
      }]
    };
  }, [expenses]);

  const topExpenses = useMemo(() => {
    if (expenses.length === 0) return null;

    const sorted = [...expenses].sort((a, b) => b.price - a.price).slice(0, 5);

    return {
      labels: sorted.map(exp => exp.description.substring(0, 20) + (exp.description.length > 20 ? '...' : '')),
      datasets: [{
        label: 'Gasto',
        data: sorted.map(exp => exp.price),
        backgroundColor: sorted.map((_, i) => {
          const colors = ['#0071e3', '#34c759', '#ff9500', '#ff3b30', '#af52de'];
          return colors[i % colors.length];
        }),
        borderRadius: 8
      }]
    };
  }, [expenses]);

  const yearComparisonData = useMemo(() => {
    if (!stats?.yearlyTotals || Object.keys(stats.yearlyTotals).length < 2) return null;

    const years = Object.keys(stats.yearlyTotals).sort();

    return {
      labels: years,
      datasets: [{
        label: 'Gasto anual',
        data: years.map(year => stats.yearlyTotals[year]),
        backgroundColor: years.map((_, i) => i % 2 === 0 ? '#0071e3' : '#34c759'),
        borderRadius: 8
      }]
    };
  }, [stats]);

  const monthlyDistributionData = useMemo(() => {
    if (expenses.length === 0) return null;

    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const monthTotals = new Array(12).fill(0);

    expenses.forEach(exp => {
      const month = new Date(exp.date).getMonth();
      monthTotals[month] += exp.price;
    });

    return {
      labels: monthNames,
      datasets: [{
        label: 'Gastos',
        data: monthTotals,
        backgroundColor: monthTotals.map(val => val > 0 ? '#0071e3' : '#f5f5f7'),
        borderRadius: 8
      }]
    };
  }, [expenses]);

  const weeklyComparisonData = useMemo(() => {
    if (expenses.length === 0) return null;

    // Agrupar gastos por semana del año
    const weeklyTotals: { [key: string]: number } = {};
    
    expenses.forEach(exp => {
      const date = new Date(exp.date);
      const startOfYear = new Date(date.getFullYear(), 0, 1);
      const weekNumber = Math.ceil(((date.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7);
      const weekKey = `Sem ${weekNumber}`;
      weeklyTotals[weekKey] = (weeklyTotals[weekKey] || 0) + exp.price;
    });

    // Ordenar por número de semana
    const sortedWeeks = Object.keys(weeklyTotals).sort((a, b) => {
      const weekA = parseInt(a.replace('Sem ', ''));
      const weekB = parseInt(b.replace('Sem ', ''));
      return weekA - weekB;
    });

    // Tomar solo las últimas 8 semanas para mejor visualización
    const last8Weeks = sortedWeeks.slice(-8);

    return {
      labels: last8Weeks,
      datasets: [{
        label: 'Gastos',
        data: last8Weeks.map(week => weeklyTotals[week]),
        backgroundColor: '#0071e3',
        borderRadius: 8
      }]
    };
  }, [expenses]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#1d1d1f',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        padding: 12,
        cornerRadius: 8,
        displayColors: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#86868b'
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.04)'
        },
        ticks: {
          color: '#86868b',
          callback: function(value: any) {
            return '$' + formatNumberWithCommas(value);
          }
        }
      }
    }
  };

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
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((context.raw / total) * 100).toFixed(1);
            return `$${formatNumberWithCommas(context.raw)} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '65%'
  };

  const horizontalBarOptions = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#1d1d1f',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function(context: any) {
            return '$' + formatNumberWithCommas(context.raw);
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#86868b',
          callback: function(value: any) {
            return '$' + formatNumberWithCommas(value);
          }
        }
      },
      y: {
        grid: {
          display: false
        },
        ticks: {
          color: '#1d1d1f',
          font: {
            weight: 500
          }
        }
      }
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <PageTitle>Cargando estadísticas...</PageTitle>
        </LoadingContainer>
      </Container>
    );
  }

  if (!stats || expenses.length === 0) {
    return (
      <Container>
        <EmptyState>
          <InsertChartIcon sx={{ fontSize: 48, color: '#86868b', mb: 1 }} />
          <EmptyTitle>No hay datos suficientes</EmptyTitle>
          <EmptyText>Agrega algunos gastos para ver las estadísticas</EmptyText>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <PageTitle>Estadísticas</PageTitle>
        <Subtitle>Análisis completo de tus gastos</Subtitle>
      </Header>

      {/* Tarjetas de resumen principales */}
      <SummaryGrid>
        <SummaryCard>
          <SummaryIcon style={{ background: '#e8f4fd', color: '#0071e3' }}>
            <AttachMoneyIcon sx={{ fontSize: 24 }} />
          </SummaryIcon>
          <SummaryLabel>Total gastado</SummaryLabel>
          <SummaryValue>$ {formatNumberWithCommas(stats.total)}</SummaryValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryIcon style={{ background: '#e8f5e9', color: '#34c759' }}>
            <BarChartIcon sx={{ fontSize: 24 }} />
          </SummaryIcon>
          <SummaryLabel>Promedio por gasto</SummaryLabel>
          <SummaryValue>$ {formatNumberWithCommas(Math.round(stats.average))}</SummaryValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryIcon style={{ background: '#fff3e0', color: '#ff9500' }}>
            <ListAltIcon sx={{ fontSize: 24 }} />
          </SummaryIcon>
          <SummaryLabel>Gastos registrados</SummaryLabel>
          <SummaryValue>{stats.count}</SummaryValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryIcon style={{ background: '#fce4ec', color: '#ff3b30' }}>
            <DirectionsCarIcon sx={{ fontSize: 24 }} />
          </SummaryIcon>
          <SummaryLabel>Kilómetros totales</SummaryLabel>
          <SummaryValue>{formatNumberWithCommas(stats.totalKm)} km</SummaryValue>
        </SummaryCard>
      </SummaryGrid>

      {/* Tarjetas de estadísticas adicionales */}
      <SummaryGrid>
        <SummaryCard>
          <SummaryIcon style={{ background: '#f3e5f5', color: '#af52de' }}>
            <CalendarMonthIcon sx={{ fontSize: 24 }} />
          </SummaryIcon>
          <SummaryLabel>Gasto mensual promedio</SummaryLabel>
          <SummaryValue>$ {formatNumberWithCommas(Math.round(stats.monthlyAverage))}</SummaryValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryIcon style={{ background: '#e8eaf6', color: '#5856d6' }}>
            <CategoryIcon sx={{ fontSize: 24 }} />
          </SummaryIcon>
          <SummaryLabel>Categoría más costosa</SummaryLabel>
          <SummaryValue>{stats.mostExpensiveCategory ? formatCategory(stats.mostExpensiveCategory[0]) : '-'}</SummaryValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryIcon style={{ background: '#fff8e1', color: '#ff9500' }}>
            <EventRepeatIcon sx={{ fontSize: 24 }} />
          </SummaryIcon>
          <SummaryLabel>Frecuencia de gastos</SummaryLabel>
          <SummaryValue>Cada {Math.round(stats.frequency)} días</SummaryValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryIcon style={{ background: '#e0f7fa', color: '#00838f' }}>
            <ShowChartIcon sx={{ fontSize: 24 }} />
          </SummaryIcon>
          <SummaryLabel>Costo por kilómetro</SummaryLabel>
          <SummaryValue>$ {formatNumberWithCommas(Math.round(stats.costPerKm * 100) / 100)}</SummaryValue>
        </SummaryCard>
      </SummaryGrid>

      {/* Gráficos principales */}
      <ChartsGrid>
        {trendData && (
          <ChartCard>
            <ChartTitle>Tendencia de gastos</ChartTitle>
            <ChartContainer>
              <Line data={trendData} options={chartOptions} />
            </ChartContainer>
          </ChartCard>
        )}
        {categoryData && (
          <ChartCard>
            <ChartTitle>Gastos por categoría</ChartTitle>
            <ChartContainer>
              <Doughnut data={categoryData} options={doughnutOptions} />
            </ChartContainer>
          </ChartCard>
        )}
      </ChartsGrid>

      {/* Gráficos adicionales */}
      <ChartsGrid>
        {yearComparisonData && (
          <ChartCard>
            <ChartTitle>
              <CompareArrowsIcon sx={{ fontSize: 20, mr: 1, color: '#0071e3' }} />
              Comparativa por año
            </ChartTitle>
            <ChartContainer>
              <Bar data={yearComparisonData} options={chartOptions} />
            </ChartContainer>
          </ChartCard>
        )}
        {monthlyDistributionData && (
          <ChartCard>
            <ChartTitle>
              <CalendarTodayIcon sx={{ fontSize: 20, mr: 1, color: '#0071e3' }} />
              Distribución mensual
            </ChartTitle>
            <ChartContainer>
              <Bar data={monthlyDistributionData} options={chartOptions} />
            </ChartContainer>
          </ChartCard>
        )}
      </ChartsGrid>

      {/* Gráfico semanal */}
      <ChartsGrid>
        {weeklyComparisonData && (
          <ChartCard>
            <ChartTitle>
              <DateRangeIcon sx={{ fontSize: 20, mr: 1, color: '#0071e3' }} />
              Comparativo por semana
            </ChartTitle>
            <ChartContainer>
              <Bar data={weeklyComparisonData} options={chartOptions} />
            </ChartContainer>
          </ChartCard>
        )}
      </ChartsGrid>

      {/* Top gastos */}
      {topExpenses && (
        <ChartCard style={{ marginBottom: '2rem' }}>
          <ChartTitle>
            <TrendingUpIcon sx={{ fontSize: 20, mr: 1, color: '#0071e3' }} />
            Top 5 gastos más altos
          </ChartTitle>
          <ChartContainer style={{ height: '200px' }}>
            <Bar data={topExpenses} options={horizontalBarOptions} />
          </ChartContainer>
        </ChartCard>
      )}

      {/* Estadísticas finales */}
      <StatsGrid>
        <StatCard onClick={() => { setSelectedExpense(stats.highest); setPopupType('highest'); }} style={{ cursor: 'pointer' }}>
          <TrendingUpIcon sx={{ fontSize: 32, color: '#34c759', mb: 1 }} />
          <StatValue>$ {formatNumberWithCommas(stats.highest.price)}</StatValue>
          <StatLabel>Gasto más alto</StatLabel>
        </StatCard>
        <StatCard onClick={() => { setSelectedExpense(stats.lowest); setPopupType('lowest'); }} style={{ cursor: 'pointer' }}>
          <TrendingDownIcon sx={{ fontSize: 32, color: '#ff3b30', mb: 1 }} />
          <StatValue>$ {formatNumberWithCommas(stats.lowest.price)}</StatValue>
          <StatLabel>Gasto más bajo</StatLabel>
        </StatCard>
        <StatCard>
          <SpeedIcon sx={{ fontSize: 32, color: '#0071e3', mb: 1 }} />
          <StatValue>$ {formatNumberWithCommas(Math.round(stats.costPerKm * 100) / 100)}</StatValue>
          <StatLabel>Costo por km</StatLabel>
        </StatCard>
      </StatsGrid>

      {/* Popup de detalle del gasto */}
      <Dialog
        open={selectedExpense !== null}
        onClose={() => { setSelectedExpense(null); setPopupType(null); }}
        PaperProps={{
          sx: {
            borderRadius: '20px',
            maxWidth: '400px',
            width: '90%'
          }
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          {selectedExpense && (
            <Box>
              <Box sx={{ 
                background: popupType === 'highest' 
                  ? 'linear-gradient(135deg, #34c759 0%, #30d158 100%)' 
                  : 'linear-gradient(135deg, #ff3b30 0%, #ff6b6b 100%)',
                p: 2,
                position: 'relative'
              }}>
                <MuiIconButton 
                  onClick={() => { setSelectedExpense(null); setPopupType(null); }}
                  sx={{ position: 'absolute', top: 8, right: 8, color: 'white' }}
                >
                  <CloseIcon />
                </MuiIconButton>
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  {popupType === 'highest' ? (
                    <TrendingUpIcon sx={{ fontSize: 48, color: 'white', mb: 1 }} />
                  ) : (
                    <TrendingDownIcon sx={{ fontSize: 48, color: 'white', mb: 1 }} />
                  )}
                  <Typography sx={{ color: 'white', fontSize: '1.25rem', fontWeight: 600 }}>
                    {popupType === 'highest' ? 'Gasto más alto' : 'Gasto más bajo'}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography sx={{ fontSize: '0.75rem', color: '#86868b', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Descripción
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: '#1d1d1f', mt: 0.5 }}>
                      {selectedExpense.description}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                    <Box>
                      <Typography sx={{ fontSize: '0.75rem', color: '#86868b', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        Monto
                      </Typography>
                      <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, color: '#1d1d1f', mt: 0.5 }}>
                        $ {formatNumberWithCommas(selectedExpense.price)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '0.75rem', color: '#86868b', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        Fecha
                      </Typography>
                      <Typography sx={{ fontSize: '1rem', fontWeight: 500, color: '#1d1d1f', mt: 0.5 }}>
                        {new Date(selectedExpense.date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                    <Box>
                      <Typography sx={{ fontSize: '0.75rem', color: '#86868b', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        Kilometraje
                      </Typography>
                      <Typography sx={{ fontSize: '1rem', fontWeight: 500, color: '#1d1d1f', mt: 0.5 }}>
                        {formatNumberWithCommas(selectedExpense.kilometers || 0)} km
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '0.75rem', color: '#86868b', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        Categoría
                      </Typography>
                      <Typography sx={{ fontSize: '1rem', fontWeight: 500, color: '#1d1d1f', mt: 0.5 }}>
                        {formatCategory(selectedExpense.category)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ExpenseStats;