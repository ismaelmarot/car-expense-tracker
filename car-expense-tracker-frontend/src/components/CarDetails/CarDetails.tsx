import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById, updateCar, deleteCar, getCarExpenses } from '../../api/api';
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
  CardHeader,
  PhotoWrapper,
  PhotoImage,
  PhotoPlaceholder,
  PhotoEditOverlay,
  CardInfo,
  CardTitle,
  CardSubtitle,
  CardMeta,
  ExpandIcon,
  CardExpandedContent,
  DetailGrid,
  DetailItem,
  DetailLabel,
  DetailValue,
  ActionButtons,
  EditButton,
  DeleteButton,
  TabsContainer,
  TabButton,
  TabLabel,
  HiddenInput,
  LoadingContainer,
  TabContent,
  Form,
  FormRow,
  InputGroup,
  InputLabel,
  Input
} from './CarDetailsStyles';
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIconMui from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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
    const [expanded, setExpanded] = useState<boolean>(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
    const [editData, setEditData] = useState({
        brand: '',
        model: '',
        year: '',
        vin: '',
        version: '',
        photo: ''
    });
    const [windowSize, setWindowSize] = useState<number>(window.innerWidth);
    const [lastKilometers, setLastKilometers] = useState<number | null>(null);
    const editFileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (id) {
            const fetchCarDetails = async () => {
                try {
                    const [carResponse, expensesResponse] = await Promise.all([
                        getCarById(Number(id)),
                        getCarExpenses(Number(id))
                    ]);
                    setCar(carResponse.data);
                    
                    const expenses = expensesResponse;
                    const expensesWithKm = expenses
                        .filter((e: any) => e.kilometers && e.kilometers > 0)
                        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
                    
                    if (expensesWithKm.length > 0) {
                        setLastKilometers(expensesWithKm[0].kilometers);
                    }
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

    const handleEditClick = () => {
        if (car) {
            setEditData({
                brand: car.brand,
                model: car.model,
                year: car.year.toString(),
                vin: car.vin,
                version: car.version || '',
                photo: car.photo || ''
            });
            setEditDialogOpen(true);
        }
    };

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditData({
            ...editData,
            [name]: name === 'vin' ? value.toUpperCase() : value
        });
    };

    const handleEditSave = async () => {
        if (car && id) {
            try {
                const updatedCar = {
                    ...car,
                    brand: editData.brand,
                    model: editData.model,
                    year: Number(editData.year),
                    vin: editData.vin,
                    version: editData.version || undefined,
                    photo: editData.photo || undefined
                };
                await updateCar(Number(id), updatedCar);
                setCar(updatedCar);
                setEditDialogOpen(false);
            } catch (error) {
                console.error("Error updating car: ", error);
            }
        }
    };

    const handleEditPhotoClick = () => {
        editFileInputRef.current?.click();
    };

    const handleEditPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditData({ ...editData, photo: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCardClick = () => {
        setExpanded(!expanded);
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
                <CardHeader 
                    onClick={handleCardClick}
                    sx={{ background: expanded ? 'rgba(0, 113, 227, 0.03)' : 'transparent' }}
                >
                    <PhotoWrapper>
                        {car.photo ? (
                            <PhotoImage sx={{ backgroundImage: `url(${car.photo})` }} />
                        ) : (
                            <PhotoPlaceholder>
                                <PhotoCameraIcon sx={{ fontSize: 28, color: '#aeaeb2' }} />
                            </PhotoPlaceholder>
                        )}
                    </PhotoWrapper>
                    
                    <CardInfo>
                        <CardTitle>{car.model}</CardTitle>
                        {car.version && <CardSubtitle>{car.version}</CardSubtitle>}
                    </CardInfo>
                    
                    <ExpandIcon sx={{ 
                        transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}>
                        <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />
                    </ExpandIcon>
                </CardHeader>
                
                <HiddenInput
                    ref={fileInputRef}
                    type='file'
                    accept='image/*'
                    onChange={handlePhotoChange}
                />

                <CardExpandedContent sx={{ 
                    display: expanded ? 'block' : 'none',
                    animation: expanded ? 'slideDown 0.3s ease' : 'none',
                    '@keyframes slideDown': {
                        from: { opacity: 0, transform: 'translateY(-10px)' },
                        to: { opacity: 1, transform: 'translateY(0)' }
                    }
                }}>
                    <Box sx={{ p: '1.5rem' }}>
                        <DetailGrid>
                            <DetailItem>
                                <DetailLabel>Marca</DetailLabel>
                                <DetailValue>{car.brand}</DetailValue>
                            </DetailItem>
                            <DetailItem>
                                <DetailLabel>Año</DetailLabel>
                                <DetailValue>{car.year}</DetailValue>
                            </DetailItem>
                            <DetailItem>
                                <DetailLabel>Patente</DetailLabel>
                                <DetailValue>{car.vin}</DetailValue>
                            </DetailItem>
                            <DetailItem>
                                <DetailLabel>Último kilometraje</DetailLabel>
                                <DetailValue>{lastKilometers ? `${lastKilometers.toLocaleString()} km` : 'Sin registro'}</DetailValue>
                            </DetailItem>
                        </DetailGrid>
                        
                        <ActionButtons>
                            <EditButton onClick={handleEditClick}>
                                <EditIconMui sx={{ fontSize: 18 }} />
                                Editar
                            </EditButton>
                            <DeleteButton onClick={handleDeleteClick}>
                                <DeleteIcon sx={{ fontSize: 16 }} />
                                Eliminar
                            </DeleteButton>
                        </ActionButtons>
                    </Box>
                </CardExpandedContent>
            </CarInfoCard>

            <TabsContainer>
                <TabButton 
                    onClick={() => handleTabClick('gasto')}
                    sx={{ 
                        background: activeTab === 'gasto' ? '#0071e3' : '#f5f5f7',
                        color: activeTab === 'gasto' ? 'white' : '#1d1d1f',
                        '&:hover': { background: activeTab === 'gasto' ? '#0077ed' : '#e8e8ed' }
                    }}
                >
                    <AddIcon sx={{ fontSize: 18 }} />
                    <TabLabel>Agregar gasto</TabLabel>
                </TabButton>
                <TabButton 
                    onClick={() => handleTabClick('historial')}
                    sx={{ 
                        background: activeTab === 'historial' ? '#0071e3' : '#f5f5f7',
                        color: activeTab === 'historial' ? 'white' : '#1d1d1f',
                        '&:hover': { background: activeTab === 'historial' ? '#0077ed' : '#e8e8ed' }
                    }}
                >
                    <HistoryIcon sx={{ fontSize: 18 }} />
                    <TabLabel>Historial</TabLabel>
                </TabButton>
                <TabButton 
                    onClick={() => handleTabClick('grafica')}
                    sx={{ 
                        background: activeTab === 'grafica' ? '#0071e3' : '#f5f5f7',
                        color: activeTab === 'grafica' ? 'white' : '#1d1d1f',
                        '&:hover': { background: activeTab === 'grafica' ? '#0077ed' : '#e8e8ed' }
                    }}
                >
                    <BarChartIcon sx={{ fontSize: 18 }} />
                    <TabLabel>Gráfica</TabLabel>
                </TabButton>
                <TabButton 
                    onClick={() => handleTabClick('ajustes')}
                    sx={{ 
                        background: activeTab === 'ajustes' ? '#0071e3' : '#f5f5f7',
                        color: activeTab === 'ajustes' ? 'white' : '#1d1d1f',
                        '&:hover': { background: activeTab === 'ajustes' ? '#0077ed' : '#e8e8ed' }
                    }}
                >
                    <SettingsIcon sx={{ fontSize: 18 }} />
                    <TabLabel>Ajustes</TabLabel>
                </TabButton>
            </TabsContainer>

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

            <Dialog
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '16px',
                        padding: '0.5rem'
                    }
                }}
            >
                <DialogTitle sx={{ 
                    fontWeight: 600, 
                    color: '#1d1d1f',
                    fontSize: '1.25rem',
                    pb: 1
                }}>
                    Editar vehículo
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                        <Box 
                            onClick={handleEditPhotoClick}
                            sx={{ 
                                width: 100, 
                                height: 100, 
                                borderRadius: '20px', 
                                overflow: 'hidden',
                                cursor: 'pointer',
                                background: editData.photo 
                                    ? `url(${editData.photo}) center/cover` 
                                    : 'linear-gradient(135deg, #f5f5f7 0%, #ececf1 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid rgba(0,0,0,0.06)',
                                position: 'relative',
                                '&:hover .edit-overlay': { opacity: 1 }
                            }}
                        >
                            {!editData.photo && (
                                <PhotoCameraIcon sx={{ fontSize: 32, color: '#aeaeb2' }} />
                            )}
                            <Box 
                                className="edit-overlay"
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'rgba(0,0,0,0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    opacity: 0,
                                    transition: 'opacity 0.2s'
                                }}
                            >
                                <EditIconMui sx={{ color: 'white', fontSize: 24 }} />
                            </Box>
                        </Box>
                        <Typography sx={{ mt: 1, fontSize: '0.8125rem', color: '#86868b' }}>
                            Toca para cambiar la foto
                        </Typography>
                        <input
                            ref={editFileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleEditPhotoChange}
                            style={{ display: 'none' }}
                        />
                    </Box>
                    <Form onSubmit={(e) => { e.preventDefault(); handleEditSave(); }}>
                        <FormRow>
                            <InputGroup>
                                <InputLabel>Marca</InputLabel>
                                    <Input
                                        placeholder="Ej: Toyota"
                                        name='brand'
                                        value={editData.brand}
                                        onChange={handleEditInputChange}
                                        required
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <InputLabel>Modelo</InputLabel>
                                    <Input
                                        placeholder="Ej: Corolla"
                                        name='model'
                                        value={editData.model}
                                        onChange={handleEditInputChange}
                                        required
                                    />
                                </InputGroup>
                            </FormRow>
                            <FormRow>
                                <InputGroup>
                                    <InputLabel>Versión (opcional)</InputLabel>
                                    <Input
                                        placeholder="Ej: SE-G"
                                        name='version'
                                        value={editData.version}
                                        onChange={handleEditInputChange}
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <InputLabel>Año</InputLabel>
                                    <Input
                                        placeholder="Ej: 2023"
                                        name='year'
                                        value={editData.year}
                                        onChange={handleEditInputChange}
                                        maxLength={4}
                                        pattern='[0-9]{4}'
                                        inputMode='numeric'
                                        required
                                    />
                                </InputGroup>
                            </FormRow>
                            <InputGroup>
                                <InputLabel>Patente</InputLabel>
                                <Input
                                    placeholder="Ej: ABC123"
                                    name='vin'
                                    value={editData.vin}
                                    onChange={handleEditInputChange}
                                    required
                                />
                            </InputGroup>
                        </Form>
                </DialogContent>
                <DialogActions sx={{ padding: '0 1.5rem 1.5rem' }}>
                    <Button 
                        onClick={() => setEditDialogOpen(false)}
                        sx={{ 
                            color: '#86868b',
                            fontWeight: 500,
                            borderRadius: '34px',
                            padding: '0.625rem 1.25rem'
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        onClick={handleEditSave}
                        sx={{ 
                            backgroundColor: '#0071e3',
                            color: 'white',
                            fontWeight: 500,
                            borderRadius: '34px',
                            padding: '0.625rem 1.5rem',
                            '&:hover': {
                                backgroundColor: '#0077ed'
                            }
                        }}
                    >
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>

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
                            borderRadius: '34px',
                            padding: '0.625rem 1.25rem'
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
                            borderRadius: '34px',
                            padding: '0.625rem 1.5rem',
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
