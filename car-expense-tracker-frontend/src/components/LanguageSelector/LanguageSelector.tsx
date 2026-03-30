import { Typography } from '@mui/material'
import { useLanguage } from '../../contexts/LanguageContext'
import { CheckIcon, Container, Options, Option, Title } from './LanguageSelector.styles'

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage()

  return (
    <Container>
      <Title>{t('language')}</Title>
      <Options>
        <Option 
          selected={language === 'es'} 
          onClick={() => setLanguage('es')}
        >
          <Typography sx={{ fontWeight: 500 }}>Español</Typography>
          <CheckIcon selected={language === 'es'}>✓</CheckIcon>
        </Option>
        <Option 
          selected={language === 'en'} 
          onClick={() => setLanguage('en')}
        >
          <Typography sx={{ fontWeight: 500 }}>English</Typography>
          <CheckIcon selected={language === 'en'}>✓</CheckIcon>
        </Option>
      </Options>
    </Container>
  )
}