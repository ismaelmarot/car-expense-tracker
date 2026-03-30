import appIcon from '../../app-car-icon.png'
import { LoadingScreenProps } from '@/interfaces'
import {
  AppName,
  Container,
  EnterButton,
  IconWrapper,
  Slogan
} from './LoadingScreen.styles'

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onEnter }) => {
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
  )
}