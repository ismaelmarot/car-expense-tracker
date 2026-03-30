import { CarInterface } from '@/interfaces'
import { GeneralContainer, Container, GridItem } from './CarTagStyles'

export const CarTag: React.FC<CarInterface> = ({ brand, model, version, year, vin }) => {
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