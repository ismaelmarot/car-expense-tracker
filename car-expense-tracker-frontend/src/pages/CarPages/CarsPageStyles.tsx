import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { flex } from '../../helpers/setFlex';
import { size } from '../../helpers/setSize';
import { GeneralColors } from '../../constants/GeneralColors';

export const GeneralContainer = styled(Grid)``;

export const Container = styled(Grid)`
    margin: 2rem 1rem;
`;

export const Title = styled(Grid)`
    margin: 0 .5rem;
    border-radius: 3px;
    background-color: ${GeneralColors.blue};
`;

export const TypographyStyled = styled(Typography)`
    font-size: 2rem;
    font-weight: bold;
    color: ${GeneralColors.white};
`;

export const LinkCard = styled(Link)`
    ${flex('column','center','center')}
    ${size('100%','100%')}
    text-decoration: none;
    transition: font-size 0.3s ease;
    &:hover {
        font-size: 2rem;
        border-color: ${GeneralColors.blue};
        color: ${GeneralColors.blue};
    }
`;

export const LinkAddCarCard = styled(LinkCard)`
    font-size: 1.8rem;
`;

export const CardStyled = styled(Grid)`
    ${size('100%','300px')}
    background-color: ${GeneralColors.white};
    border: 3px solid ${GeneralColors.grey};
    border-radius: 5px;
    transition: font-size 0.2s ease;
    &:hover {
        border-color: ${GeneralColors.blue};
        font-size: 2rem;
    }
`;