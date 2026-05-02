import { Pie } from 'react-chartjs-2'
import { ChartPieInterface } from '@/interfaces'
import {Container, GridPieChart, TypographyStyled } from './ChartPie.styles'

export const ChartPie: React.FC<ChartPieInterface> = ({ title, data }) => {
    return (
        <Container item xs={12}>
            <TypographyStyled>{title}</TypographyStyled>
            <GridPieChart>
                <Pie data={data} />
            </GridPieChart>
        </Container>
    )
}