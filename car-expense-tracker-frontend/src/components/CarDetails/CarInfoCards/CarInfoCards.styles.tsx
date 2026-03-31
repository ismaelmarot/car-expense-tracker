import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'

export const Section = styled(Box)`
  margin-bottom: 1.25rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`

export const SectionTitle = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #0071e3;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(0, 113, 227, 0.1);
`

export const InfoGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`

export const InfoGridSecondRow = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`

export const DetailItem = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`

export const DetailLabel = styled(Typography)`
  font-size: 0.6875rem;
  font-weight: 500;
  color: #86868b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const DetailValue = styled(Typography)`
  font-size: 0.9375rem;
  font-weight: 500;
  color: #1d1d1f;
  line-height: 1.2;
`

export const AlertBadge = styled(Box)<{ expired: boolean }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${props => props.expired ? '#fff5f5' : '#f5f5f7'};
  color: ${props => props.expired ? '#ff3b30' : '#86868b'};
  border: 1px solid ${props => props.expired ? '#ffe5e5' : 'transparent'};
`

export const ServiceBadge = styled(Box)<{ remaining: number }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 500;
  background: ${props => props.remaining < 1000 ? '#fff5f5' : '#f5f5f7'};
  color: ${props => props.remaining < 1000 ? '#ff3b30' : '#1d1d1f'};
  border: 1px solid ${props => props.remaining < 1000 ? '#ffe5e5' : 'transparent'};
`
