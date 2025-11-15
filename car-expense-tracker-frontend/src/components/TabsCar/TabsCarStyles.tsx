import React from 'react';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { size } from '../../helpers/setSize';

export const BoxStyled = styled(Box)`
    /* ${size('100%', '100%')} */
    box-sizing: border-box;
`;

export const BoxRenderContent = styled(Box)`
    ${size('100%', '100%')}
`;