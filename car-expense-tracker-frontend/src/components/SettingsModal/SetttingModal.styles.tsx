import styled from '@emotion/styled'
import { Dialog as MuiDialog, DialogTitle, DialogContent, IconButton } from '@mui/material'

export const DialogStyled = styled(MuiDialog)`
  & .MuiPaper-root {
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }
`

export const TitleStyled = styled(DialogTitle)`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1d1d1f;
  padding: 20px 24px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const CloseButton = styled(IconButton)`
  color: #86868b;
  &:hover {
    color: #1d1d1f;
  }
`

export const ContentStyled = styled(DialogContent)`
  padding: 16px 24px 24px;
`