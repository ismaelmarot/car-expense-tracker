import React from 'react';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const GeneralContainer = styled(Grid)`
    display: flex;
    flex-direction: row;
    border-right: 3px solid white;
`;

export const Container = styled(Grid)`
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
`;

export const GridItem = styled(Grid)`
    padding: .3rem;
    text-align: left;
`;