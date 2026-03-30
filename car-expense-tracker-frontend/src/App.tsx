import React, { useState } from 'react'
import './App.css'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { Box } from '@mui/material'
import styled from '@emotion/styled'
import CarsPage from './pages/CarPages/CarsPage'
import { AddCar } from './components/AddCar/AddCar'

import Footer from './components/Footer/Footer'
import { LanguageProvider } from './contexts/LanguageContext'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import { CarDetails } from './components/CarDetails'

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

const App: React.FC = () => {
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
  );
};

export default App;
