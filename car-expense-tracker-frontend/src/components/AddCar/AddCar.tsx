import React, { useState } from 'react';
import { addCar } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { ButtonStyled, Container, FormGrid, Title, TextFieldStyled } from './AddCarStyles';
import BackButton from '../BackButton/BackButton';

const AddCar: React.FC = () => {
    const [carData, setCarData] = useState({
        brand: '',
        model: '',
        year: '',
        vin: '',
        version: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCarData({
            ...carData,
            [name]: name === 'vin' ? value.toUpperCase() : value
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const car = {
            ...carData,
            year: Number(carData.year)
        };

        try {
            const response = await addCar(car);
            console.log('Car added: ', response.data);

            setCarData({
                brand: '',
                model: '',
                year: '',
                vin: '',
                version: ''
            });

            // navigate('/');
            window.location.hash = '/';

        } catch (error) {
            console.log('Error adding car: ', error);
        }
    };

    return (
        <Container>
            <BackButton />
            <Title>Agregar nuevo Vehículo</Title>
            <FormGrid container xs={12} md={6}>
                <form onSubmit={handleSubmit}>
                    <TextFieldStyled
                        label="Marca"
                        name='brand'
                        value={carData.brand}
                        onChange={handleInputChange}
                    />
                    <TextFieldStyled
                        label="Modelo"
                        name='model'
                        value={carData.model}
                        onChange={handleInputChange}
                    />
                    <TextFieldStyled
                        label="Versión"
                        name='version'
                        value={carData.version}
                        onChange={handleInputChange}
                    />
                    <TextFieldStyled
                        label="Año"
                        name='year'
                        value={carData.year}
                        onChange={handleInputChange}
                        inputProps={{
                            maxLength: 4,
                            pattern: "[0-9]{4}",
                            inputMode: 'numeric',
                            type: 'text',
                        }}
                    />
                    <TextFieldStyled
                        label="Patente"
                        name='vin'
                        value={carData.vin}
                        onChange={handleInputChange}
                    />

                    <ButtonStyled type='submit' variant='contained'>
                        Agregar Vehículo
                    </ButtonStyled>
                </form>
            </FormGrid>
        </Container>
    );
};

export default AddCar;
