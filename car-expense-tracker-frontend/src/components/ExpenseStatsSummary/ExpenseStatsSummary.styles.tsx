import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'

export const SummaryGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`

export const SummaryCard = styled(Box)`
  background: #ffffff;
  border-radius: 16px;
  padding: 1.25rem;
  border: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    border-color: rgba(0, 113, 227, 0.2);
  }
`

export const SummaryIcon = styled(Box)`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
`

export const SummaryLabel = styled(Typography)`
  font-size: 0.8125rem;
  color: #86868b;
  font-weight: 500;
`

export const SummaryValue = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1d1d1f;
  letter-spacing: -0.02em;
`