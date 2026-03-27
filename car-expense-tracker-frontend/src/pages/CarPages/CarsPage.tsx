import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCars } from '@/api'
import { Card, ListItem } from '@mui/material'
import { CarInterface } from '../../interfaces/CarInterface'
import AddIcon from '@mui/icons-material/Add'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import GridViewIcon from '@mui/icons-material/GridView'
import { HeaderLeft } from '@/styles/pageStyles'
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
  ListAddItem,
  ListContainer,
  PrimaryBtn,
  Subtitle,
  Title
} from './CarsPageStyles'

const CarsPage: React.FC = () => {
    const [cars, setCars] = useState<CarInterface[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid')
    const navigate = useNavigate()

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
                    Cargando vehículos...
                </Title>
            </Container>
        );
    }

    return (
        <Container>
            <Header>
                <HeaderLeft>
                    <Title>Mis Vehículos</Title>
                    <Subtitle>
                        {cars.length} {cars.length === 1 ? 'vehículo' : 'vehículos'} registrado{cars.length !== 1 ? 's' : ''}
                    </Subtitle>
                </HeaderLeft>
                <HeaderRight>
                    <IconBtn onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}>
                        {viewMode === 'list' ? <GridViewIcon sx={{ fontSize: 20 }} /> : <FormatListBulletedIcon sx={{ fontSize: 20 }} />}
                    </IconBtn>
                    <PrimaryBtn onClick={() => navigate('/add')}>
                        <AddIcon sx={{ fontSize: 20 }} />
                        Agregar
                    </PrimaryBtn>
                </HeaderRight>
            </Header>

            {cars.length === 0 ? (
                <EmptyState>
                    <DirectionsCarIcon sx={{ fontSize: 64, color: '#d1d1d6', mb: 2 }} />
                    <Title style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                        No hay vehículos registrados
                    </Title>
                    <Subtitle>
                        Agregá tu primer vehículo para comenzar a rastrear tus gastos
                    </Subtitle>
                    <PrimaryBtn 
                        onClick={() => navigate('/add')}
                        style={{ marginTop: '1.5rem', width: 'auto', padding: '0 1.5rem' }}
                    >
                        <AddIcon sx={{ fontSize: 20 }} />
                        Agregar Vehículo
                    </PrimaryBtn>
                </EmptyState>
            ) : (
                <>
                    {viewMode === 'list' ? (
                        <ListContainer>
                            {cars.map((car) => (
                                <ListItem key={car.id} onClick={() => navigate(`/cars/${car.id}`)}>
                                    {car.photo ? (
                                        <div style={{ 
                                            width: '44px', 
                                            height: '44px', 
                                            borderRadius: '12px', 
                                            backgroundImage: `url(${car.photo})`, 
                                            backgroundSize: 'cover', 
                                            backgroundPosition: 'center',
                                            flexShrink: 0,
                                            boxShadow: '0 4px 12px rgba(0, 113, 227, 0.25)'
                                        }} />
                                    ) : (
                                        <CarIconList>
                                            <DirectionsCarIcon sx={{ fontSize: 24 }} />
                                        </CarIconList>
                                    )}
                                    <CarInfo>
                                        <CarName>{car.brand} {car.model}</CarName>
                                        <CarDetail> · {car.year} · {car.vin}</CarDetail>
                                    </CarInfo>
                                    <ChevronIcon>
                                        →
                                    </ChevronIcon>
                                </ListItem>
                            ))}
                            <ListAddItem onClick={() => navigate('/add')}>
                                <AddIcon sx={{ fontSize: 20 }} />
                                Agregar nuevo vehículo
                            </ListAddItem>
                        </ListContainer>
                    ) : (
                        <CardsGrid>
                            {cars.map((car) => (
                                <Card key={car.id} onClick={() => navigate(`/cars/${car.id}`)}>
                                    {car.photo ? (
                                        <div style={{ 
                                            width: '48px', 
                                            height: '48px', 
                                            borderRadius: '12px', 
                                            backgroundImage: `url(${car.photo})`, 
                                            backgroundSize: 'cover', 
                                            backgroundPosition: 'center',
                                            marginBottom: '0.5rem'
                                        }} />
                                    ) : (
                                        <CardIcon>
                                            <DirectionsCarIcon sx={{ fontSize: 26 }} />
                                        </CardIcon>
                                    )}
                                    <CardTitle>{car.brand} {car.model}</CardTitle>
                                    <CardSubtitle>{car.year} • {car.vin}</CardSubtitle>
                                </Card>
                            ))}
                            <AddCard onClick={() => navigate('/add')}>
                                <AddIcon sx={{ fontSize: 32 }} />
                                <CardSubtitle>Agregar vehículo</CardSubtitle>
                            </AddCard>
                        </CardsGrid>
                    )}
                </>
            )}
        </Container>
    )
}

export default CarsPage