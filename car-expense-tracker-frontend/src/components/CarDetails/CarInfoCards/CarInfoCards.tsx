import React from 'react'
import { CarInterface } from '@/interfaces'
import { useLanguage } from '../../../contexts/LanguageContext'
import { 
    InfoGrid,
    InfoGridSecondRow,
    DetailItem,
    DetailLabel,
    DetailValue,
    AlertBadge,
    ServiceBadge
} from './CarInfoCards.styles'

interface CarInfoCardsProps {
    car: CarInterface
    currentKm: number | null
    serviceKmRemaining: number | null
    formatDate: (dateStr: string | undefined) => string
    isDateExpired: (dateStr: string | undefined) => boolean
    formatNextDueDate: (dateStr: string | undefined) => string
    getTimeRemaining: (dateStr: string | undefined) => string
}

export const CarInfoCards: React.FC<CarInfoCardsProps> = ({
    car,
    currentKm,
    serviceKmRemaining,
    formatDate,
    isDateExpired,
    formatNextDueDate,
    getTimeRemaining
}) => {
    const { t } = useLanguage()
    
    const vtvExpired = isDateExpired(car.vtv_date)
    const extintorExpired = isDateExpired(car.extintor_date)
    
    return (
        <>
            <InfoGrid>
                <DetailItem>
                    <DetailLabel>{t('vin')}</DetailLabel>
                    <DetailValue>{car.vin || '-'}</DetailValue>
                </DetailItem>
                <DetailItem>
                    <DetailLabel>{t('currentKm')}</DetailLabel>
                    <DetailValue>{currentKm?.toLocaleString() || '0'} km</DetailValue>
                </DetailItem>
                <DetailItem>
                    <DetailLabel>{t('lastOilChange')}</DetailLabel>
                    <DetailValue>{car.last_service_km?.toLocaleString() || '-'} km</DetailValue>
                </DetailItem>
                <DetailItem>
                    <DetailLabel>{t('serviceInterval')}</DetailLabel>
                    <DetailValue>{car.service_interval_km?.toLocaleString() || '10.000'} km</DetailValue>
                </DetailItem>
                <DetailItem>
                    <DetailLabel>{t('nextServiceKm')}</DetailLabel>
                    <ServiceBadge remaining={serviceKmRemaining || 0}>
                        {serviceKmRemaining?.toLocaleString() || '-'} km
                    </ServiceBadge>
                </DetailItem>
                <DetailItem>
                    <DetailLabel>{t('nextOilChange')}</DetailLabel>
                    <DetailValue style={{ 
                        color: (serviceKmRemaining || 0) < 1000 ? '#ff3b30' : '#1d1d1f',
                        fontWeight: (serviceKmRemaining || 0) < 1000 ? 600 : 400
                    }}>
                        {((car.last_service_km || 0) + (car.service_interval_km || 10000)).toLocaleString()} km
                    </DetailValue>
                </DetailItem>
            </InfoGrid>
            
            <InfoGridSecondRow>
                <DetailItem>
                    <DetailLabel>VTV</DetailLabel>
                    {vtvExpired ? (
                        <AlertBadge expired={true}>
                            VENCIDA - Próxima: {formatNextDueDate(car.vtv_date)}
                        </AlertBadge>
                    ) : (
                        <DetailValue style={{ 
                            color: isDateExpired(car.vtv_date) ? '#ff3b30' : '#1d1d1f'
                        }}>
                            {formatDate(car.vtv_date)} - {getTimeRemaining(car.vtv_date)}
                        </DetailValue>
                    )}
                </DetailItem>
                <DetailItem>
                    <DetailLabel>{t('extintor')}</DetailLabel>
                    {extintorExpired ? (
                        <AlertBadge expired={true}>
                            VENCIDO - Próxima: {formatNextDueDate(car.extintor_date)}
                        </AlertBadge>
                    ) : (
                        <DetailValue style={{ 
                            color: isDateExpired(car.extintor_date) ? '#ff3b30' : '#1d1d1f'
                        }}>
                            {formatDate(car.extintor_date)} - {getTimeRemaining(car.extintor_date)}
                        </DetailValue>
                    )}
                </DetailItem>
            </InfoGridSecondRow>
        </>
    )
}
