import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById, deleteCar } from '../../api/api';
import { Container, Typography, CircularProgress, Grid } from '@mui/material';
import { CarInterface } from '../../interfaces/CarInterface';
import TabsCar from '../TabsCar/TabsCar';
import BackButton from '../BackButton/BackButton';
import DeleteCarConfirmationDialog from '../DeletCarConfirmationDialog/DeletCarConfirmationDialog';
import CarTag from '../../components/CarTag/CarTag';
import { BoxStyled, ButtonDeleteCar, GridCarDetails, GridDeleteCarIcon } from './CarDetailsStyles';

const CarDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState<CarInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [dialogOpen, setDialogOpen] = useState(false);
    const handleOpenDialog = () => setDialogOpen(true);
    const handleCloseDialog = () => setDialogOpen(false);
    const handleConfirmDelete = () => {
        handleDelete();
        handleCloseDialog();
    };

    useEffect(() => {
        if (id) {
            const fetchCarDetails = async () => {
                try {
                    const response = await getCarById(Number(id));
                    setCar(response.data);
                } catch (error) {
                    console.error("Error fetching car details: ", error);
                } finally {
                    setLoading(false);
                }
            }
            fetchCarDetails();
        }
    }, [id]);

    const handleDelete = async () => {
        if (id) {
            console.log("Deleting car with ID: ", id);
            try {
                await deleteCar(Number(id));
                navigate('/');
            } catch (error) {
                console.error("Error deleting car: ", error);
            }
        }
        window.location.reload();
    };

    if (loading) {
        return (
            <BoxStyled>
                <CircularProgress />
            </BoxStyled>
        )
    }

    if (!car) {
        return (
            <Container>
                <Typography variant='h5' color='error'>
                    No se encontró información para este auto.
                </Typography>
            </Container>
        )
    }

    return (
        <Grid>
            <BackButton />
            <GridCarDetails>
                <CarTag
                    id={car.id}
                    brand={car.brand} 
                    model={car.model} 
                    version={car.version} 
                    year={car.year} 
                    vin={car.vin} 
                />
                <GridDeleteCarIcon>     
                    <ButtonDeleteCar variant="contained" onClick={handleOpenDialog}>
                        Eliminar Vehículo
                    </ButtonDeleteCar>
                    <DeleteCarConfirmationDialog
                        open={dialogOpen}
                        title="¿Desea eliminar este auto?"
                        description="Esta acción no se puede deshacer."
                        onConfirm={handleConfirmDelete}
                        onCancel={handleCloseDialog}
                    />
                </GridDeleteCarIcon>
            </GridCarDetails>
            <TabsCar />   
        </Grid>
    )
};

export default CarDetails;