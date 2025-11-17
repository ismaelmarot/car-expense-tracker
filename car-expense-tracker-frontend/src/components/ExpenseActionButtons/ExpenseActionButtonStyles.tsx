import React from 'react';
import styled from '@emotion/styled';
import { Grid, IconButton } from '@mui/material';

export const Container = styled(Grid)`
    display: flex;
    justify-content: end;
    padding-right: .5rem;
`;

export const EditButton = styled(IconButton)`
    color: rgba(36,99,235,1);
`;

export const DeleteButton = styled(IconButton)`
    color: rgba(211,47,47,1);
`;