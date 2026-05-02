import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'

export const Container = styled(Box)`
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
  
  @media (max-width: 600px) {
    padding: 1rem;
  }
`

export const Header = styled(Box)`
  margin-bottom: 1.5rem;
`

export const Title = styled(Typography)`
  font-size: 1.75rem;
  font-weight: 700;
  color: #1d1d1f;
  letter-spacing: -0.02em;
  margin-bottom: 0.25rem;
  
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`

export const Subtitle = styled(Typography)`
  font-size: 0.9375rem;
  color: #86868b;
`

export const ChartsGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

export const ChartCard = styled(Box)`
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  }
`

export const ChartTitle = styled(Typography)`
  font-size: 1rem;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 1rem;
`

export const ChartContainer = styled(Box)`
  height: 250px;
  position: relative;
`

export const StatsGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`

export const StatCard = styled(Box)`
  background: #ffffff;
  border-radius: 16px;
  padding: 1.25rem;
  border: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }
`

export const StatValue = styled(Typography)`
  font-size: 1.75rem;
  font-weight: 700;
  color: #0071e3;
`

export const StatLabel = styled(Typography)`
  font-size: 0.875rem;
  color: #86868b;
  font-weight: 500;
`

export const LoadingContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  text-align: center;
`

export const EmptyState = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  text-align: center;
  background: #f5f5f7;
  border-radius: 16px;
`

export const EmptyIcon = styled(Box)`
  font-size: 3rem;
  margin-bottom: 1rem;
`

export const EmptyTitle = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 0.5rem;
`

export const EmptyText = styled(Typography)`
  font-size: 0.9375rem;
  color: #86868b;
`
