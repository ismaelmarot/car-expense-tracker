import React from 'react';
import { AccordionStyled, StorageStyled, TypographyStyled, ButtonStyled } from './DownloadDBComponentStyles';
import { AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DownloadDBComponent: React.FC = () => {
    
    const downloadBackup = async () => {
        const response = await fetch('/api/download-backup');
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'backup.db';
        link.click();
    };

    return (
        <AccordionStyled>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel2-content'
                id='panel2-header'
            >
                <StorageStyled />
                <TypographyStyled>Descargar Base de Datos (DB)</TypographyStyled>
            </AccordionSummary>
            <AccordionDetails>
                <ButtonStyled
                    variant='contained'
                    color='primary'
                    onClick={downloadBackup}
                >
                    Descargar Backup
                </ButtonStyled>
            </AccordionDetails>
        </AccordionStyled>
    );
};

export default DownloadDBComponent;