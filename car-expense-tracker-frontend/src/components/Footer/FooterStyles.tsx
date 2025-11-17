import React from 'react';
import styled from '@emotion/styled';
import { Grid, Link } from '@mui/material';

export const Container = styled(Grid)`
    display: flex;
    justify-content: center;
    color: rgba(255, 255, 255, 1);
    background-color: rgba(0,0,0,1);
`;

export const Item = styled(Grid)`
    padding: .3rem .5rem;
`;

export const LinkStyled = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    color: rgba(255, 255, 255, 1);
`;