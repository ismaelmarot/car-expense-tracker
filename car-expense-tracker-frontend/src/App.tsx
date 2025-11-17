import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Grid } from '@mui/material';
import CarsPage from './pages/CarPages/CarsPage';
import AddCar from './components/AddCar/AddCar';
import CarDetails from './components/CarDetails/CarDetails';
import Footer from './components/Footer/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <div className='App'>
        <Grid className='Grid'>
          <h1 className='Title'>Vehicles Expenses Tracker</h1>
        </Grid>
        <div className='Content'>
          <Routes>
            <Route path='/' element={<CarsPage />} />
            <Route path='/add' element={<AddCar />} />
            <Route path='/cars/:id' element={<CarDetails />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
