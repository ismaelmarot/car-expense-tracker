import React from 'react';
import { Pie } from 'react-chartjs-2';
import {Container, GridPieChart, TypographyStyled } from './ChartPieStyles';
import { ChartPieInterface } from '../../interfaces/ChartPieInterface';

const ChartPie: React.FC<ChartPieInterface> = ({ title, data }) => {
    return (
        <Container item xs={12}>
            <TypographyStyled>{title}</TypographyStyled>
            <GridPieChart>
                <Pie data={data} />
            </GridPieChart>
        </Container>
    );
};

export default ChartPie;
