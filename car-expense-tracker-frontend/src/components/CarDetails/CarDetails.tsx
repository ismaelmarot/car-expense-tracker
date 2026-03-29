import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById, updateCar, deleteCar, getCarExpenses } from '../../api/api';
import { Typography, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { CarInterface } from '../../interfaces/CarInterface';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  Container, 
  Header, 
  HeaderLeft,
  HeaderRight,
  CarName,
  BackButton,
  CarInfoCard,
  CardHeader,
  CardHeaderCollapsed,
  CardHeaderInfo,
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
  DetailGridSecondRow,
  DetailGridThreeColumns,
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
import Settings from '../Settings/Settings';

const CarDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
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
        photo: '',
        last_service_km: '',
        service_interval_km: '',
        vtv_date: '',
        extintor_date: ''
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

    const formatKm = (value: string): string => {
        const cleanValue = value.replace(/[^\d]/g, '');
        return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const getRawKm = (value: string): string => {
        return value.replace(/\./g, '');
    };

    const formatDate = (dateStr: string | undefined): string => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-AR');
    };

    const isDateExpired = (dateStr: string | undefined): boolean => {
        if (!dateStr) return false;
        const date = getNextDueDate(dateStr);
        return date < new Date();
    };

    const getNextDueDate = (dateStr: string | undefined): Date => {
        if (!dateStr) return new Date();
        const lastDate = new Date(dateStr);
        const nextDate = new Date(lastDate);
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        return nextDate;
    };

    const formatNextDueDate = (dateStr: string | undefined): string => {
        if (!dateStr) return '-';
        const nextDate = getNextDueDate(dateStr);
        return nextDate.toLocaleDateString('es-AR');
    };

    const getTimeRemaining = (dateStr: string | undefined): string => {
        if (!dateStr) return '';
        const targetDate = getNextDueDate(dateStr);
        const today = new Date();
        const diffTime = targetDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) {
            return `Vencido hace ${Math.abs(diffDays)} días`;
        } else if (diffDays === 0) {
            return 'Vence hoy';
        } else if (diffDays === 1) {
            return 'Vence mañana';
        } else if (diffDays < 30) {
            return `${diffDays} días restantes`;
        } else if (diffDays < 365) {
            const months = Math.floor(diffDays / 30);
            return `${months} mes${months > 1 ? 'es' : ''} restantes`;
        } else {
            const years = Math.floor(diffDays / 365);
            return `${years} año${years > 1 ? 's' : ''} restantes`;
        }
    };

    const getNextServiceKm = (): number | null => {
        if (!car || !car.last_service_km || !car.service_interval_km) return null;
        return car.last_service_km + car.service_interval_km;
    };

    const getRemainingServiceKm = (): number | null => {
        if (!car || !lastKilometers || !car.last_service_km || !car.service_interval_km) return null;
        const nextService = getNextServiceKm();
        if (!nextService) return null;
        return nextService - lastKilometers;
    };

    const handleEditClick = () => {
        if (car) {
            setEditData({
                brand: car.brand,
                model: car.model,
                year: car.year.toString(),
                vin: car.vin,
                version: car.version || '',
                photo: car.photo || '',
                last_service_km: car.last_service_km ? formatKm(car.last_service_km.toString()) : '',
                service_interval_km: car.service_interval_km ? formatKm(car.service_interval_km.toString()) : '',
                vtv_date: car.vtv_date || '',
                extintor_date: car.extintor_date || ''
            });
            setEditDialogOpen(true);
        }
    };

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        if (name === 'last_service_km' || name === 'service_interval_km') {
            const formatted = formatKm(value);
            setEditData({
                ...editData,
                [name]: formatted
            });
        } else {
            setEditData({
                ...editData,
                [name]: name === 'vin' ? value.toUpperCase() : value
            });
        }
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
                    photo: editData.photo || undefined,
                    last_service_km: editData.last_service_km ? Number(getRawKm(editData.last_service_km)) : undefined,
                    service_interval_km: editData.service_interval_km ? Number(getRawKm(editData.service_interval_km)) : undefined,
                    vtv_date: editData.vtv_date || undefined,
                    extintor_date: editData.extintor_date || undefined
                };
                console.log('=== EDIT CAR DATA ===');
                console.log('last_service_km:', updatedCar.last_service_km);
                console.log('service_interval_km:', updatedCar.service_interval_km);
                console.log('vtv_date:', updatedCar.vtv_date);
                console.log('extintor_date:', updatedCar.extintor_date);
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
                        {t('back')}
                    </BackButton>
                </HeaderRight>
            </Header>

            <CarInfoCard>
                <CardHeader 
                    onClick={handleCardClick}
                    sx={{ background: expanded ? 'rgba(0, 113, 227, 0.03)' : 'transparent' }}
                >
                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                        {!expanded && (
                            <CardHeaderCollapsed>
                                <PhotoWrapper>
                                    {car.photo ? (
                                        <PhotoImage sx={{ backgroundImage: `url(${car.photo})` }} />
                                    ) : (
                                        <PhotoPlaceholder>
                                            <PhotoCameraIcon sx={{ fontSize: 28, color: '#aeaeb2' }} />
                                        </PhotoPlaceholder>
                                    )}
                                </PhotoWrapper>
                                
                                <CardHeaderInfo>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                                            {car.brand || ''} {car.model || ''}{car.version ? ` - ${car.version}` : ''}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#86868b' }}>
                                            {car.year ? `${car.year}` : ''}{car.year && car.vin ? ' • ' : ''}{car.vin || ''}
                                        </Typography>
                                    </Box>
                                </CardHeaderInfo>
                            </CardHeaderCollapsed>
                        )}
                        
                        {expanded && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <PhotoWrapper sx={{ width: 80, height: 80, marginRight: 1 }}>
                                    {car.photo ? (
                                        <PhotoImage sx={{ backgroundImage: `url(${car.photo})` }} />
                                    ) : (
                                        <PhotoPlaceholder>
                                            <PhotoCameraIcon sx={{ fontSize: 28, color: '#aeaeb2' }} />
                                        </PhotoPlaceholder>
                                    )}
                                </PhotoWrapper>
                            </Box>
                        )}
                        
                        <ExpandIcon sx={{ 
                            position: 'relative',
                            marginLeft: 'auto',
                            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            width: 32,
                            height: 32,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: expanded ? 'rgba(0, 113, 227, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                            borderRadius: '50%'
                        }}>
                            <KeyboardArrowDownIcon sx={{ fontSize: 20, color: expanded ? '#0071e3' : '#86868b' }} />
                        </ExpandIcon>
                    </Box>
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
                }} expanded={expanded}>
                    <Box sx={{ p: '1.5rem' }}>
                        <DetailGrid>
                            <DetailItem>
                                <DetailLabel>{t('brand')}</DetailLabel>
                                <DetailValue>{car.brand || '-'}</DetailValue>
                            </DetailItem>
                            <DetailItem>
                                <DetailLabel>{t('year')}</DetailLabel>
                                <DetailValue>{car.year || '-'}</DetailValue>
                            </DetailItem>
                            <DetailItem>
                                <DetailLabel>{t('licensePlate')}</DetailLabel>
                                <DetailValue>{car.vin || '-'}</DetailValue>
                            </DetailItem>
                        </DetailGrid>
                        
                        <DetailGridSecondRow>
                            <DetailItem>
                                <DetailLabel>{t('kilometers')}</DetailLabel>
                                <DetailValue>{lastKilometers ? `${lastKilometers.toLocaleString('es-AR')} km` : '-'}</DetailValue>
                            </DetailItem>
                        </DetailGridSecondRow>
                        
                        <DetailGridThreeColumns>
                            <DetailItem>
                                <DetailLabel>{t('serviceEvery')}</DetailLabel>
                                <DetailValue>{car.service_interval_km != null ? `${car.service_interval_km.toLocaleString('es-AR')} km` : '-'}</DetailValue>
                            </DetailItem>
                            <DetailItem>
                                <DetailLabel>{t('lastService')}</DetailLabel>
                                <DetailValue>{car.last_service_km != null ? `${car.last_service_km.toLocaleString('es-AR')} km` : '-'}</DetailValue>
                            </DetailItem>
                            <DetailItem>
                                <DetailLabel>{t('nextService')}</DetailLabel>
                                {getNextServiceKm() !== null ? (
                                    <DetailValue>
                                        {getNextServiceKm()!.toLocaleString('es-AR')} km
                                    </DetailValue>
                                ) : (
                                    <DetailValue style={{ color: '#aeaeb2' }}>-</DetailValue>
                                )}
                            </DetailItem>
                        </DetailGridThreeColumns>
                        
                        {getRemainingServiceKm() !== null && (
                            <DetailGridSecondRow>
                                <DetailItem>
                                    <DetailLabel>{t('remainingForService')}</DetailLabel>
                                    <DetailValue style={getRemainingServiceKm()! <= 0 ? { color: '#ff3b30' } : {}}>
                                        {getRemainingServiceKm()! <= 0 
                                            ? `Vencido (${getRemainingServiceKm()!.toLocaleString('es-AR')} km)`
                                            : `${getRemainingServiceKm()!.toLocaleString('es-AR')} km`
                                        }
                                    </DetailValue>
                                </DetailItem>
                                <Box />
                            </DetailGridSecondRow>
                        )}
                        
                        <DetailGridSecondRow>
                            <DetailItem>
                                <DetailLabel>{t('nextVTV')}</DetailLabel>
                                <DetailValue style={isDateExpired(car.vtv_date) ? { color: '#ff3b30' } : {}}>
                                    {car.vtv_date != null && car.vtv_date !== '' ? formatNextDueDate(car.vtv_date) : '-'}
                                </DetailValue>
                            </DetailItem>
                            <DetailItem>
                                <DetailLabel>{t('timeRemaining')}</DetailLabel>
                                <DetailValue style={isDateExpired(car.vtv_date) ? { color: '#ff3b30' } : {}}>
                                    {car.vtv_date != null && car.vtv_date !== '' ? getTimeRemaining(car.vtv_date) : '-'}
                                </DetailValue>
                            </DetailItem>
                        </DetailGridSecondRow>
                        
                        <DetailGridSecondRow>
                            <DetailItem>
                                <DetailLabel>{t('nextExtinguisher')}</DetailLabel>
                                <DetailValue style={isDateExpired(car.extintor_date) ? { color: '#ff3b30' } : {}}>
                                    {car.extintor_date != null && car.extintor_date !== '' ? formatNextDueDate(car.extintor_date) : '-'}
                                </DetailValue>
                            </DetailItem>
                            <DetailItem>
                                <DetailLabel>{t('timeRemaining')}</DetailLabel>
                                <DetailValue style={isDateExpired(car.extintor_date) ? { color: '#ff3b30' } : {}}>
                                    {car.extintor_date != null && car.extintor_date !== '' ? getTimeRemaining(car.extintor_date) : '-'}
                                </DetailValue>
                            </DetailItem>
                        </DetailGridSecondRow>
                        
                        <ActionButtons>
                            <EditButton onClick={handleEditClick}>
                                <EditIconMui sx={{ fontSize: 18 }} />
                                {t('edit')}
                            </EditButton>
                            <DeleteButton onClick={handleDeleteClick}>
                                <DeleteIcon sx={{ fontSize: 16 }} />
                                {t('delete')}
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
                    <TabLabel>{t('addExpense')}</TabLabel>
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
                    <TabLabel>{t('history')}</TabLabel>
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
                    <TabLabel>{t('statistics')}</TabLabel>
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
                    <TabLabel>{t('settingsTab')}</TabLabel>
                </TabButton>
            </TabsContainer>

            <TabContent>
                {activeTab === 'gasto' && <AddExpense />}
                {activeTab === 'historial' && <CarExpenses />}
                {activeTab === 'grafica' && <ExpenseStats key={`stats-${windowSize}`} />}
                {activeTab === 'ajustes' && <Settings />}
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
                    {t('edit')} {t('brand')}
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
                                <InputLabel>{t('brand')}</InputLabel>
                                    <Input
                                        placeholder="Ej: Toyota"
                                        name='brand'
                                        value={editData.brand}
                                        onChange={handleEditInputChange}
                                        required
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <InputLabel>{t('model')}</InputLabel>
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
                                    <InputLabel>{t('version')} ({t('optional')})</InputLabel>
                                    <Input
                                        placeholder="Ej: SE-G"
                                        name='version'
                                        value={editData.version}
                                        onChange={handleEditInputChange}
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <InputLabel>{t('year')}</InputLabel>
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
                                <InputLabel>{t('licensePlate')}</InputLabel>
                                <Input
                                    placeholder="Ej: ABC123"
                                    name='vin'
                                    value={editData.vin}
                                    onChange={handleEditInputChange}
                                    required
                                />
                            </InputGroup>
                            <FormRow>
                                <InputGroup>
                                    <InputLabel>{t('lastServiceKm')}</InputLabel>
                                    <Input
                                        placeholder="Ej: 50000"
                                        name='last_service_km'
                                        value={editData.last_service_km}
                                        onChange={handleEditInputChange}
                                        type="text"
                                        inputMode="numeric"
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <InputLabel>{t('serviceEveryKm')}</InputLabel>
                                    <Input
                                        placeholder="Ej: 10000"
                                        name='service_interval_km'
                                        value={editData.service_interval_km}
                                        onChange={handleEditInputChange}
                                        type="text"
                                        inputMode="numeric"
                                    />
                                </InputGroup>
                            </FormRow>
                            <FormRow>
                                <InputGroup>
                                    <InputLabel>{t('vtvDate')}</InputLabel>
                                    <Input
                                        type="date"
                                        name='vtv_date'
                                        value={editData.vtv_date}
                                        onChange={handleEditInputChange}
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <InputLabel>{t('extinguisherDate')}</InputLabel>
                                    <Input
                                        type="date"
                                        name='extintor_date'
                                        value={editData.extintor_date}
                                        onChange={handleEditInputChange}
                                    />
                                </InputGroup>
                            </FormRow>
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
                        {t('cancel')}
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
                    {t('delete')} {t('brand')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description" sx={{ 
                        color: '#86868b',
                        fontSize: '0.9375rem'
                    }}>
                        {t('deleteConfirm')} {car.brand} {car.model}? {t('deleteWarning')}
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
                        {t('cancel')}
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
