import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material'
import { useLanguage } from '@/contexts'
import { LegalModalProps } from '@/interfaces'
import { APP_VERSION } from '@/constants'
import { ButtonStyled, TextStyled } from './LegalModal.styles'

export const LegalModal: React.FC<LegalModalProps> = ({ open, onClose }) => {
  const { t } = useLanguage()
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>{t('legalTerms')}</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {t('version')}: {APP_VERSION}
        </Typography>
        <TextStyled>
          {t('legalText1')}
        </TextStyled>
        <TextStyled>
          {t('legalText2')}
        </TextStyled>
      </DialogContent>
      <DialogActions>
        <ButtonStyled onClick={onClose} color='primary' variant='contained'>
          {t('close')}
        </ButtonStyled>
      </DialogActions>
    </Dialog>
  )
}