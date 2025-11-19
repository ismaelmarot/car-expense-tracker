import React from 'react';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { flex } from '../../mixins/setFlex';

export const GeneralContainer = styled(Grid)`
    ${flex('row','center','center')}
    border-right: 3px solid white;
`;

export const Container = styled(Grid)`
    ${flex('row','center','flex-start')}
    font-size: 1.5rem;
    font-weight: bold;
`;

export const GridItem = styled(Grid)`
    padding: .3rem;
    text-align: left;
`;