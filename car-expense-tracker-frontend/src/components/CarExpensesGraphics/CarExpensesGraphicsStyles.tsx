import styled from '@emotion/styled';
import {Grid, Typography } from '@mui/material';
import { flex } from '../../mixins/setFlex';
import { GeneralColors } from '../../constants/GeneralColors';

export const Container = styled(Grid)`
  ${flex('column', 'center', 'center')};
  max-height: 61vh;
`;

export const TitleStyled = styled(Typography)`
  width: 100%;
  margin-bottom: 1rem;
  padding: .3rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${GeneralColors.white};
  background-color: ${GeneralColors.black};
`;

export const ContainerGraphics = styled(Grid)`
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  padding-right: 1rem;
`;
