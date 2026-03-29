import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCars } from '@/api'
import { CarInterface } from '@/interfaces'
import AddIcon from '@mui/icons-material/Add'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import GridViewIcon from '@mui/icons-material/GridView'
import SettingsIcon from '@mui/icons-material/Settings'
import { HeaderLeft } from '@/styles/pageStyles'
import { useLanguage } from '../../contexts/LanguageContext'
import SettingsModal from '../../components/SettingsModal/SettingsModal'
import {
  AddCard,
  CarDetail,
  CardIcon,
  CardsGrid,
  CardSubtitle,
  CardTitle,
  CarIconList,
  CarInfo,
  CarName,
  ChevronIcon,
  Container,
  EmptyState,
  Header,
  HeaderRight,
  IconBtn,
  ImageCarIcon,
  ImageCarPhoto,
  ListAddItem,
  ListContainer,
  PrimaryBtn,
  Subtitle,
  Title,
  ItemList,
  StyledCard
} from './CarsPageStyles'

const CarsPage: React.FC = () => {
    const [cars, setCars] = useState<CarInterface[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid')
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false)
    const navigate = useNavigate()
    const { t } = useLanguage()

    const fetchCars = async () => {
        try {
            const response = await getCars();
            console.log('Fetched cars:', response.data)
            setCars(response.data)
        } catch (error) {
            console.error('Error fetching cars:', error)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchCars()
    }, [])

    if (loading) {
        return (
            <Container>
                <Title sx={{ textAlign: 'center', color: '#86868b' }}>
                    {t('loadingVehicles')}
                </Title>
            </Container>
        );
    }

    return (
        <Container>
            <Header>
                <HeaderLeft>
                    <Title>{t('myVehicles')}</Title>
                    <Subtitle>
                        {cars.length} {cars.length === 1 ? t('vehicle') : t('vehicles')}
                    </Subtitle>
                </HeaderLeft>
                <HeaderRight>
                    <IconBtn onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}>
                        {viewMode === 'list' ? <GridViewIcon sx={{ fontSize: 20 }} /> : <FormatListBulletedIcon sx={{ fontSize: 20 }} />}
                    </IconBtn>
                    <IconBtn onClick={() => setSettingsOpen(true)}>
                        <SettingsIcon sx={{ fontSize: 20 }} />
                    </IconBtn>
                    <PrimaryBtn onClick={() => navigate('/add')}>
                        <AddIcon sx={{ fontSize: 20 }} />
                        {t('add')}
                    </PrimaryBtn>
                </HeaderRight>
            </Header>

            {cars.length === 0 ? (
                <EmptyState>
                    <DirectionsCarIcon sx={{ fontSize: 64, color: '#d1d1d6', mb: 2 }} />
                    <Title style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                        {t('noVehicles')}
                    </Title>
                    <Subtitle>
                        {t('addFirstVehicle')}
                    </Subtitle>
                    <PrimaryBtn 
                        onClick={() => navigate('/add')}
                        style={{ marginTop: '1.5rem', width: 'auto', padding: '0 1.5rem' }}
                    >
                        <AddIcon sx={{ fontSize: 20 }} />
                        {t('addVehicle')}
                    </PrimaryBtn>
                </EmptyState>
            ) : (
                <>
                    {viewMode === 'list' ? (
                        <ListContainer>
                            {cars.map((car) => (
                                <ItemList key={car.id} onClick={() => navigate(`/cars/${car.id}`)}>
                                    {car.photo ? (
                                        <ImageCarPhoto image={car.photo} size={5} />
                                    ) : (
                                        <CarIconList>
                                            <ImageCarIcon size={4} />
                                        </CarIconList>
                                    )}
                                    <CarInfo>
                                        <CarName>{car.brand} {car.model}</CarName>
                                        <CarDetail>{car.year} • {car.vin}</CarDetail>
                                    </CarInfo>
                                    <ChevronIcon>
                                        →
                                    </ChevronIcon>
                                </ItemList>
                            ))}
                            <ListAddItem onClick={() => navigate('/add')}>
                                <AddIcon sx={{ fontSize: 20 }} />
                                {t('addNewVehicle')}
                            </ListAddItem>
                        </ListContainer>
                    ) : (
                        <CardsGrid>
                            {cars.map((car) => (
                                <StyledCard key={car.id} onClick={() => navigate(`/cars/${car.id}`)}>
                                  {car.photo ? (
                                    <ImageCarPhoto image={car.photo} size={5} margin={1} />
                                  ) : (
                                    <CardIcon size={5} margin={2}>
                                      <ImageCarIcon size={5} margin={1} />
                                      </CardIcon>
                                  )}
                                    <CardTitle>{car.brand} {car.model}</CardTitle>
                                    <CardSubtitle>{car.year} • {car.vin}</CardSubtitle>
                                </StyledCard>
                            ))}
                            <AddCard onClick={() => navigate('/add')}>
                              <AddIcon sx={{ fontSize: 32 }} />
                              <CardSubtitle>{t('addVehicle')}</CardSubtitle>
                            </AddCard>
                        </CardsGrid>
                    )}
                </>
            )}
            <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
        </Container>
    )
}

export default CarsPage