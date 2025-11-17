import React from 'react';
import { ChartBartInterfaces } from '../../interfaces/ChartBarInterface';
import { Container, GridBar, BarStyled, TypographyStyled } from './ChartBarStyles';

const ChartBar: React.FC<ChartBartInterfaces> = ({ title, data }) => {
    return (
        <Container>
            <TypographyStyled>{title}</TypographyStyled>
            <GridBar>
                <BarStyled data={data} />
            </GridBar>
        </Container>
    );
};

export default ChartBar;
