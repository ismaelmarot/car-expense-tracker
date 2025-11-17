import React from 'react';
import { CarInterface } from '../../interfaces/CarInterface';
import { CardStyled, CarType, CarInfo } from './CarCardStyles';

const CarCard: React.FC<{ car: CarInterface }> =({ car }) => {
  return (
    <CardStyled>
      <CarType>{`${car.brand} ${car.model} ${car.version}`}</CarType>
      <CarInfo>{`Año: ${car.year}`}</CarInfo>
      <CarInfo>{`Patente: ${car.vin}`}</CarInfo>
    </CardStyled>
  )
}

export default CarCard;
