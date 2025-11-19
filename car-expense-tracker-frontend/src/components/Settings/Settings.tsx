import React from 'react';
import { SettingsContainer, GridAcordeons, TitleStyled } from './SettingsStyles';
import DownloadPDFComponent from '../DownloadPDFComponent/DownloadPDFComponent';
import DownloadDBComponent from '../DownloadDBComponent/DownloadDBComponent';

const Settings: React.FC = () => {
    return (
        <SettingsContainer>
            <TitleStyled>Ajustes</TitleStyled>
            <GridAcordeons container xs={12} lg={4}>
                <DownloadPDFComponent />
                <DownloadDBComponent />
            </GridAcordeons>   
        </SettingsContainer>
    )
}

export default Settings;