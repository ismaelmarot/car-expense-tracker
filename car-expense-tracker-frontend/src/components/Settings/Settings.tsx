import React from 'react';
import { SettingsContainer, TitleStyled } from './SettingsStyles';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import Reports from '../Reports/Reports';
import { useLanguage } from '../../contexts/LanguageContext';

const Settings: React.FC = () => {
    const { t } = useLanguage();
    
    return (
        <SettingsContainer>
            <TitleStyled>{t('settings')}</TitleStyled>
            
            <Reports />
            
            <LanguageSelector />
        </SettingsContainer>
    )
}

export default Settings;