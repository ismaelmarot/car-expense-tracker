import { Icons } from '@/constants'
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
        <Icons.Car sx={{ fontSize: 24 }} />
      </CarIcon>
      <CarInfo>
        <CarName>{car.brand} {car.model}</CarName>
        <CarDetail>{car.year} • {car.vin}</CarDetail>
      </CarInfo>
      <ChevronIcon>
        <Icons.ChevronRight sx={{ fontSize: 22 }} />
      </ChevronIcon>
    </ListItemStyled>
  )
}