import React from 'react';
import styled from '@emotion/styled';
import {Grid, Typography } from '@mui/material';
import { flex } from '../../helpers/setFlex';
import { GeneralColors } from '../../constants/GeneralColors';

export const Container = styled(Grid)`
  ${flex('column','center','flex-start')}
  box-sizing: border-box;
`;

export const ContainerGraphics = styled(Grid)`
  width: 100%;
  border: 3px solid ${GeneralColors.grey};
  box-sizing: border-box;
`;

export const TitleStyled = styled(Typography)`
  width: 100%;
  padding: .3rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${GeneralColors.white};
  background-color: ${GeneralColors.black};
`;