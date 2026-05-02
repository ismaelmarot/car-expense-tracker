import { ChartBartInterfaces } from '@/interfaces'
import {
    Container,
    GridBar,
    BarStyled,
    TypographyStyled
} from './ChartBar.styles'

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