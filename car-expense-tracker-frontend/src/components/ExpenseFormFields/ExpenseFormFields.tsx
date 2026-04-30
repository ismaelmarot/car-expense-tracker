import React from 'react'
import { MenuItem, Select } from '@mui/material'
import { useLanguage } from '@/contexts'
import { ExpenseFormFieldsProps } from '@/interfaces'
import {
    TextFieldStyled,
    FormControlStyled,
    InputLabelStyled,
} from './ExpenseFormFields.styles'

export const ExpenseFormFields: React.FC<ExpenseFormFieldsProps> = ({
    expense,
    priceDisplay,
    kmDisplay,
    onChange,
    handlePriceChange,
    handleKmChange,
}) => {
    const { t } = useLanguage()

    return (
        <>
            {/* DESCRIPTION */}
            <TextFieldStyled
                label={t('description')}
                value={expense.description}
                onChange={(e) =>
                    onChange('description', e.target.value)
                }
            />

            {/* PRICE */}
            <TextFieldStyled
                label={t('price')}
                value={priceDisplay}
                onChange={(e) =>
                    handlePriceChange(e.target.value)
                }
                placeholder="0,00"
            />

            {/* KILOMETERS */}
            <TextFieldStyled
                label="Kilómetros"
                value={kmDisplay}
                onChange={(e) =>
                    handleKmChange(e.target.value)
                }
                placeholder="0"
            />

            {/* CATEGORY */}
            <FormControlStyled>
                <InputLabelStyled>{t('category')}</InputLabelStyled>
                <Select
                    value={expense.category}
                    onChange={(e) =>
                        onChange('category', e.target.value)
                    }
                >
                    <MenuItem value="accesorios">{t('catAccessories')}</MenuItem>
                    <MenuItem value="chapa_pintura">{t('catBodyPaint')}</MenuItem>
                    <MenuItem value="combustible">{t('catFuel')}</MenuItem>
                    <MenuItem value="electricidad">{t('catElectricity')}</MenuItem>
                    <MenuItem value="estacionamiento">{t('catParking')}</MenuItem>
                    <MenuItem value="extintor">{t('catExtinguisher')}</MenuItem>
                    <MenuItem value="grua_asistencia">{t('catTowing')}</MenuItem>
                    <MenuItem value="lavado">{t('catWashing')}</MenuItem>
                    <MenuItem value="mantenimiento">{t('catMaintenance')}</MenuItem>
                    <MenuItem value="mejoras_tuning">{t('catImprovements')}</MenuItem>
                    <MenuItem value="multas">{t('catFines')}</MenuItem>
                    <MenuItem value="neumaticos">{t('catTires')}</MenuItem>
                    <MenuItem value="patente">{t('catRegistration')}</MenuItem>
                    <MenuItem value="peajes">{t('catTolls')}</MenuItem>
                    <MenuItem value="reparacion">{t('catRepairs')}</MenuItem>
                    <MenuItem value="reparaciones_mecanicas">{t('catMechanicalRepairs')}</MenuItem>
                    <MenuItem value="repuestos">{t('catParts')}</MenuItem>
                    <MenuItem value="seguro">{t('catInsurance')}</MenuItem>
                    <MenuItem value="service">{t('catService')}</MenuItem>
                    <MenuItem value="vtv_itv">{t('catInspection')}</MenuItem>
                    <MenuItem value="otros">{t('catOther')}</MenuItem>
                </Select>
            </FormControlStyled>

            {/* DATE */}
            <TextFieldStyled
                label={t('date')}
                type='date'
                value={expense.date}
                onChange={(e) =>
                    onChange('date', e.target.value)
                }
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </>
    )
}