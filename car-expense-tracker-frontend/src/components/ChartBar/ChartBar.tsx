import { ChartBartInterfaces } from '@/interfaces'
import {
    Container,
    GridBar,
    BarStyled,
    TypographyStyled
} from './ChartBarStyles'

export const ChartBar: React.FC<ChartBartInterfaces> = ({ title, data }) => {
    return (
        <Container>
            <TypographyStyled>{title}</TypographyStyled>
            <GridBar>
                <BarStyled data={data} />
            </GridBar>
        </Container>
    )
}