import React from 'react';
import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';

export const GridTotalAmount = styled(Grid)`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;
export const TotalAmount = styled(Typography)`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    font-size: 1.5rem;
    font-weight: bold;
    padding: .3rem;
    border-radius: 3px;
    color:rgba(36,99,235,1);
    background-color: rgba(166, 201, 239,1);
`;
