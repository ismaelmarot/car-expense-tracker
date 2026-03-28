import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById, updateCar, deleteCar } from '../../api/api';
import { Typography, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { CarInterface } from '../../interfaces/CarInterface';
import { 
  Container, 
  Header, 
  HeaderLeft,
  HeaderRight,
  CarName,
  BackButton,
  CarInfoCard,
  PhotoSection,
  PhotoContainer,
  PhotoPreview,
  PhotoOverlay,
  EditIcon,
  DetailsContainer,
  DetailLabel,
  DetailValue,
  DetailRow,
  TabsContainer,
  TabButton,
  TabLabel,
  HiddenInput,
  LoadingContainer,
  TabContent,
  DeleteButton
} from './CarDetailsStyles';
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIconMui from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CarExpenses from '../CarExpenses/CarExpenses';
import AddExpense from '../AddExpense/AddExpense';
import ExpenseStats from '../ExpenseStats/ExpenseStats';

const CarDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [car, setCar] = useState<CarInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<string>('gasto');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

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

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePhotoClick = () => {
        fileInputRef.current?.click();
    };

    const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && car) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const photo = reader.result as string;
                try {
                    await updateCar(car.id, { ...car, photo });
                    setCar({ ...car, photo });
                } catch (error) {
                    console.error("Error updating photo: ", error);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
    };

    const handleDeleteConfirm = async () => {
        if (id) {
            try {
                await deleteCar(Number(id));
                navigate('/');
            } catch (error) {
                console.error("Error deleting car: ", error);
            }
        }
        setDeleteDialogOpen(false);
    };

    if (loading) {
        return (
            <Container>
                <LoadingContainer>
                    <Typography sx={{ color: '#86868b' }}>Cargando...</Typography>
                </LoadingContainer>
            </Container>
        );
    }

    if (!car) {
        return (
            <Container>
                <LoadingContainer>
                    <Typography color='error'>No se encontró información para este auto.</Typography>
                </LoadingContainer>
            </Container>
        );
    }

    return (
        <Container>
            <Header>
                <HeaderLeft>
                    <CarName>{car.brand} {car.model}</CarName>
                </HeaderLeft>
                <HeaderRight>
                    <BackButton onClick={() => navigate('/')}>
                        ← Volver
                    </BackButton>
                </HeaderRight>
            </Header>

            <CarInfoCard>
                <PhotoSection>
                    {car.photo ? (
                        <PhotoPreview 
                            style={{ backgroundImage: `url(${car.photo})` }}
                            onClick={handlePhotoClick}
                        >
                            <PhotoOverlay className='photo-overlay'>
                                <span style={{ color: 'white', fontSize: '0.875rem' }}>Cambiar</span>
                            </PhotoOverlay>
                            <EditIcon onClick={handlePhotoClick}>
                                <EditIconMui sx={{ fontSize: 18 }} />
                            </EditIcon>
                        </PhotoPreview>
                    ) : (
                        <PhotoContainer onClick={handlePhotoClick}>
                            <PhotoCameraIcon sx={{ fontSize: 40, color: '#aeaeb2' }} />
                            <EditIcon onClick={handlePhotoClick}>
                                <EditIconMui sx={{ fontSize: 18 }} />
                            </EditIcon>
                        </PhotoContainer>
                    )}
                    <HiddenInput
                        ref={fileInputRef}
                        type='file'
                        accept='image/*'
                        onChange={handlePhotoChange}
                    />
                </PhotoSection>

                <DetailsContainer>
                    <DetailRow>
                        <DetailLabel>Vehículo</DetailLabel>
                        <DetailValue>{car.brand} {car.model}</DetailValue>
                    </DetailRow>
                    {car.version && (
                        <DetailRow>
                            <DetailLabel>Versión</DetailLabel>
                            <DetailValue>{car.version}</DetailValue>
                        </DetailRow>
                    )}
                    <DetailRow>
                        <DetailLabel>Año</DetailLabel>
                        <DetailValue>{car.year}</DetailValue>
                    </DetailRow>
                    <DetailRow>
                        <DetailLabel>Patente</DetailLabel>
                        <DetailValue>{car.vin}</DetailValue>
                    </DetailRow>
                    <DeleteButton onClick={handleDeleteClick}>
                        <DeleteIcon sx={{ fontSize: 16 }} />
                        Eliminar
                    </DeleteButton>
                </DetailsContainer>
            </CarInfoCard>

            <TabsContainer>
                <TabButton 
                    active={activeTab === 'gasto'} 
                    onClick={() => handleTabClick('gasto')}
                >
                    <AddIcon sx={{ fontSize: 18 }} />
                    <TabLabel>Agregar gasto</TabLabel>
                </TabButton>
                <TabButton 
                    active={activeTab === 'historial'} 
                    onClick={() => handleTabClick('historial')}
                >
                    <HistoryIcon sx={{ fontSize: 18 }} />
                    <TabLabel>Historial</TabLabel>
                </TabButton>
                <TabButton 
                    active={activeTab === 'grafica'} 
                    onClick={() => handleTabClick('grafica')}
                >
                    <BarChartIcon sx={{ fontSize: 18 }} />
                    <TabLabel>Gráfica</TabLabel>
                </TabButton>
                <TabButton 
                    active={activeTab === 'ajustes'} 
                    onClick={() => handleTabClick('ajustes')}
                >
                    <SettingsIcon sx={{ fontSize: 18 }} />
                    <TabLabel>Ajustes</TabLabel>
                </TabButton>
            </TabsContainer>

            {/* Contenido según la pestaña seleccionada */}
            <TabContent>
                {activeTab === 'gasto' && <AddExpense />}
                {activeTab === 'historial' && <CarExpenses />}
                {activeTab === 'grafica' && <ExpenseStats key={`stats-${windowSize}`} />}
                {activeTab === 'ajustes' && (
                    <Box sx={{ 
                        p: 3, 
                        mt: 2, 
                        backgroundColor: '#f5f5f7', 
                        borderRadius: '12px',
                        textAlign: 'center',
                        color: '#86868b'
                    }}>
                        <BuildIcon sx={{ fontSize: 48, color: '#86868b', mb: 1 }} />
                        <Typography variant="h6" sx={{ color: '#1d1d1f', mb: 1 }}>
                            Ajustes
                        </Typography>
                        <Typography sx={{ color: '#86868b' }}>
                            Configuración próximamente
                        </Typography>
                    </Box>
                )}
            </TabContent>

            {/* Modal de confirmación para eliminar */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
                PaperProps={{
                    sx: {
                        borderRadius: '16px',
                        padding: '0.5rem'
                    }
                }}
            >
                <DialogTitle id="delete-dialog-title" sx={{ 
                    fontWeight: 600, 
                    color: '#1d1d1f',
                    fontSize: '1.125rem'
                }}>
                    Eliminar vehículo
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description" sx={{ 
                        color: '#86868b',
                        fontSize: '0.9375rem'
                    }}>
                        ¿Estás seguro de que deseas eliminar {car.brand} {car.model}? Esta acción eliminará todos los gastos asociados y no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ padding: '0 1.5rem 1rem' }}>
                    <Button 
                        onClick={handleDeleteCancel}
                        sx={{ 
                            color: '#0071e3',
                            fontWeight: 500,
                            borderRadius: '12px',
                            padding: '0.5rem 1rem'
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        onClick={handleDeleteConfirm}
                        sx={{ 
                            backgroundColor: '#ff3b30',
                            color: 'white',
                            fontWeight: 500,
                            borderRadius: '12px',
                            padding: '0.5rem 1rem',
                            '&:hover': {
                                backgroundColor: '#e53528'
                            }
                        }}
                    >
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default CarDetails;