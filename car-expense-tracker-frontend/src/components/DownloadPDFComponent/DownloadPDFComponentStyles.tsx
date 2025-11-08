import React from 'react';
import styled from '@emotion/styled';
import { Accordion, Button, DialogActions, Grid, Typography } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const IconStyled =`
    font-size: 2rem;
    margin-right: .5rem;
`;

export const PictureAsPdfIconStyled = styled(PictureAsPdfIcon)`
    ${IconStyled}
`;

export const AccordionStyled = styled(Accordion)`
    margin-bottom: 1rem;
    border-radius: 3px;
`;

export const TypographyStyled = styled(Typography)`
    font-size: 1.5rem;
`;

export const DialogActionsStyled = styled(DialogActions)`
    margin: 1rem;
`;

export const ButtonDownloadPDF = styled(Button)`
    border-radius: 3px;
    color: rgba(255, 255, 255,1);
    background-color: rgba(24,118,209,1);
`;

export const VehicleDescription = styled(Grid)`
    display: flex;
    align-items: center;
`;

export const VehicleDescriptionText = styled(Typography)`
    margin: 0;
    padding: 0;
`;

export const ExpencesToDate = styled(Grid)`
    display: flex;
    align-items: center;
    justify-content: end;
`;