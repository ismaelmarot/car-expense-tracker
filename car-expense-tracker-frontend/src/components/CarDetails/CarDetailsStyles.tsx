import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

export const Container = styled(Box)`
  padding: 2rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  flex: 1;
  
  @media (max-width: 600px) {
    padding: 1.5rem 1rem;
  }
`;

export const Header = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 1rem;
`;

export const HeaderLeft = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const HeaderRight = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

export const CarName = styled(Typography)`
  font-size: 2.25rem;
  font-weight: 700;
  color: #1d1d1f;
  letter-spacing: -0.025em;
  line-height: 1.1;
  
  @media (max-width: 600px) {
    font-size: 1.625rem;
  }
`;

export const BackButton = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  padding: 0 1.25rem;
  background: #0071e3;
  color: white;
  border-radius: 21px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  gap: 0.375rem;
  
  &:hover {
    background: #0077ed;
  }
  
  &:active {
    transform: scale(0.97);
  }
  
  @media (max-width: 480px) {
    height: 38px;
    padding: 0 0.875rem;
    border-radius: 19px;
  }
`;

export const CarInfoCard = styled(Box)`
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  margin-bottom: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: center;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

export const PhotoSection = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 100%;
  justify-content: center;
`;

export const PhotoContainer = styled(Box)`
  width: 100%;
  max-width: 180px;
  aspect-ratio: 1;
  border-radius: 20px;
  background: linear-gradient(135deg, #f5f5f7 0%, #ececf1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  border: 2px solid rgba(0, 0, 0, 0.06);
  position: relative;
  
  &:hover {
    border-color: #0071e3;
    background: linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 100%);
  }
`;

export const PhotoPreview = styled(Box)`
  width: 100%;
  max-width: 180px;
  aspect-ratio: 1;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  position: relative;
  border: 2px solid rgba(0, 0, 0, 0.06);
  cursor: pointer;
  
  &:hover .photo-overlay {
    opacity: 1;
  }
`;

export const PhotoOverlay = styled(Box)`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
`;

export const EditIcon = styled(Box)`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  color: #1d1d1f;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  z-index: 2;
  
  &:hover {
    transform: scale(1.1);
    background: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

export const DetailsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const DetailValue = styled(Typography)`
  font-size: 1.125rem;
  font-weight: 500;
  color: #1d1d1f;
  line-height: 1.4;
`;

export const TabsContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 1rem;
  
  @media (max-width: 600px) {
    overflow-x: auto;
    padding-bottom: 0.5rem;
    
    &::-webkit-scrollbar {
      height: 4px;
    }
    
    &::-webkit-scrollbar-track {
      background: #f5f5f7;
      border-radius: 2px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: #d1d1d6;
      border-radius: 2px;
    }
  }
`;

export const TabButton = styled(Box)<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 1rem;
  background: ${props => props.active ? '#0071e3' : '#f5f5f7'};
  color: ${props => props.active ? 'white' : '#1d1d1f'};
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  gap: 0.375rem;
  flex: 1;
  
  &:hover {
    background: ${props => props.active ? '#0077ed' : '#e8e8ed'};
  }
  
  &:active {
    transform: scale(0.97);
  }
  
  @media (max-width: 600px) {
    flex: none;
    min-width: max-content;
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const LoadingContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  text-align: center;
`;

export const ErrorContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  text-align: center;
`;