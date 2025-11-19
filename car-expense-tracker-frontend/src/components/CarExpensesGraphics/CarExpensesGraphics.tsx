import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { useParams } from 'react-router-dom';
import { getCarExpenses } from '../../api/api';
import { Container, ContainerGraphics, TitleStyled } from './CarExpensesGraphicsStyles';
import { barChartColors } from '../../constants/BarChartColors';
import { pieChartColors } from '../../constants/PieChartColors';
import ChartPie from '../ChartPie/ChartPie';
import ChartBar from '../ChartBar/ChartBar';
import { categoriesExpenses } from '../../constants/CategoriesExpenses';
import { formatCategory } from '../../functions/FormatCategory';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const CarExpensesGraphics: React.FC = () => {
    const { id } = useParams();
    const [expenses, setExpenses] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const data = await getCarExpenses(Number(id));
                const sortedData = data.sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) => {
                    const dateA = new Date(a.date).getTime();
                    const dateB = new Date(b.date).getTime();
                    return dateB - dateA;
                });
                setExpenses(sortedData);
                setLoading(false);
            } catch (err) {
                setError("Hubo un error al cargar los gastos.");
                setLoading(false);
            }
        };

        fetchExpenses();
    }, [id]);

    const generateBarChartData = (expenses: any[]) => {
        const years = Array.from(new Set(expenses.map(exp => new Date(exp.date).getFullYear())));

        const data = years.map((year, index) => {
            const expensesByYear = categoriesExpenses.map(category => {
                return expenses
                    .filter(exp => new Date(exp.date).getFullYear() === year && exp.category === category)
                    .reduce((sum, exp) => sum + exp.price, 0);
            });

            return {
                year,
                expensesByYear
            };
        });

        return {
            labels: categoriesExpenses.map(category => formatCategory(category)),
            datasets: data.map((yearData, index) => ({
                label: yearData.year.toString(),
                data: yearData.expensesByYear,
                backgroundColor: barChartColors[index % barChartColors.length],
                borderColor: barChartColors[index % barChartColors.length].replace('0.2', '1'),
                borderWidth: 1
            }))
        };
    };

    const generatePieChartData = (expenses: any[]) => {
        const totalExpensesByCategory = categoriesExpenses.map(category => {
            return expenses
                .filter(exp => exp.category === category)
                .reduce((sum, exp) => sum + exp.price, 0);
        });

        return {
            labels: categoriesExpenses.map(category => formatCategory(category)),
            datasets: [
                {
                    data: totalExpensesByCategory,
                    backgroundColor: pieChartColors,
                    borderColor: pieChartColors.map(color => color.replace('0.6', '1')),
                    borderWidth: 1
                }
            ]
        };
    };

    const barChartData = generateBarChartData(expenses);
    const pieChartData = generatePieChartData(expenses);

    if (loading) return <Typography variant='h6'>Cargando gráficos...</Typography>;
    if (error) return <Typography variant='h6' color="error">{error}</Typography>;

    return (
        <Container>
            <TitleStyled>
                Estad&iacute;sticas
            </TitleStyled>
            <ContainerGraphics container>
                <Grid item xs={12} xl={6}>
                    <ChartBar title="Gastos por año" data={barChartData} />            
                </Grid>
                <Grid item xs={12} xl={6}>
                    <ChartPie title="Total por categor&iacute;a" data={pieChartData} />
                </Grid>
            </ContainerGraphics>
        </Container>
    );
};

export default CarExpensesGraphics;
