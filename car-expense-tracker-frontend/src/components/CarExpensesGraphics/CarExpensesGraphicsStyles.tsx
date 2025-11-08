import React from 'react';
import styled from '@emotion/styled';
import {Grid, Typography } from '@mui/material';

export const Container = styled(Grid)`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
`;

export const ContainerGraphics = styled(Grid)`
  width: 100%;
  border-radius: 3px;
  border: 3px solid rgba(228,232,236,1);
`;

export const TitleStyled = styled(Typography)`
  width: 100%;
  margin-bottom: 1rem;
  padding: .3rem;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 3px;
  color: rgba(36,99,235,1);
  background-color: rgba(166,201,238,1);
`;