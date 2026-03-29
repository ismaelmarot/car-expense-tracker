import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import appIcon from '../../app-car-icon.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5f5f7 0%, #ffffff 100%);
`;

const IconWrapper = styled.div`
  width: 120px;
  height: 120px;
  margin-bottom: 24px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const AppName = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
`;

const Slogan = styled.p`
  font-size: 1rem;
  color: #86868b;
  margin: 0 0 32px 0;
`;

const EnterButton = styled(Button)`
  border-radius: 35px;
  padding: 12px 48px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: none;
  background: #0071e3;
  &:hover {
    background: #0077ed;
  }
`;

interface LoadingScreenProps {
  onEnter: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onEnter }) => {
  return (
    <Container>
      <IconWrapper>
        <img src={appIcon} alt="CarET" />
      </IconWrapper>
      <AppName>Car Expenses Tracker</AppName>
      <Slogan>Gestiona los gastos de tu vehículo</Slogan>
      <EnterButton variant="contained" onClick={onEnter}>
        Ingresar
      </EnterButton>
    </Container>
  );
};

export default LoadingScreen;
