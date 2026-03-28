import React from 'react';
import { Box, Typography } from '@mui/material';
import { SnackBarNotificationInterface } from '../../interfaces/SnackBarNotificationInterface';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import styled from '@emotion/styled';

const Overlay = styled(Box)`
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
`;

const Popup = styled(Box)`
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
`;

const IconContainer = styled(Box)<{ severity: 'success' | 'error' | 'warning' | 'info' }>`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${props => {
    switch(props.severity) {
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
`;

const Title = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 0.5rem;
`;

const Message = styled(Typography)`
  font-size: 0.9375rem;
  color: #86868b;
  line-height: 1.4;
`;

const SnackbarNotification: React.FC<SnackBarNotificationInterface> = ({ open, message, severity, onClose }) => {
    const title = severity === 'success' ? '¡Éxito!' : 'Error';
    
    return (
        <Overlay 
            className={open ? 'open' : ''} 
            onClick={onClose}
        >
            <Popup className={open ? 'open' : ''} onClick={(e) => e.stopPropagation()}>
                <IconContainer severity={severity}>
                    {severity === 'success' ? (
                        <CheckCircleIcon sx={{ fontSize: 32, color: '#34c759' }} />
                    ) : (
                        <ErrorIcon sx={{ fontSize: 32, color: '#ff3b30' }} />
                    )}
                </IconContainer>
                <Title>{title}</Title>
                <Message>{message}</Message>
            </Popup>
        </Overlay>
    );
};

export default SnackbarNotification;