import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import { GeneralColors } from '../../constants/GeneralColors'
import { flex } from '../../mixins/setFlex'
import { size } from '../../mixins/setSize'

// export const GeneralContainer = styled(Grid)`
//     margin-bottom: 3rem;
// `;

// export const Container = styled(Grid)`
//     margin: 2rem 1rem;
// `;

// export const Title = styled(Grid)`
//     margin: 0 .5rem;
//     border-radius: 3px;
//     background-color: ${GeneralColors.blue};
// `;

// export const TypographyStyled = styled(Typography)`
//     font-size: 2rem;
//     font-weight: bold;
//     color: ${GeneralColors.white};
// `;

// export const LinkCard = styled(Link)`
//     ${flex('column', 'center', 'center')}
//     ${size('100%', '100%')}
//     text-decoration: none;
//     transition: all 0.3s ease;
// `;

// export const LinkAddCarCard = styled(Link)`
//     ${size('100%', '100%')}
//     text-decoration: none;
//     transition: all 0.3s ease;
//     display: block;
// `;

// export const CardStyled = styled(Grid)`
//     ${size('100%', '300px')}
//     background-color: ${GeneralColors.white};
//     border: 3px solid ${GeneralColors.grey};
//     border-radius: 5px;
//     transition: all 0.3s ease;
//     &:hover {
//         border-color: ${GeneralColors.blue};
//     }
// `;
import { Box, Typography } from '@mui/material'
import styled from '@emotion/styled'


export const Container = styled(Box)`
  padding: 2rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  flex: 1;
  border: 3px solid red;
  
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
  flex-wrap: wrap;
`;

const HeaderLeft = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const HeaderRight = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

export const Title = styled(Typography)`
  font-size: 2.25rem;
  font-weight: 700;
  color: #1d1d1f;
  letter-spacing: -0.025em;
  line-height: 1.1;
  
  @media (max-width: 600px) {
    font-size: 1.625rem;
  }
`;

export const Subtitle = styled(Typography)`
  font-size: 0.9375rem;
  color: #86868b;
`;

export const IconBtn = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background: #f5f5f7;
  color: #86868b;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgba(0, 0, 0, 0.04);
  
  &:hover {
    background: #e8e8ed;
    color: #1d1d1f;
  }
  
  @media (max-width: 480px) {
    width: 38px;
    height: 38px;
    border-radius: 19px;
  }
`;

export const PrimaryBtn = styled(Box)`
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

export const CardsGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled(Box)`
  background: #ffffff;
  border-radius: 16px;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  min-height: 140px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    border-color: rgba(0, 113, 227, 0.2);
  }
  
  &:active {
    transform: scale(0.99);
  }
`;

export const CardIcon = styled(Box)`
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #0071e3 0%, #00a0f0 100%);
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 113, 227, 0.25);
`;

export const CardTitle = styled(Typography)`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1d1d1f;
  margin-top: 0.5rem;
`;

export const CardSubtitle = styled(Typography)`
  font-size: 0.875rem;
  color: #86868b;
  margin-top: 0.25rem;
`;

export const AddCard = styled(Box)`
  background: #fafbfc;
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1.5px dashed #d1d1d6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 140px;
  color: #86868b;
  
  &:hover {
    border-color: #0071e3;
    color: #0071e3;
    background: linear-gradient(135deg, #f0f7ff 0%, #e8f5fe 100%);
  }
`;

export const EmptyState = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  text-align: center;
`;

export const ListContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

export const ListItem = styled(Box)`
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
`;

export const CarIconList = styled(Box)`
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
`;

export const CarInfo = styled(Box)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  min-width: 0;
`;

export const CarName = styled(Typography)`
  font-size: 0.9375rem;
  font-weight: 600;
  color: #1d1d1f;
`;

export const CarDetail = styled(Typography)`
  font-size: 0.8125rem;
  color: #86868b;
`;

export const ChevronIcon = styled(Box)`
  color: #aeaeb2;
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const ListAddItem = styled(Box)`
  background: #fafbfc;
  border-radius: 14px;
  padding: 1rem 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1.5px dashed #d1d1d6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #86868b;
  font-size: 0.9375rem;
  font-weight: 500;
  
  &:hover {
    border-color: #0071e3;
    color: #0071e3;
    background: #f0f7ff;
  }
`;