import styled from '@emotion/styled'
import { flex, size } from '@/mixins'
import { Box, Typography } from '@mui/material'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'

export const Container = styled(Box)`
  padding: 2rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  flex: 1;
  
  @media (max-width: 600px) {
    padding: 1.5rem 1rem;
  }
`

export const Header = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;
`

const HeaderLeft = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const HeaderRight = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-left: auto;
`

export const Title = styled(Typography)`
  font-size: 2.25rem;
  font-weight: 700;
  color: #1d1d1f;
  letter-spacing: -0.025em;
  line-height: 1.1;
  
  @media (max-width: 600px) {
    font-size: 1.625rem;
  }
`

export const Subtitle = styled(Typography)`
  font-size: 0.9375rem;
  color: #86868b;
`

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
`

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
`

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
`

export const Card = styled(Box)`
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-align: center;
  position: relative;
  min-height: 140px;
  
  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    border-color: rgba(0, 113, 227, 0.2);
  }
  
  &:active {
    transform: scale(0.99);
  }
`

export const CardPhoto = styled(Box)`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  box-shadow: 0 4px 12px rgba(0, 113, 227, 0.25);
  margin: 0.5rem;
`

export const CardTitle = styled(Typography)`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1d1d1f;
  text-align: center;
`

export const CardSubtitle = styled(Typography)`
  font-size: 0.875rem;
  color: #86868b;
  text-align: center;
`

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
`

export const EmptyState = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  text-align: center;
`

export const ListContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`

export const ListItem = styled(Box)`
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  background: #ffffff;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgba(0, 0, 0, 0.06);
  gap: 0.875rem;
  
  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    border-color: rgba(0, 113, 227, 0.2);
  }
  
  &:active {
    transform: scale(0.99);
  }
`

export const CarIconList = styled(Box)`
    ${flex('column','center','center')}
    ${size('5rem','5rem')}
    flex-shrink: 0;
    border-radius: 16px;
    color: white;
    background: linear-gradient(135deg, #0071e3 0%, #00a0f0 100%);
    box-shadow: 0 4px 12px rgba(0, 113, 227, 0.25);
`

export const CarInfo = styled(Box)`
    ${flex('row','center','flex-start')}
    flex: 1;
    min-width: 0;
    height: 5rem;
    gap: 0.75rem;

    @media (max-width: 600px) {
        flex-direction: column;
        gap: 0.25rem;
    }
`

export const CarName = styled(Typography)`
  font-size: 2rem;
  font-weight: 600;
  color: #1d1d1f;
  @media (max-width: 600px) {
        font-size: 1.6rem;
    }
`

export const CarDetail = styled(Typography)`
  font-size: 1.8rem;
  color: #86868b;
  @media (max-width: 600px) {
        font-size: 1rem;
    }
`

export const ChevronIcon = styled(Box)`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  font-size: 2rem;
  color: #aeaeb2;
`

export const ListAddItem = styled(Box)`
  background: #fafbfc;
  border-radius: 24px;
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
  min-height: 5.5rem;
  
  &:hover {
    border-color: #0071e3;
    color: #0071e3;
    background: #f0f7ff;
  }
`

export const ImageCarPhoto = styled(Box)<{ image: string ; size?: number ; margin?: number }>(
    ({ image, size = 2, margin}) => ({
        width: `${size}rem`,
        height: `${size}rem`,
        margin: `${margin}rem`,
        flexShrink: 0,
        borderRadius: '16px',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: '0 4px 12px rgba(0, 113, 227, 0.25)',
    })
)

export const ImageCarIcon = styled(DirectionsCarIcon)<{ size?: number ; margin?: number} >(
    ({ size = 2, margin }) =>({
        margin: `${margin}rem`,
        fontSize: `${size}rem`,
    })
)

export const CardIcon = styled(Box)<{ size?: number, margin?: number }>(
  ({ size = 3, margin }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: `${size}rem`,
    height: `${size}rem`,
    background: 'linear-gradient(135deg, #0071e3 0%, #00a0f0 100%)',
    borderRadius: '16px',
    color: 'white',
    margin: `${margin}`,
    boxShadow: '0 4px 12px rgba(0, 113, 227, 0.25)',
  })
)

export const ItemList = styled.div`
    ${flex('row','center','space-around')}
    padding: .5rem;
    border-radius: 24px;
    box-shadow: '0 4px 12px rgba(0, 113, 227, 0.25)';
    background-color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        transform: translateY(-2px) scale(1.02);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        border-color: rgba(0, 113, 227, 0.2);
    }
    
    &:active {
        transform: scale(0.99);
    }
`

export const CartStyled = styled(Card)`
    border-radius: 24px;
    border: 1.5px solid #d1d1d6;
    box-shadow: '0 4px 12px rgba(0, 113, 227, 0.25)';
    background-color: white;
`

export const StyledCard = styled(Card)`
  cursor: pointer;
`