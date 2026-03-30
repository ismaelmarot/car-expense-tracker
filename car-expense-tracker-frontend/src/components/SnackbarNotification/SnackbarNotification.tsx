import { SnackBarNotificationInterface } from '@/interfaces'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import {
  Overlay,
  Popup,
  IconContainer,
  Title,
  Message
} from './SnackbarNotification.stlyes'

export const SnackbarNotification: React.FC<SnackBarNotificationInterface> = ({
  open,
  message,
  severity,
  onClose
}) => {
  const title = severity === 'success' ? '¡Éxito!' : 'Error'

  return (
    <Overlay className={open ? 'open' : ''} onClick={onClose}>
      <Popup className={open ? 'open' : ''} onClick={(e) => e.stopPropagation()}>
        <IconContainer severity={severity}>
          {severity === 'success' ? (
            <CheckCircleIcon sx={{ fontSize: 32, color: '#34c759' }} />
          ) : (
            <ErrorIcon sx={{ fontSize: 32, color: '#ff3b30' }} />
          )}
        </IconContainer>

        <Title>{title}</Title>
        <Message>{message}</Message>
      </Popup>
    </Overlay>
  )
}