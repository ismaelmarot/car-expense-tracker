import React from 'react'
import { SettingsContainer, TitleStyled } from './SettingsStyles'
import { Reports } from '../Reports'
import { useLanguage } from '../../contexts/LanguageContext'

export const Settings: React.FC = () => {
    const { t } = useLanguage()
    
    return (
        <SettingsContainer>
            <TitleStyled>{t('reports')}</TitleStyled>
            
            <Reports />
        </SettingsContainer>
    )
}