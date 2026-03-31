import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'

export const TabsContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 1rem;
  
  @media (max-width: 600px) {
    justify-content: space-around;
    gap: 0.375rem;
    flex-wrap: wrap;
  }
`

export const TabButton = styled(Box)<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  gap: 0.375rem;
  flex: 1;
  background: ${props => props.active ? '#0071e3' : '#f5f5f7'};
  color: ${props => props.active ? 'white' : '#1d1d1f'};
  
  &:hover {
    background: ${props => props.active ? '#0077ed' : '#e8e8ed'};
  }
  
  &:active {
    transform: scale(0.97);
  }
  
  @media (max-width: 600px) {
    flex: none;
    min-width: max-content;
    padding: 0 0.75rem;
  }
`

export const TabLabel = styled.span`
  @media (max-width: 600px) {
    display: none;
  }
`
