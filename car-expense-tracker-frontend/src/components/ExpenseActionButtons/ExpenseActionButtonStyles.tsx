import React from 'react';
import styled from '@emotion/styled';
import { Grid, IconButton } from '@mui/material';
import { GeneralColors } from '../../constants/GeneralColors';
import { flex } from '../../mixins/setFlex';

export const Container = styled(Grid)`
    ${flex('row','center','flex-end')}
    padding-right: .5rem;
`;

export const EditButton = styled(IconButton)`
    color: ${GeneralColors.blue};
`;

export const DeleteButton = styled(IconButton)`
    color: ${GeneralColors.red};
`;