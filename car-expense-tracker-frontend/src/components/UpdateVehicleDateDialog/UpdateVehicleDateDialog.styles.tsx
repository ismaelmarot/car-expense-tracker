import styled from '@emotion/styled'
import { Dialog, Box, Typography, Button } from '@mui/material'

export const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    border-radius: 20px;
    padding: 0.5rem;
    overflow: visible;
  }
`

export const Content = styled(Box)`
  text-align: center;
  padding: 1.5rem 1.5rem 0.5rem;
`

export const IconWrapper = styled(Box)`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e8f4fd 0%, #cce5ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem;
  border: 1px solid #cce5ff;
`

export const Title = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1d1d1f;
  margin-bottom: 0.5rem;
`

export const Description = styled(Typography)`
  font-size: 0.9375rem;
  color: #86868b;
  line-height: 1.5;
`

export const Actions = styled(Box)`
  display: flex;
  gap: 0.75rem;
  padding: 1.5rem;
  padding-top: 0.75rem;
`

export const ButtonCancel = styled(Button)`
  padding: 0.75rem 1.25rem;
  border-radius: 35px;
  font-size: 0.9375rem;
  font-weight: 500;
  text-transform: none;
  color: #1d1d1f;
  background: #f5f5f7;
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;

  &:hover {
    background: #e8e8ed;
  }

  &:active {
    transform: scale(0.97);
  }
`

export const ButtonConfirm = styled(Button)`
  padding: 0.75rem 1.25rem;
  border-radius: 35px;
  font-size: 0.9375rem;
  font-weight: 500;
  text-transform: none;
  color: white;
  background-color: #0071e3;
  transition: all 0.2s ease;

  &:hover {
    background-color: #0077ed;
  }

  &:active {
    transform: scale(0.97);
  }
`