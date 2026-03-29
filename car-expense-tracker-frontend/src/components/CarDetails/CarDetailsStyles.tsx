import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

export const Container = styled(Box)`
  padding: 2rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  box-sizing: border-box;
  
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
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.04);
  margin-bottom: 1.5rem;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const CardHeader = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: rgba(0, 113, 227, 0.03);
  }
`;

export const CardHeaderCollapsed = styled(Box)`
  display: flex;
  align-items: center;
`;

export const CardHeaderInfo = styled(Box)`
  flex: 1;
  margin-left: 1rem;
  min-width: 0;
`;

export const PhotoWrapper = styled(Box)`
  width: 72px;
  height: 72px;
  border-radius: 16px;
  overflow: hidden;
  flex-shrink: 0;
  background: linear-gradient(135deg, #f5f5f7 0%, #ececf1 100%);
  position: relative;
  
  &:hover .photo-overlay {
    opacity: 1;
  }
  
  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    border-radius: 14px;
  }
`;

export const PhotoImage = styled(Box)`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
`;

export const PhotoEditOverlay = styled(Box)`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
`;

export const PhotoPlaceholder = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f5f7 0%, #ececf1 100%);
`;

export const CardInfo = styled(Box)`
  flex: 1;
  margin-left: 1rem;
  min-width: 0;
`;

export const CardTitle = styled(Typography)`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1d1d1f;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const CardSubtitle = styled(Typography)`
  font-size: 0.8125rem;
  color: #86868b;
  margin-top: 0.125rem;
`;

export const CardMeta = styled(Typography)`
  font-size: 0.8125rem;
  color: #86868b;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '';
    display: inline-block;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #aeaeb2;
  }
  
  &:first-of-type::before {
    display: none;
  }
`;

export const ExpandIcon = styled(Box)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f7;
  color: #86868b;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
`;

export const CardExpandedContent = styled(Box)<{ expanded: boolean }>`
  display: ${props => props.expanded ? 'block' : 'none'};
  animation: ${props => props.expanded ? 'slideDown 0.3s ease' : 'none'};
  '@keyframes slideDown': {
    from: { opacity: 0, transform: 'translateY(-10px)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  }
  height: calc(100vh - 240px);
  max-height: 400px;
  overflow-y: auto;
  padding: 1.5rem;
  margin-top: 0.5rem;
  
  @media (max-height: 600px) {
    height: calc(100vh - 180px);
    max-height: 300px;
  }
  
  @media (max-width: 480px) {
    height: calc(100vh - 200px);
    max-height: 350px;
  }
`;

export const DetailGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
`;

export const DetailGridSecondRow = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

export const DetailGridThreeColumns = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

export const DetailItem = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

export const DetailLabel = styled(Typography)`
  font-size: 0.6875rem;
  font-weight: 500;
  color: #86868b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const DetailValue = styled(Typography)`
  font-size: 0.9375rem;
  font-weight: 500;
  color: #1d1d1f;
  line-height: 1.2;
`;

export const ActionButtons = styled(Box)`
  display: flex;
  justify-content: flex-end;
  gap: 0.625rem;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
`;

export const EditButton = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: #0071e3;
  color: white;
  border-radius: 34px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #0077ed;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export const DeleteButton = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: transparent;
  color: #ff3b30;
  border: 1px solid rgba(255, 59, 48, 0.2);
  border-radius: 34px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #ff3b30;
    color: white;
    border-color: #ff3b30;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export const PhotoSection = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex-shrink: 0;
`;

export const PhotoContainer = styled(Box)`
  width: 160px;
  height: 160px;
  border-radius: 20px;
  background: linear-gradient(135deg, #f5f5f7 0%, #ececf1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
  border: 2px solid rgba(0, 0, 0, 0.06);
  position: relative;
  
  &:hover {
    border-color: #0071e3;
    background: linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 100%);
  }
  
  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
    border-radius: 14px;
  }
`;

export const PhotoPreview = styled(Box)`
  width: 160px;
  height: 160px;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  position: relative;
  border: 2px solid rgba(0, 0, 0, 0.06);
  cursor: pointer;
  overflow: hidden;
  
  &:hover .photo-overlay {
    opacity: 1;
  }
  
  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
    border-radius: 14px;
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
  
  @media (max-width: 600px) {
    border-radius: 14px;
  }
`;

export const EditIcon = styled(Box)`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
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
  
  @media (max-width: 600px) {
    width: 26px;
    height: 26px;
    bottom: 4px;
    right: 4px;
  }
`;

export const DetailsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  flex: 1;
`;

export const DetailRow = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  
  &:last-of-type {
    border-bottom: none;
  }
`;

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
`;

export const TabButton = styled(Box)`
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
  
  &:active {
    transform: scale(0.97);
  }
  
  @media (max-width: 600px) {
    flex: none;
    min-width: max-content;
    padding: 0 0.75rem;
  }
`;

export const TabLabel = styled.span`
  @media (max-width: 600px) {
    display: none;
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

export const TabContent = styled(Box)`
  margin-top: 1rem;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 0;
`;

export const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const FormRow = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const InputGroup = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const InputLabel = styled.label`
  font-size: 0.8125rem;
  font-weight: 500;
  color: #86868b;
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 34px;
  font-size: 0.9375rem;
  background: #f5f5f7;
  color: #1d1d1f;
  outline: none;
  transition: all 0.2s ease;
  
  &:focus {
    background: white;
    border-color: #0071e3;
    box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.1);
  }
  
  &::placeholder {
    color: #aeaeb2;
  }
`;
