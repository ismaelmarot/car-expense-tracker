import React, { useState, useEffect, useRef } from 'react';
import { MenuItem, Box, Typography } from '@mui/material';
import { addExpense } from '../../api/api';
import { useParams } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import SnackbarNotification from '../SnackbarNotification/SnackbarNotification';
import { useLanguage } from '../../contexts/LanguageContext';
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
    const { t } = useLanguage();
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [kilometers, setKilometers] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState<string>('');
    const [photos, setPhotos] = useState<string[]>([]);
    const [error, setError] = useState<string>('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const fileInputRef = useRef<HTMLInputElement>(null);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!description || !price || !kilometers || !category) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        const parsedPrice = getRawPrice();
        const parsedKilometers = getRawKilometers();

        if (isNaN(parsedPrice) || isNaN(parsedKilometers)) {
            setError("El precio y el kilometraje deben ser números.");
            return;
        }
        setError('');

        try {
            const expenseData = {
                car_id: Number(id),
                description,
                price: parsedPrice,
                kilometers: parsedKilometers,
                category,
                date: date,
                photos: photos.length > 0 ? photos : undefined,
            };
            console.log('Saving expense with photos:', photos.length, 'photos');
            await addExpense(expenseData);
            setDescription('');
            setPrice('');
            setKilometers('');
            setCategory('');
            setPhotos([]);
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

    const formatPrice = (value: string): string => {
        const cleanValue = value.replace(/[^\d,]/g, '');
        const parts = cleanValue.split(',');
        const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        if (parts.length > 1) {
            return `${integerPart},${parts[1].slice(0, 2)}`;
        }
        return integerPart;
    };

    const formatKilometers = (value: string): string => {
        const cleanValue = value.replace(/[^\d]/g, '');
        return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const cleanValue = value.replace(/[^\d,]/g, '');
        setPrice(formatPrice(cleanValue));
    };

    const handleKilometersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const cleanValue = value.replace(/[^\d]/g, '');
        setKilometers(formatKilometers(cleanValue));
    };

    const getRawPrice = (): number => {
        return parseFloat(price.replace(/\./g, '').replace(',', '.')) || 0;
    };

    const getRawKilometers = (): number => {
        return parseInt(kilometers.replace(/\./g, ''), 10) || 0;
    };

    const handlePhotoClick = () => {
        fileInputRef.current?.click();
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const remainingSlots = 3 - photos.length;
        if (remainingSlots <= 0) return;

        const filesToProcess = Array.from(files).slice(0, remainingSlots);
        
        filesToProcess.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotos(prev => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removePhoto = (index: number) => {
        setPhotos(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <Container>
            <FormHeader>
                <FormTitle>{t('addExpense')}</FormTitle>
                <FormSubtitle>{t('addExpenseSubtitle')}</FormSubtitle>
            </FormHeader>

            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <InputLabel>{t('description')}</InputLabel>
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
                        <InputLabel>{t('price')}</InputLabel>
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
                        <InputLabel>{t('kilometers')}</InputLabel>
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
                        <InputLabel>{t('date')}</InputLabel>
                        <Input
                            fullWidth
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </InputGroup>

                    <InputGroup>
                        <InputLabel>{t('category')}</InputLabel>
                        <SelectInput fullWidth required>
                            <Input
                                select
                                value={category}
                                onChange={(e) => setCategory(e.target.value as string)}
                                placeholder={t('select')}
                            >
                                <MenuItem value='accesorios'>{t('catAccessories')}</MenuItem>
                                <MenuItem value='chapa_pintura'>{t('catBodyPaint')}</MenuItem>
                                <MenuItem value='combustible'>{t('catFuel')}</MenuItem>
                                <MenuItem value='electricidad'>{t('catElectricity')}</MenuItem>
                                <MenuItem value='estacionamiento'>{t('catParking')}</MenuItem>
                                <MenuItem value='extintor'>{t('catExtinguisher')}</MenuItem>
                                <MenuItem value='grua_asistencia'>{t('catTowing')}</MenuItem>
                                <MenuItem value='lavado'>{t('catWashing')}</MenuItem>
                                <MenuItem value='mantenimiento'>{t('catMaintenance')}</MenuItem>
                                <MenuItem value='mejoras_tuning'>{t('catImprovements')}</MenuItem>
                                <MenuItem value='multas'>{t('catFines')}</MenuItem>
                                <MenuItem value='neumaticos'>{t('catTires')}</MenuItem>
                                <MenuItem value='patente'>{t('catRegistration')}</MenuItem>
                                <MenuItem value='peajes'>{t('catTolls')}</MenuItem>
                                <MenuItem value='reparacion'>{t('catRepairs')}</MenuItem>
                                <MenuItem value='reparaciones_mecanicas'>{t('catMechanicalRepairs')}</MenuItem>
                                <MenuItem value='repuestos'>{t('catParts')}</MenuItem>
                                <MenuItem value='seguro'>{t('catInsurance')}</MenuItem>
                                <MenuItem value='service'>{t('catService')}</MenuItem>
                                <MenuItem value='vtv_itv'>{t('catInspection')}</MenuItem>
                                <MenuItem value='otros'>{t('catOther')}</MenuItem>
                            </Input>
                        </SelectInput>
                    </InputGroup>
                </FormRow>

                <InputGroup>
                    <InputLabel>{t('photos')} (max 3)</InputLabel>
                    <Box sx={{ 
                        display: 'flex', 
                        gap: '0.75rem', 
                        mt: 0.75,
                        p: 1.25,
                        background: '#f5f5f7',
                        borderRadius: '16px',
                    }}>
                        {photos.map((photo, index) => (
                            <Box
                                key={index}
                                sx={{
                                    width: 72,
                                    height: 72,
                                    borderRadius: '14px',
                                    backgroundImage: `url(${photo})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    position: 'relative',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    transition: 'transform 0.2s ease',
                                    '&:hover': { transform: 'scale(1.02)' }
                                }}
                            >
                                <Box
                                    onClick={() => removePhoto(index)}
                                    sx={{
                                        position: 'absolute',
                                        top: -6,
                                        right: -6,
                                        width: 22,
                                        height: 22,
                                        borderRadius: '50%',
                                        background: 'rgba(0,0,0,0.6)',
                                        backdropFilter: 'blur(10px)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        '&:hover': { background: '#ff3b30', transform: 'scale(1.1)' }
                                    }}
                                >
                                    <CloseIcon sx={{ fontSize: 12, color: 'white' }} />
                                </Box>
                            </Box>
                        ))}
                        {photos.length < 3 && (
                            <Box
                                onClick={handlePhotoClick}
                                sx={{
                                    width: 72,
                                    height: 72,
                                    borderRadius: '14px',
                                    border: '1.5px dashed #c7c7cc',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    background: 'transparent',
                                    '&:hover': { 
                                        borderColor: '#0071e3', 
                                        background: 'rgba(0,113,227,0.05)' 
                                    },
                                    '&:active': { transform: 'scale(0.98)' }
                                }}
                            >
                                <PhotoCameraIcon sx={{ fontSize: 22, color: '#aeaeb2' }} />
                                <Typography sx={{ fontSize: '0.6875rem', color: '#aeaeb2', mt: 0.25, fontWeight: 500 }}>
                                    {photos.length}/3
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoChange}
                        style={{ display: 'none' }}
                    />
                </InputGroup>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <SubmitButton type="submit">
                    <AddCircleOutlineIcon sx={{ fontSize: 20 }} />
                    {t('addExpense')}
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