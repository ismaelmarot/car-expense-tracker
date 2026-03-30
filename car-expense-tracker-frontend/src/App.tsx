import { useState } from 'react'
import styled from '@emotion/styled'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { AddCar , Footer, LoadingScreen, CarDetails} from './components'
import { Box } from '@mui/material'
import { LanguageProvider } from './contexts/LanguageContext'
import { CarsPage } from './pages'

const AppContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f7;
  overflow: hidden;
`;

const MainContent = styled(Box)`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true)

  if (loading) {
    return <LoadingScreen onEnter={() => setLoading(false)} />
  }

  return (
    <LanguageProvider>
      <Router>
        <AppContainer>
          <MainContent>
            <Routes>
              <Route path='/' element={<CarsPage />} />
              <Route path='/add' element={<AddCar />} />
              <Route path='/cars/:id' element={<CarDetails />} />
            </Routes>
          </MainContent>
          <Footer />
        </AppContainer>
      </Router>
    </LanguageProvider>
  )
}