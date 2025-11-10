import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Grid, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { flex } from '../../helpers/setFlex';
import { size } from '../../helpers/setSize';

export const Container = styled(Grid)`
    ${flex('row', 'center', 'flex-start')}
    ${size('100%', '3rem')}
    margin: 0 .5rem .5rem;
`;

export const LinkStyled = styled(Link)`
    text-decoration: none;
`;

export const ArrowBackIconStyled = styled(ArrowBackIcon)`
    font-size: 1.5rem;
    margin: 0 .4rem;
    color: white;
`;

export const ButtonStyled = styled(Button)`
    display: flex;
    align-items: center;
    height: 3rem;
    width: auto;
    background-color: rgba(24,118,209,1);
`;

export const TypographyStyled = styled(Typography)`
    margin-right: 1.5rem;
    font-size: 1rem;
    color: white;
`;