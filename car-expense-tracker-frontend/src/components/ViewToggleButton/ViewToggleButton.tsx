import { GridViewIcon, ListViewIcon } from '@/constants'
import { ViewToggleButtonProps } from '@/interfaces'
import { Box } from '@mui/material'

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
  )
}