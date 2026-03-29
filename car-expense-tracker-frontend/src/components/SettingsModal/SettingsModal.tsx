import React from 'react';
import { Dialog as MuiDialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import { useLanguage } from '../../contexts/LanguageContext';
import styled from '@emotion/styled';

const DialogStyled = styled(MuiDialog)`
  & .MuiPaper-root {
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }
`;

const TitleStyled = styled(DialogTitle)`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1d1d1f;
  padding: 20px 24px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled(IconButton)`
  color: #86868b;
  &:hover {
    color: #1d1d1f;
  }
`;

const ContentStyled = styled(DialogContent)`
  padding: 16px 24px 24px;
`;

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ open, onClose }) => {
  const { t } = useLanguage();
  
  return (
    <DialogStyled open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <TitleStyled>
        {t('settings')}
        <CloseButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </CloseButton>
      </TitleStyled>
      <ContentStyled>
        <LanguageSelector />
      </ContentStyled>
    </DialogStyled>
  );
};

export default SettingsModal;
