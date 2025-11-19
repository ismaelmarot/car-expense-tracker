import styled from '@emotion/styled';
import { Typography, Accordion, Button } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';

const IconStyled =`
    font-size: 2rem;
    margin-right: .5rem;
`;

export const AccordionStyled = styled(Accordion)`
    width: 100%;
    margin-bottom: 1rem;
    border-radius: 3px;
`;

export const TypographyStyled = styled(Typography)`
    font-size: 1.5rem;
`;

export const StorageStyled = styled(StorageIcon)`
    ${IconStyled}
`;

export const ButtonStyled = styled(Button)`
    border-radius: 3px;
`;