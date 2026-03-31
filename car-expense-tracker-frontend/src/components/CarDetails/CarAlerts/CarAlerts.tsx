import React from 'react'
import {
    AlertsContainer,
    AlertCard,
    AlertIcon,
    AlertInfo,
    AlertTitle,
    AlertDate,
    AlertRemaining
} from './CarAlerts.styles'

interface CarAlertsProps {
    vtvDate: string | undefined
    extintorDate: string | undefined
    serviceKm: number | null
    formatDate: (date: string | undefined) => string
    isDateExpired: (date: string | undefined) => boolean
    getTimeRemaining: (date: string | undefined) => string
}

export const CarAlerts: React.FC<CarAlertsProps> = ({
    vtvDate,
    extintorDate,
    serviceKm,
    formatDate,
    isDateExpired,
    getTimeRemaining
}) => {
    const alerts = []

    if (vtvDate) {
        alerts.push({
            type: 'vtv',
            icon: isDateExpired(vtvDate) ? '⚠️' : '✅',
            title: 'VTV',
            date: formatDate(vtvDate),
            remaining: getTimeRemaining(vtvDate),
            expired: isDateExpired(vtvDate)
        })
    }

    if (extintorDate) {
        alerts.push({
            type: 'extintor',
            icon: isDateExpired(extintorDate) ? '⚠️' : '🧯',
            title: 'Extintor',
            date: formatDate(extintorDate),
            remaining: getTimeRemaining(extintorDate),
            expired: isDateExpired(extintorDate)
        })
    }

    if (serviceKm !== null && serviceKm > 0) {
        alerts.push({
            type: 'service',
            icon: serviceKm < 1000 ? '⚠️' : '🔧',
            title: 'Service',
            date: `${serviceKm.toLocaleString()} km`,
            remaining: serviceKm < 1000 ? 'Próximo a service' : `${serviceKm.toLocaleString()} km restantes`,
            expired: serviceKm < 1000
        })
    }

    if (alerts.length === 0) return null

    return (
        <AlertsContainer>
            {alerts.map(alert => (
                <AlertCard key={alert.type} expired={alert.expired}>
                    <AlertIcon>{alert.icon}</AlertIcon>
                    <AlertInfo>
                        <AlertTitle>{alert.title}</AlertTitle>
                        <AlertDate>{alert.date}</AlertDate>
                        <AlertRemaining expired={alert.expired}>{alert.remaining}</AlertRemaining>
                    </AlertInfo>
                </AlertCard>
            ))}
        </AlertsContainer>
    )
}
