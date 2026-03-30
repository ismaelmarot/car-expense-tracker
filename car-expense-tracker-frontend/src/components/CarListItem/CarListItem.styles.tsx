import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'

export const ListItemStyled = styled(Box)`
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  background: #ffffff;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgba(0, 0, 0, 0.04);
  gap: 0.875rem;
  
  &:hover {
    background: #fafbfc;
    border-color: rgba(0, 113, 227, 0.2);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  }
  
  &:active {
    transform: scale(0.995);
    background: #f5f5f7;
  }
`

export const CarIcon = styled(Box)`
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #0071e3 0%, #00a0f0 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 113, 227, 0.25);
`

export const CarInfo = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 0;
`

export const CarName = styled(Typography)`
  font-size: 0.9375rem;
  font-weight: 600;
  color: #1d1d1f;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -0.01em;
`

export const CarDetail = styled(Typography)`
  font-size: 0.8125rem;
  color: #86868b;
  font-weight: 400;
`

export const ChevronIcon = styled(Box)`
  color: #aeaeb2;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  transition: transform 0.2s ease;
  
  ${ListItemStyled}:hover & {
    transform: translateX(2px);
    color: #0071e3;
  }
`

export interface CarListItemProps {
  car: {
    id: number;
    brand: string;
    model: string;
    year: number;
    vin: string;
  }
  onClick: () => void;
}
