import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';

export const GeneralContainer = styled(Grid)`
    margin-bottom: 3rem;
`;

export const Container = styled(Grid)`
    margin: 2rem 1rem;
`;

export const Title = styled(Grid)`
    margin: 0 .5rem;
    border-radius: 3px;
    background-color: rgba(166,201,238,1);
`;

export const TypographyStyled = styled(Typography)`
    font-size: 2rem;
    font-weight: bold;
    color: rgba(38,100,235,1);
`;

export const LinkCard = styled(Link)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
    transition: font-size 0.3s ease;
    &:hover {
        font-size: 2rem;
        border-color: rgba(166,201,238,1);
        color: rgba(37,100,235,1);
    }
`;

export const LinkAddCarCard = styled(LinkCard)`
    font-size: 1.8rem;
`;

export const CardStyled = styled(Grid)`
    width: 100%;
    height: 300px;
    background-color: #f5f5f5;
    border: 3px solid #ddd;
    border-radius: 5px;
    transition: font-size 0.3s ease;
    &:hover {
        border-color: rgba(166,201,238,1);
    }
`;