import React from 'react';
import { EditExpenseDialogPropsInterface  } from '../../interfaces/EditExpenseDialogPropsInterface';
import { Dialog, DialogTitle, MenuItem, Select, Button } from '@mui/material';
import { ButtonSave, DialogActionsStyled, DialogContentStyled, FormControlStyled, InputLabelStyled, TextFieldStyled, TypographyError } from './EditExpenseDialogStyled';

const EditExpenseDialog: React.FC<EditExpenseDialogPropsInterface> = ({ open, expense, error, onClose, onSave, onChange }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Gasto</DialogTitle>
            <DialogContentStyled>
                {error && (
                    <TypographyError color='error'>
                        {error}
                    </TypographyError>
                )}
                {expense && (
                    <>
                        <TextFieldStyled
                            label="Descripción"
                            value={expense.description}
                            onChange={(e) => onChange('description', e.target.value)}
                        />
                        <TextFieldStyled
                            label="Precio"
                            type='number'
                            value={expense.price}
                            onChange={(e) => onChange('price', parseFloat(e.target.value))}
                        />
                        <TextFieldStyled
                            label="Kilómetros"
                            type='number'
                            value={expense.kilometers}
                            onChange={(e) => onChange('kilometers', parseInt(e.target.value, 10))}
                        />
                        <FormControlStyled>
                            <InputLabelStyled>Categoría</InputLabelStyled>
                            <Select
                                value={expense.category}
                                onChange={(e) => onChange('category', e.target.value)}
                            >
                                <MenuItem value='combustible'>Combustible</MenuItem>
                                <MenuItem value='mantenimiento'>Mantenimiento</MenuItem>
                                <MenuItem value='seguro'>Seguro</MenuItem>
                                <MenuItem value='patente'>Patente</MenuItem>
                                <MenuItem value='reparacion'>Reparación</MenuItem>
                                <MenuItem value='otros'>Otros</MenuItem>
                            </Select>
                        </FormControlStyled>
                        <TextFieldStyled
                            label="Fecha"
                            type='date'
                            value={expense.date}
                            onChange={(e) => onChange('date', e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </>
                )}
                <DialogActionsStyled>
                    <Button onClick={onClose}>Cancelar</Button>
                    <ButtonSave onClick={onSave}>Guardar</ButtonSave>
                </DialogActionsStyled>
            </DialogContentStyled>
        </Dialog>
    );
};

export default EditExpenseDialog;
