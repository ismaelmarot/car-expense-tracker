import React from 'react';
import { Grid } from '@mui/material';
import { GridAcordeons, TitleStyled } from './SettingsStyles';
import DownloadPDFComponent from '../DownloadPDFComponent/DownloadPDFComponent';
import DownloadDBComponent from '../DownloadDBComponent/DownloadDBComponent';

const Settings: React.FC = () => {
    return (
        <>
            <TitleStyled>Ajustes</TitleStyled>
            <GridAcordeons container>
                <Grid xs={12}>
                    <DownloadPDFComponent />
                    <DownloadDBComponent />
                </Grid>
            </GridAcordeons>   
        </>
    )
}

export default Settings;