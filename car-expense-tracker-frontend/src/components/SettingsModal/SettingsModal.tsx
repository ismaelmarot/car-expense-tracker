import CloseIcon from '@mui/icons-material/Close'
import { LanguageSelector } from '../LanguageSelector/LanguageSelector'
import { useLanguage } from '../../contexts/LanguageContext'
import { SettingsModalProps } from '@/interfaces'
import { CloseButton, ContentStyled, DialogStyled, TitleStyled } from './SetttingModal.styles'

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