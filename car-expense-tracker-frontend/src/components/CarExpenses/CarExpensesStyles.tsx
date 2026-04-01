import styled from '@emotion/styled';
import { Grid, Typography, Box } from '@mui/material';

export const GridTotalAmount = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TotalAmount = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding: 0.3rem 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  background: linear-gradient(135deg, #1d1d1f 0%, #2c2c2e 100%);
  border-radius: 14px;
`;

export const Container = styled(Box)`
  width: 100%;
  background: #ffffff;
  border-radius: 35px 35px 14px 14px;
  overflow: hidden;
`;

export const TotalCard = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #1d1d1f 0%, #2c2c2e 100%);
  border-radius: 35px;
  padding: 1rem 1.25rem;
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const TotalLabel = styled(Typography)`
  font-size: 0.9375rem;
  color: #aeaeb2;
`;

export const TotalAmountNew = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
`;

export const ExpenseList = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
`;

export const TableHeader = styled(Box)`
  display: none;
  padding: 0.5rem 1.25rem;
  background: #ffffff;
  position: sticky;
  top: 0;
  z-index: 5;
  
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 60px 70px 90px 80px;
    gap: 1.5rem;
  }
`;

export const HeaderCell = styled(Box)`
  font-size: 0.6875rem;
  font-weight: 600;
  color: #86868b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  user-select: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: #1d1d1f;
  }
  
  &:nth-of-type(1) { text-align: left; }
  &:nth-of-type(2) { text-align: center; }
  &:nth-of-type(3) { text-align: center; }
  &:nth-of-type(4) { text-align: right; }
  &:nth-of-type(5) { text-align: right; }
`;

export const ExpenseItem = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: #ffffff;
  padding: 0.875rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.07);
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 35px !important;
  
  &:hover {
    border-color: rgba(0, 0, 0, 0.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  }

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 60px 70px 90px 80px;
    gap: 1.5rem;
    padding: 0.75rem 1.25rem;
    border-radius: 12px;
    align-items: center;
  }
`;

export const ExpenseName = styled(Typography)`
  font-size: 0.9375rem;
  font-weight: 500;
  color: #1d1d1f;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ExpenseCategory = styled(Box)`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;

export const ExpenseKm = styled(Typography)`
  display: none;
  font-size: 0.8125rem;
  color: #86868b;
  text-align: center;
  white-space: nowrap;

  @media (min-width: 768px) {
    display: block;
  }
`;

export const ExpenseDate = styled(Typography)`
  display: none;
  font-size: 0.8125rem;
  color: #86868b;
  text-align: right;
  white-space: nowrap;

  @media (min-width: 768px) {
    display: block;
  }
`;

export const ExpensePrice = styled(Typography)`
  display: none;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #1d1d1f;
  text-align: right;
  white-space: nowrap;

  @media (min-width: 768px) {
    display: block;
  }
`;

export const MobileDate = styled(Typography)`
  font-size: 0.8125rem;
  color: #86868b;
  text-align: right;
  white-space: nowrap;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const EmptyState = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem;
  text-align: center;
`;

export const EmptyIcon = styled(Box)`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background: #f5f5f7;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

export const EmptyText = styled(Typography)`
  font-size: 0.9375rem;
  color: #86868b;
`;

export const PopupOverlay = styled(Box)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1.5rem;
`;

export const PopupCard = styled(Box)`
  background: #ffffff;
  border-radius: 20px;
  width: 100%;
  max-width: 340px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  position: relative;
`;

export const PopupHeader = styled(Box)`
  background: linear-gradient(135deg, #1d1d1f 0%, #2c2c2e 100%);
  padding: 1.5rem;
  text-align: center;
`;

export const PopupTitle = styled(Typography)`
  font-size: 1.125rem;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
  word-break: break-word;
`;

export const PopupContent = styled(Box)`
  padding: 1.5rem;
`;

export const DetailRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  
  &:last-child {
    border-bottom: none;
  }
`;

export const DetailLabel = styled(Typography)`
  font-size: 0.875rem;
  color: #86868b;
`;

export const DetailValue = styled(Typography)`
  font-size: 0.9375rem;
  font-weight: 500;
  color: #1d1d1f;
`;

export const CategoryBadge = styled(Box)<{ category: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${props => {
    switch (props.category.toLowerCase()) {
      case 'combustible': return '#fff3e0';
      case 'mantenimiento': return '#e3f2fd';
      case 'service': return '#e8f5e9';
      case 'reparacion': return '#ffebee';
      case 'repuestos': return '#e0f7fa';
      case 'neumaticos': return '#fce4ec';
      case 'seguro': return '#f3e5f5';
      case 'patente': return '#fff8e1';
      case 'vtv': return '#efebe9';
      case 'estacionamiento': return '#f1f8e9';
      case 'peajes': return '#e8eaf6';
      case 'lavado': return '#e0f2f1';
      case 'multas': return '#fbe9e7';
      case 'accesorios': return '#f5f5f5';
      default: return '#f5f5f7';
    }
  }};
  color: ${props => {
    switch (props.category.toLowerCase()) {
      case 'combustible': return '#e65100';
      case 'mantenimiento': return '#1565c0';
      case 'service': return '#2e7d32';
      case 'reparacion': return '#c62828';
      case 'repuestos': return '#00838f';
      case 'neumaticos': return '#c2185b';
      case 'seguro': return '#7b1fa2';
      case 'patente': return '#ff8f00';
      case 'vtv': return '#5d4037';
      case 'estacionamiento': return '#558b2f';
      case 'peajes': return '#3949ab';
      case 'lavado': return '#00695c';
      case 'multas': return '#d84315';
      case 'accesorios': return '#616161';
      default: return '#86868b';
    }
  }};
`;

export const PopupActions = styled(Box)`
  display: flex;
  gap: 0.75rem;
  padding: 1rem 1.5rem 1.5rem;
`;

export const PopupButton = styled(Box)<{ variant?: 'edit' | 'delete' }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 12px 16px;
  border-radius: 35px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.variant === 'edit' ? `
    background: #0071e3;
    color: #ffffff;
    &:hover { background: #0077ed; }
  ` : `
    background: #fff0f0;
    color: #ff3b30;
    &:hover { background: #ffe4e4; }
  `}
`;

export const CloseButton = styled(Box)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

export const PriceValue = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1d1d1f;
`;

export const PopupPriceSection = styled(Box)`
  text-align: center;
  padding: 1rem;
  background: #f5f5f7;
  border-radius: 14px;
  margin-bottom: 1rem;
`;

export const PriceLabel = styled(Typography)`
  font-size: 0.75rem;
  color: #86868b;
  margin-bottom: 0.25rem;
`;

export const PhotosSection = styled(Box)`
  display: flex;
  gap: 0.625rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

export const PhotoThumb = styled(Box)<{ src: string }>`
  width: 80px;
  height: 80px;
  border-radius: 14px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  
  &:hover {
    transform: scale(1.04);
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export const PhotosLabel = styled(Typography)`
  font-size: 0.8125rem;
  color: #86868b;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

export const PhotoViewerOverlay = styled(Box)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

export const PhotoViewerImage = styled('img')<{ zoomed?: boolean }>`
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 8px;
  cursor: ${props => props.zoomed ? 'zoom-out' : 'zoom-in'};
  transition: transform 0.3s ease;
  transform: ${props => props.zoomed ? 'scale(2)' : 'scale(1)'};
  
  &:hover {
    transform: ${props => props.zoomed ? 'scale(2)' : 'scale(1.05)'};
  }
`;

export const PhotoViewerClose = styled(Box)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

export const PhotoViewerNav = styled(Box)<{ side: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${props => props.side === 'left' ? 'left: 1rem;' : 'right: 1rem;'}
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-50%) scale(1.1);
  }
`;

export const PhotoViewerCounter = styled(Box)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: white;
  font-size: 0.875rem;
`;
