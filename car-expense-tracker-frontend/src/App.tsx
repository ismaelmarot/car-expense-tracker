import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import CarsPage from './pages/CarPages/CarsPage';
import AddCar from './components/AddCar/AddCar';
import CarDetails from './components/CarDetails/CarDetails';
import Footer from './components/Footer/Footer';

const AppContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f5f7;
`;

const MainContent = styled(Box)`
  flex: 1;
  overflow-y: auto;
  width: 100%;
`;

const App: React.FC = () => {
  return (
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
  );
};

export default App;
