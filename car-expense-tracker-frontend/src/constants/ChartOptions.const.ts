import { formatMoney } from '@/functions'

export const chartOptions = {
    esponsive: true,
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
                label: function (context: any) {
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
                callback: function (value: any) {
                return formatMoney(value)
                }
            }
        }
    }
}

export const doughnutOptions = {
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
            label: function (context: any) {
                const total = context.dataset.data.reduce(
                    (a: number, b: number) => a + b,
                    0
                )
                const percentage = ((context.raw / total) * 100).toFixed(1)
                return `${formatMoney(context.raw)} (${percentage}%)`
            }
        }
        }
  },
  cutout: '65%'
}

export const horizontalBarOptions = {
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
                label: function (context: any) {
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
            callback: function (value: any) {
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