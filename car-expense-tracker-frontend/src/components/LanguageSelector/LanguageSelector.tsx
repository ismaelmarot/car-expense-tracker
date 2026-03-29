import React from 'react';
import { Box, Typography } from '@mui/material';
import { useLanguage } from '../../contexts/LanguageContext';
import styled from '@emotion/styled';

const Container = styled(Box)`
  background: white;
  border-radius: 16px;
  padding: 1.25rem;
  margin-bottom: 1rem;
`;

const Title = styled(Typography)`
  font-size: 0.875rem;
  font-weight: 600;
  color: #86868b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
`;

const Options = styled(Box)`
  display: flex;
  gap: 0.75rem;
`;

const Option = styled(Box)<{ selected: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1rem;
  border-radius: 35px;
  background: ${props => props.selected ? '#0071e3' : '#f5f5f7'};
  color: ${props => props.selected ? 'white' : '#1d1d1f'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.selected ? '#0077ed' : '#e8e8ed'};
  }
`;

const CheckIcon = styled.span<{ selected: boolean }>`
  opacity: ${props => props.selected ? 1 : 0};
  font-size: 1rem;
`;

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <Container>
      <Title>{t('language')}</Title>
      <Options>
        <Option 
          selected={language === 'es'} 
          onClick={() => setLanguage('es')}
        >
          <Typography sx={{ fontWeight: 500 }}>Español</Typography>
          <CheckIcon selected={language === 'es'}>✓</CheckIcon>
        </Option>
        <Option 
          selected={language === 'en'} 
          onClick={() => setLanguage('en')}
        >
          <Typography sx={{ fontWeight: 500 }}>English</Typography>
          <CheckIcon selected={language === 'en'}>✓</CheckIcon>
        </Option>
      </Options>
    </Container>
  );
};

export default LanguageSelector;
