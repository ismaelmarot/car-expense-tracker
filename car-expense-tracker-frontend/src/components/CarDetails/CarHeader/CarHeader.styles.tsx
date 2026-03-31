import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'

export const Header = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 1rem;
`

export const HeaderLeft = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`

export const HeaderRight = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`

export const PhotoWrapper = styled(Box)`
  width: 72px;
  height: 72px;
  border-radius: 16px;
  overflow: hidden;
  flex-shrink: 0;
  background: linear-gradient(135deg, #f5f5f7 0%, #ececf1 100%);
  position: relative;
  cursor: pointer;
  
  &:hover .photo-overlay {
    opacity: 1;
  }
  
  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    border-radius: 14px;
  }
`

export const PhotoImage = styled(Box)`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
`

export const PhotoEditOverlay = styled(Box)`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
`

export const PhotoPlaceholder = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f5f7 0%, #ececf1 100%);
`

export const CarInfo = styled(Box)`
  flex: 1;
  min-width: 0;
`

export const CarName = styled(Typography)`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1d1d1f;
  line-height: 1.3;
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`

export const CarInfoText = styled(Typography)`
  font-size: 0.8125rem;
  color: #86868b;
  margin-top: 0.125rem;
`

export const IconButton = styled(Box)<{ color: string }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.color === '#ff3b30' ? '#fff5f5' : '#f5f5f7'};
  font-size: 0.875rem;
  
  &:hover {
    background: ${props => props.color === '#ff3b30' ? '#ffe5e5' : '#e8e8ed'};
    transform: scale(1.05);
  }
`
