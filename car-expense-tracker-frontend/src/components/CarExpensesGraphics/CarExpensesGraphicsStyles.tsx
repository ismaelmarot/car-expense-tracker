import React from 'react';
import styled from '@emotion/styled';
import {Grid, Typography } from '@mui/material';
import { flex } from '../../helpers/setFlex';
import { GeneralColors } from '../../constants/GeneralColors';

export const Container = styled(Grid)`
  ${flex('row','center','center')}
  margin-bottom: 3rem;
`;

export const ContainerGraphics = styled(Grid)`
  width: 100%;
  border-radius: 3px;
  border: 3px solid ${GeneralColors.grey};
`;

export const TitleStyled = styled(Typography)`
  width: 100%;
  margin-bottom: 1rem;
  padding: .3rem;
  border-radius: 3px;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${GeneralColors.white};
  background-color: ${GeneralColors.black};
`;