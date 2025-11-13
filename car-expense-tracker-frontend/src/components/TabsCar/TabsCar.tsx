import { Box, Tabs, Tab, Typography } from '@mui/material';
import React, { useState } from 'react';
import AddExpense from '../AddExpense/AddExpense';
import CarExpenses from '../CarExpenses/CarExpenses';
import CarExpensesGraphics from '../CarExpensesGraphics/CarExpensesGraphics';
import Settings from '../Settings/Settings';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import { BoxRenderContent, BoxStyled } from './TabsCarStyles';

const TabsCar: React.FC = () => {
    const [tabIndex, setTabIndex] = useState(0);
    
    const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
        setTabIndex(newIndex);
    };

    const renderTabContent = () => {
        switch (tabIndex) {
            case 0:
                return <AddExpense />;
            case 1:
                return <CarExpenses />;
            case 2:
                return <CarExpensesGraphics />;
            case 3:
                return <Settings />;
            default:
                return <Typography>No hay contenido para mostrar para esta pestaña.</Typography>
        }
    }

    return (
        <BoxStyled>
            <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                indicatorColor='primary'
                textColor='primary'
                variant='fullWidth'
                centered
            >
                    <Tab label="Agregar Gasto" icon={<AddCircleOutlineIcon />}></Tab>
                    <Tab label="Historial" icon={<HistoryIcon />}></Tab>
                    <Tab label="Gráfica" icon={<BarChartIcon/> }></Tab>
                    <Tab label="Ajustes" icon={<SettingsIcon />}></Tab>
            </Tabs>
            <BoxRenderContent>
                {renderTabContent()}
            </BoxRenderContent>
        </BoxStyled>
    )
};

export default TabsCar;