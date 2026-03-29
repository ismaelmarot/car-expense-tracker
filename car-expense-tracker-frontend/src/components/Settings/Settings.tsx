import React from 'react';
import { SettingsContainer, TitleStyled } from './SettingsStyles';
import Reports from '../Reports/Reports';
import { useLanguage } from '../../contexts/LanguageContext';

const Settings: React.FC = () => {
    const { t } = useLanguage();
    
    return (
        <SettingsContainer>
            <TitleStyled>{t('reports')}</TitleStyled>
            
            <Reports />
        </SettingsContainer>
    )
}

export default Settings;