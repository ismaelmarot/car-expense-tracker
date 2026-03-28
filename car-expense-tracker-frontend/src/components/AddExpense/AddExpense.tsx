import React, { useState, useEffect } from 'react';
import { MenuItem } from '@mui/material';
import { addExpense } from '../../api/api';
import { useParams } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SnackbarNotification from '../SnackbarNotification/SnackbarNotification';
import { 
  Container, 
  FormHeader, 
  FormTitle, 
  FormSubtitle,
  Form, 
  FormRow,
  InputGroup, 
  InputLabel, 
  Input, 
  SelectInput, 
  SubmitButton,
  ErrorMessage
} from './AddExpenseStyles';

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
            const currentDate = new Date().toISOString().split('T')[0];
            setDate(currentDate);
            
            setSnackbarMessage("Gasto agregado correctamente.");
            setSnackbarSeverity('success');
            setSnackbarOpen(true);            
        } catch (error) {
            console.log("Error al agregar el gasto: ", error);

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

    return (
        <Container>
            <FormHeader>
                <FormTitle>Agregar Gasto</FormTitle>
                <FormSubtitle>Registra un nuevo gasto para tu vehículo</FormSubtitle>
            </FormHeader>

            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <InputLabel>Descripción</InputLabel>
                    <Input
                        fullWidth
                        placeholder="Ej: Cambio de aceite"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </InputGroup>

                <FormRow>
                    <InputGroup>
                        <InputLabel>Precio</InputLabel>
                        <Input
                            fullWidth
                            placeholder="Ej: 5000"
                            value={price}
                            onChange={handlePriceChange}
                            required
                            type="text"
                            inputProps={{ inputMode: 'numeric' }}
                        />
                    </InputGroup>

                    <InputGroup>
                        <InputLabel>Kilometraje</InputLabel>
                        <Input
                            fullWidth
                            placeholder="Ej: 125000"
                            value={kilometers}
                            onChange={handleKilometersChange}
                            required
                            type="text"
                            inputProps={{ inputMode: 'numeric' }}
                        />
                    </InputGroup>
                </FormRow>

                <FormRow>
                    <InputGroup>
                        <InputLabel>Fecha</InputLabel>
                        <Input
                            fullWidth
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </InputGroup>

                    <InputGroup>
                        <InputLabel>Categoría</InputLabel>
                        <SelectInput fullWidth required>
                            <Input
                                select
                                value={category}
                                onChange={(e) => setCategory(e.target.value as string)}
                                placeholder="Seleccionar"
                            >
                                <MenuItem value='combustible'>Combustible</MenuItem>
                                <MenuItem value='peajes'>Peajes</MenuItem>
                                <MenuItem value='estacionamiento'>Estacionamiento</MenuItem>
                                <MenuItem value='lavado'>Lavado</MenuItem>
                                <MenuItem value='service'>Service (cambio de aceite, filtros)</MenuItem>
                                <MenuItem value='mantenimiento'>Mantenimiento</MenuItem>
                                <MenuItem value='neumaticos'>Neumáticos</MenuItem>
                                <MenuItem value='repuestos'>Repuestos</MenuItem>
                                <MenuItem value='reparacion'>Reparación</MenuItem>
                                <MenuItem value='reparaciones_mecanicas'>Reparaciones mecánicas</MenuItem>
                                <MenuItem value='electricidad'>Electricidad</MenuItem>
                                <MenuItem value='chapa_pintura'>Chapa y pintura</MenuItem>
                                <MenuItem value='seguro'>Seguro</MenuItem>
                                <MenuItem value='patente'>Patente</MenuItem>
                                <MenuItem value='vtv_itv'>VTV / ITV</MenuItem>
                                <MenuItem value='multas'>Multas</MenuItem>
                                <MenuItem value='grua_asistencia'>Grúa / asistencia</MenuItem>
                                <MenuItem value='accesorios'>Accesorios</MenuItem>
                                <MenuItem value='mejoras_tuning'>Mejoras / tuning</MenuItem>
                                <MenuItem value='otros'>Otros</MenuItem>
                            </Input>
                        </SelectInput>
                    </InputGroup>
                </FormRow>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <SubmitButton type="submit">
                    <AddCircleOutlineIcon sx={{ fontSize: 20 }} />
                    Agregar Gasto
                </SubmitButton>
            </Form>

            <SnackbarNotification
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleSnackbarClose}
            />
        </Container>
    );
};

export default AddExpense;