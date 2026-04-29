import React, { useEffect } from 'react'
import { CircularProgress } from '@mui/material'
import { SplashScreenProps } from '@/interfaces'
import { Container, Title } from './SplashScreen.styles'

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 1500)
    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <Container>
      <Title variant="h3">
        Vehicles Expenses Tracker
      </Title>
      <CircularProgress color="inherit" />
    </Container>
  )
}