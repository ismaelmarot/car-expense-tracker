import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById, updateCar } from '../../api/api';
import { Typography, Box } from '@mui/material';
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
  DetailValue,
  TabsContainer,
  TabButton,
  HiddenInput,
  LoadingContainer
} from './CarDetailsStyles';
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIconMui from '@mui/icons-material/Edit';
import CarExpenses from '../CarExpenses/CarExpenses';
import CarExpensesGraphics from '../CarExpensesGraphics/CarExpensesGraphics';

const CarDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [car, setCar] = useState<CarInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<string>('gasto');

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
                            <span style={{ fontSize: '2rem', color: '#aeaeb2' }}>📷</span>
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
                    <DetailValue>{car.brand} {car.model}</DetailValue>
                    {car.version && <DetailValue>{car.version}</DetailValue>}
                    <DetailValue>{car.year}</DetailValue>
                    <DetailValue>{car.vin}</DetailValue>
                </DetailsContainer>
            </CarInfoCard>

            <TabsContainer>
                <TabButton 
                    active={activeTab === 'gasto'} 
                    onClick={() => handleTabClick('gasto')}
                >
                    <AddIcon sx={{ fontSize: 18 }} />
                    Agregar gasto
                </TabButton>
                <TabButton 
                    active={activeTab === 'historial'} 
                    onClick={() => handleTabClick('historial')}
                >
                    <HistoryIcon sx={{ fontSize: 18 }} />
                    Historial
                </TabButton>
                <TabButton 
                    active={activeTab === 'grafica'} 
                    onClick={() => handleTabClick('grafica')}
                >
                    <BarChartIcon sx={{ fontSize: 18 }} />
                    Gráfica
                </TabButton>
                <TabButton 
                    active={activeTab === 'ajustes'} 
                    onClick={() => handleTabClick('ajustes')}
                >
                    <SettingsIcon sx={{ fontSize: 18 }} />
                    Ajustes
                </TabButton>
            </TabsContainer>

            {/* Contenido según la pestaña seleccionada */}
            {activeTab === 'gasto' && <CarExpenses />}
            {activeTab === 'historial' && <CarExpenses />}
            {activeTab === 'grafica' && <CarExpensesGraphics />}
            {activeTab === 'ajustes' && (
                <Box sx={{ 
                    p: 3, 
                    mt: 2, 
                    backgroundColor: '#f5f5f7', 
                    borderRadius: '12px',
                    textAlign: 'center',
                    color: '#86868b'
                }}>
                    <Typography variant="h6" sx={{ color: '#1d1d1f', mb: 1 }}>
                        ⚙️ Ajustes
                    </Typography>
                    <Typography sx={{ color: '#86868b' }}>
                        Configuración próximamente
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default CarDetails;