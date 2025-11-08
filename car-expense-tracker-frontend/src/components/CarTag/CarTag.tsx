import React from 'react';
import { CarInterface } from '../../interfaces/CarInterface';
import { GeneralContainer, Container, GridItem } from './CarTagStyles';

const CarTag: React.FC<CarInterface> = ({ brand, model, version, year, vin }) => {
    return (
        <GeneralContainer>
            <Container container>
                <GridItem>
                    {brand} {model} {version} {year}
                </GridItem>
                <GridItem>
                    {vin}
                </GridItem>
            </Container>
        </GeneralContainer>
    )
}

export default CarTag;
