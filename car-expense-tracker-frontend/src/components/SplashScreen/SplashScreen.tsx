import React, { useEffect } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

export const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish()
    }, 1500)
    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1976d2',
        color: 'white',
        padding: '1.5rem',
        textAlign: 'center',
      }}
    >
      <Typography 
        variant="h3" 
        sx={{ 
          mb: 3, 
          fontWeight: 'bold',
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
        }}
      >
        Vehicles Expenses Tracker
      </Typography>
      <CircularProgress color="inherit" />
    </Box>
  )
}