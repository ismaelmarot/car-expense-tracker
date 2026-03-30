import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { CarListItemProps } from '@/interfaces'
import {
  CarDetail,
  CarIcon,
  CarInfo,
  CarName,
  ChevronIcon,
  ListItemStyled
} from './CarListItem.styles'

export const CarListItem: React.FC<CarListItemProps> = ({ car, onClick }) => {
  return (
    <ListItemStyled onClick={onClick}>
      <CarIcon>
        <DirectionsCarIcon sx={{ fontSize: 24 }} />
      </CarIcon>
      <CarInfo>
        <CarName>{car.brand} {car.model}</CarName>
        <CarDetail>{car.year} • {car.vin}</CarDetail>
      </CarInfo>
      <ChevronIcon>
        <ChevronRightIcon sx={{ fontSize: 22 }} />
      </ChevronIcon>
    </ListItemStyled>
  )
}