import styled from '@emotion/styled';
import { Box, Link, Typography } from '@mui/material';

export const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background: #ffffff;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const FooterText = styled(Typography)`
  font-size: 0.8125rem;
  color: #86868b;
`;

export const FooterLink = styled(Link)`
  font-size: 0.8125rem;
  color: #0071e3;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: #0077ed;
  }
`;

export const Divider = styled.span`
  color: #d1d1d6;
  margin: 0 0.25rem;
`;
