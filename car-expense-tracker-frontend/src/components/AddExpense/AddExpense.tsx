import React, { useState, useEffect } from 'react';
import { MenuItem, InputLabel, Grid } from '@mui/material';
import { addExpense } from '../../api/api';
import { useParams } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { GridContainer, FormStyled, TextFieldStyled, GridTextFieldLarge, GridTextFieldShort, GridButtonAddExpense, ButtonAddStyled, ErrorTypography, AddExpenseTypography, FormControlStyled, SelectStyled, GridTitle, GridTable } from './AddExpenseStyles';
import SnackbarNotification from '../SnackbarNotification/SnackbarNotification';

const AddExpense: React.FC = () => {
    const { id } = useParams();
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [kilometers, setKilometers] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!description || !price || !kilometers || !category) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        const parsedPrice = parseFloat(price);
        const parsedKilometers = parseInt(kilometers, 10);

        if (isNaN(parsedPrice) || isNaN(parsedKilometers)) {
            setError("El precio y el kilometraje deben ser números.");
            return;
        }
        setError('');

        try {
            await addExpense({
                car_id: Number(id),
                description,
                price: parsedPrice,
                kilometers: parsedKilometers,
                category,
                date: date,
            });
            setDescription('');
            setPrice('');
            setKilometers('');
            setCategory('');
            setDate('');
            
            setSnackbarMessage("Gasto agregado correctamente.");
            setSnackbarSeverity('success');
            setSnackbarOpen(true);            
        } catch (error) {
            console.log("Error al agregar el gasto: ", error);
            alert("Hubo un error al agregar el gasto.");

            setSnackbarMessage("Hubo un error al agregar el gasto.");
            setSnackbarSeverity('error');
            setSnackbarOpen(true);

        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setDate(currentDate);
    }, []);

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setPrice(value);
        }
    };

    const handleKilometersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setKilometers(value);
        }
    };

    function renderButtonAddExpense() {
        return (
            <GridButtonAddExpense>
                <ButtonAddStyled type='submit'>
                    <AddCircleOutlineIcon /> 
                    <AddExpenseTypography>Agregar</AddExpenseTypography>
                </ButtonAddStyled>
            </GridButtonAddExpense>
        )
    };

    function renderErrorMessage() {
        return (
            <ErrorTypography color='error' variant='body2'>
                {error}
            </ErrorTypography>
        )
    };

    return (
        <GridContainer container>
            <GridTitle>Agregar Gasto</GridTitle>
            <GridTable>
                <FormStyled onSubmit={handleSubmit}>
                    <Grid container>
                        <GridTextFieldLarge item xs={12}>
                            <TextFieldStyled      
                                label="Descripción"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                variant='outlined'
                                required
                            />
                        </GridTextFieldLarge>
                        <GridTextFieldShort item xs={6}>
                            <TextFieldStyled
                                label="Precio"
                                value={price}
                                onChange={handlePriceChange}
                                variant='outlined'
                                required
                                    type='number'
                                    InputProps={{
                                    inputProps: {
                                        step: 'any',
                                        min: '0'
                                    }
                                }}
                            />
                        </GridTextFieldShort>
                        <GridTextFieldShort item xs={6}>
                            <TextFieldStyled
                                label="Kilometraje"
                                value={kilometers}
                                onChange={handleKilometersChange}
                                variant='outlined'
                                required
                                type='number'
                                inputProps={{ min: '0' }}
                            />
                        </GridTextFieldShort>
                        <GridTextFieldShort item xs={6}>
                            <TextFieldStyled
                                label="Fecha"
                                type='date'
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                            />
                        </GridTextFieldShort>
                        <GridTextFieldShort container xs={6}>
                            <FormControlStyled fullWidth variant='outlined' required>
                                <InputLabel>Categoría</InputLabel>
                                <SelectStyled
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value as string)}
                                    label="Categoría"
                                >
                                    <MenuItem value='combustible'>Combustible</MenuItem>
                                    <MenuItem value='mantenimiento'>Mantenimiento</MenuItem>
                                    <MenuItem value='seguro'>Seguro</MenuItem>
                                    <MenuItem value='patente'>Patente</MenuItem>
                                    <MenuItem value='reparacion'>Reparación</MenuItem>
                                    <MenuItem value='otros'>Otros</MenuItem>
                                </SelectStyled>
                            </FormControlStyled>
                        </GridTextFieldShort>
                        {error && (
                            renderErrorMessage()
                        )}
                        { renderButtonAddExpense() }
                    </Grid>
                </FormStyled>
            </GridTable>
            <SnackbarNotification
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleSnackbarClose}
            />
        </GridContainer>
    )
};

export default AddExpense;
