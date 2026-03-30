import styled from '@emotion/styled'
import { Snackbar, Alert, Backdrop, Box, Typography } from '@mui/material'
import { flex } from '../../mixins/setFlex'
import { size } from '../../mixins/setSize'
import { GeneralColors } from '../../constants/GeneralColors'

export const BackdropStyled = styled(Backdrop)`
    z-index: 1301;
    color: ${GeneralColors.white};
    background-color: ${GeneralColors.black};
`

export const SnackbarStyled = styled(Snackbar)`
    height: 90%;
`

export const  AlertStyled = styled(Alert)`
    ${flex('column','center','center')}
    ${size('8rem','100%')}
    border: 3px solid ${GeneralColors.grey}; 
    background-color: ${GeneralColors.white}; 
`

export const Overlay = styled(Box)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1300;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  
  &.open {
    opacity: 1;
    visibility: visible;
  }
`

export const Popup = styled(Box)`
  background: #ffffff;
  border-radius: 20px;
  padding: 2rem;
  max-width: 320px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  transform: scale(0.9);
  transition: transform 0.2s ease;
  
  &.open {
    transform: scale(1);
  }
`

export const IconContainer = styled(Box)<{ severity: 'success' | 'error' | 'warning' | 'info' }>`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({ severity }) => {
    switch (severity) {
      case 'success': return '#e8f5e9';
      case 'error': return '#ffebee';
      case 'warning': return '#fff3e0';
      case 'info': return '#e8f4fd';
      default: return '#f5f5f7';
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
`

export const Title = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 0.5rem;
`

export const Message = styled(Typography)`
  font-size: 0.9375rem;
  color: #86868b;
  line-height: 1.4;
`