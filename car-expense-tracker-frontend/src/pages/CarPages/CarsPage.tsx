import React, { useState, useEffect } from 'react';
import { getCars } from '../../api/api';
import { Grid } from '@mui/material';
import { CarInterface } from '../../interfaces/CarInterface';
import CarCard from '../../components/CarCard/CarCard';
import AddIcon from '@mui/icons-material/Add';
import { CardStyled, LinkAddCarCard, LinkCard, Title, TypographyStyled, GeneralContainer, Container } from './CarsPageStyles';

const CarsPage: React.FC = () => {
    const [cars, setCars] = useState<CarInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchCars = async () => {
        try {
            const response = await getCars();
            setCars(response.data);
        } catch (error) {
            console.error('Error fetching cars:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    function renderAddCar() {
        return (
            <Grid item xs={12} sm={6} md={4}>
                <CardStyled>
                    <LinkAddCarCard to='/add'>
                        <AddIcon fontSize='large' />
                        <p>Agregar Vehículo</p>
                    </LinkAddCarCard>
                </CardStyled>
            </Grid>
        );
    }

    function renderCar(car: CarInterface) {
        return (
            <Grid item xs={12} sm={6} md={4} key={car.id}>     
                <CardStyled>
                    <LinkCard to={`/cars/${car.id}`}>
                        <CarCard car={car} />
                    </LinkCard>       
                </CardStyled>        
            </Grid>
        );
    }

    return (
        <GeneralContainer>
            <Title>
                <TypographyStyled>Mis Veh&iacute;culos</TypographyStyled>
            </Title>
            <Container>
                <Grid container spacing={2}>
                    {cars.length > 0 ? (
                        cars.map((car) => renderCar(car))
                    ) : (
                        <Grid item xs={12}>
                            <p>No hay autos para mostrar</p>
                        </Grid>
                    )}
                    {renderAddCar()}
                </Grid>
            </Container>
        </GeneralContainer>
    );
};

export default CarsPage;
