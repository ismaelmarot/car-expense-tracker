import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001',
    headers: {
        'Content-Type': 'application/json',
    },
});

type Car = {
    brand: string;
    model: string;
    year: number;
    vin: string;
    version?: string;
};

type Expense = {
    car_id: number;
    description: string;
    price: number;
    kilometers?: number;
    category: string;
    date: string;
};

// Funciones para Autos -----------------------------------------------------------------
export const addCar = (car: Car) => api.post('/cars', car);

export const getCars = () => api.get('/cars');

export const getCarById = (id: number) => api.get(`/cars/${id}`);

export const deleteCar = async (id: number) => {
    try {
        console.log(`Sending DELETE request to: ${api.defaults.baseURL}/cars/${id}`);
        const response = await api.delete(`/cars/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting car with ID ${id}:`, error);
        throw error;
    }
};

// Funciones para Gastos ----------------------------------------------------------------
export const addExpense = async (expense: Expense) => {
    try {
        const response = await api.post('/expenses', expense);
        return response.data;
    } catch (error) {
        console.error('Error adding expense:', error);
        throw error;
    }
};

export const getCarExpenses = async (carId: number) => {
    try {
        const response = await api.get(`/expenses/car/${carId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching expenses for car ${carId}:`, error);
        throw error;
    }
};

export const getExpenseById = async (expenseId: number) => {
    try {
        const response = await api.get(`/expenses/${expenseId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching expense with ID ${expenseId}:`, error);
        throw error;
    }
};

export const updateExpense = async (expenseId: number, updatedExpense: Expense) => {
    try {
        console.log("ID de la expensa a actualizar:", expenseId);
        const response = await api.put(`/expenses/${expenseId}`, updatedExpense);
        console.log("Respuesta del servidor:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el gasto:", error);
        throw new Error('Error al actualizar el gasto');
    }
};

export const deleteExpense = async (id: number) => {
    try {
        const response = await api.delete(`/expenses/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting expense with ID ${id}:`, error);
        throw error;
    }
};

export const downloadBackup = async () => {
    try {
        const response = await fetch(`${api.defaults.baseURL}/api/download-backup`);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'backup.db';
        link.click();
    } catch (error) {
        console.error('Error al descargar el backup:', error);
        alert('Hubo un error al intentar descargar el archivo de respaldo.');
    }
};
