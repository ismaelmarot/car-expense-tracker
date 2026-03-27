import React from 'react';
import { Box } from '@mui/material';

const GridViewIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="6" height="6" rx="1.5" fill="currentColor"/>
    <rect x="2" y="12" width="6" height="6" rx="1.5" fill="currentColor"/>
    <rect x="12" y="2" width="6" height="6" rx="1.5" fill="currentColor"/>
    <rect x="12" y="12" width="6" height="6" rx="1.5" fill="currentColor"/>
  </svg>
);

const ListViewIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="14" height="3" rx="1.5" fill="currentColor"/>
    <rect x="3" y="8.5" width="14" height="3" rx="1.5" fill="currentColor"/>
    <rect x="3" y="14" width="14" height="3" rx="1.5" fill="currentColor"/>
  </svg>
);

interface ViewToggleButtonProps {
  isGridView: boolean;
  onToggle: () => void;
}

export const ViewToggleButton: React.FC<ViewToggleButtonProps> = ({ isGridView, onToggle }) => {
  return (
    <Box
      onClick={onToggle}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#f5f5f7',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        color: '#86868b',
        border: '1px solid rgba(0, 0, 0, 0.04)',
        flexShrink: 0,
        boxSizing: 'border-box',
        '@media (max-width: 480px)': {
          width: 38,
          height: 38,
          borderRadius: 19,
        },
        '&:hover': {
          backgroundColor: '#e8e8ed',
          color: '#1d1d1f',
        },
        '&:active': {
          transform: 'scale(0.97)',
        },
      }}
    >
      {isGridView ? <GridViewIcon /> : <ListViewIcon />}
    </Box>
  );
};