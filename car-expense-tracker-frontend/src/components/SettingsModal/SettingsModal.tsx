import CloseIcon from '@mui/icons-material/Close'
import { useLanguage } from '@/contexts'
import { SettingsModalProps } from '@/interfaces'
import { LanguageSelector } from '@/components'
import {
  CloseButton,
  ContentStyled,
  DialogStyled,
  TitleStyled
} from './SetttingModal.styles'

export const SettingsModal: React.FC<SettingsModalProps> = ({ open, onClose }) => {
  const { t } = useLanguage()
  
  return (
    <DialogStyled open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <TitleStyled>
        {t('settings')}
        <CloseButton onClick={onClose} size='small'>
          <CloseIcon fontSize='small' />
        </CloseButton>
      </TitleStyled>
      <ContentStyled>
        <LanguageSelector />
      </ContentStyled>
    </DialogStyled>
  )
}