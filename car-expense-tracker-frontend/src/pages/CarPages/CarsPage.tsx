import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCars } from '../../api/api';
import { Grid } from '@mui/material';
import { CarInterface } from '../../interfaces/CarInterface';
import CarCard from '../../components/CarCard/CarCard';
import AddIcon from '@mui/icons-material/Add';
import { Title, TypographyStyled, GeneralContainer, Container } from './CarsPageStyles';

const CarsPage: React.FC = () => {
    const [cars, setCars] = useState<CarInterface[]>([]);
    const [, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

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
                <div 
                    onClick={() => navigate('/add')}
                    style={{
                        width: '100%',
                        height: '300px',
                        backgroundColor: 'white',
                        border: '3px solid #ccc',
                        borderRadius: '5px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        gap: '10px'
                    }}
                >
                    <AddIcon fontSize='large' />
                    <p>Agregar Vehículo</p>
                </div>
            </Grid>
        );
    }

    function renderCar(car: CarInterface) {
        return (
            <Grid item xs={12} sm={6} md={4} key={car.id}>     
                <div 
                    onClick={() => navigate(`/cars/${car.id}`)}
                    style={{
                        width: '100%',
                        height: '300px',
                        backgroundColor: 'white',
                        border: '3px solid #ccc',
                        borderRadius: '5px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <CarCard car={car} />
                </div>
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
