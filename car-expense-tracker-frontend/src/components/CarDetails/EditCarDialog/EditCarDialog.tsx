import React from 'react'
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import EditIcon from '@mui/icons-material/Edit'
import { useLanguage } from '../../../contexts/LanguageContext'
import { useCarDates } from '../hooks/useCarDates'
import { 
    Form, 
    FormRow, 
    InputGroup, 
    InputLabel, 
    Input, 
    PhotoContainer, 
    PhotoPreview, 
    PhotoOverlay,
    EditIcon as EditIconStyled
} from './EditCarDialog.styles'

interface EditCarDialogProps {
    open: boolean
    editData: any
    onChange: (field: string, value: string) => void
    onSave: () => void
    onClose: () => void
    onPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const EditCarDialog: React.FC<EditCarDialogProps> = ({
    open,
    editData,
    onChange,
    onSave,
    onClose,
    onPhotoChange
}) => {
    const { t } = useLanguage()
    const { formatKm } = useCarDates()
    
    const handleEditPhotoClick = () => {
        document.getElementById('edit-photo-input')?.click()
    }
    
    const handleKmChange = (field: string, value: string) => {
        const cleanValue = value.replace(/[^\d]/g, '')
        onChange(field, cleanValue)
    }
    
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '16px',
                    padding: '0.5rem'
                }
            }}
        >
            <DialogTitle sx={{ 
                fontWeight: 600, 
                color: '#1d1d1f',
                fontSize: '1.25rem',
                pb: 1
            }}>
                {t('edit')} {t('brand')}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ pt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                    <Box 
                        onClick={handleEditPhotoClick}
                        sx={{ 
                            width: 100, 
                            height: 100, 
                            borderRadius: '20px', 
                            overflow: 'hidden',
                            cursor: 'pointer',
                            background: editData.photo 
                                ? `url(${editData.photo}) center/cover` 
                                : 'linear-gradient(135deg, #f5f5f7 0%, #ececf1 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(0,0,0,0.06)',
                            position: 'relative',
                            '&:hover .edit-overlay': { opacity: 1 }
                        }}
                    >
                        {!editData.photo && (
                            <PhotoCameraIcon sx={{ fontSize: 32, color: '#aeaeb2' }} />
                        )}
                        <Box 
                            className="edit-overlay"
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                background: 'rgba(0,0,0,0.4)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 0,
                                transition: 'opacity 0.2s'
                            }}
                        >
                            <EditIcon sx={{ color: 'white', fontSize: 24 }} />
                        </Box>
                    </Box>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onPhotoChange}
                        style={{ display: 'none' }}
                        id="edit-photo-input"
                    />
                </Box>
                
                <Form>
                    <FormRow>
                        <InputGroup>
                            <InputLabel>{t('brand')}</InputLabel>
                            <Input
                                value={editData.brand}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('brand', e.target.value)}
                                placeholder={t('brand')}
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputLabel>{t('model')}</InputLabel>
                            <Input
                                value={editData.model}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('model', e.target.value)}
                                placeholder={t('model')}
                            />
                        </InputGroup>
                    </FormRow>
                    
                    <FormRow>
                        <InputGroup>
                            <InputLabel>{t('year')}</InputLabel>
                            <Input
                                type="number"
                                value={editData.year}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('year', e.target.value)}
                                placeholder="2020"
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputLabel>{t('version')}</InputLabel>
                            <Input
                                value={editData.version}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('version', e.target.value)}
                                placeholder={t('version')}
                            />
                        </InputGroup>
                    </FormRow>
                    
                    <FormRow>
                        <InputGroup>
                            <InputLabel>{t('vin')}</InputLabel>
                            <Input
                                value={editData.vin}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('vin', e.target.value)}
                                placeholder="VIN"
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputLabel>{t('currentKm')} (km)</InputLabel>
                            <Input
                                value={formatKm(editData.kilometers || '')}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleKmChange('kilometers', e.target.value)}
                                placeholder="45.000"
                            />
                        </InputGroup>
                    </FormRow>
                    
                    <FormRow>
                        <InputGroup>
                            <InputLabel>{t('lastOilChange')} (km)</InputLabel>
                            <Input
                                value={formatKm(editData.last_service_km || '')}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleKmChange('last_service_km', e.target.value)}
                                placeholder="40.000"
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputLabel>{t('serviceInterval')} (km)</InputLabel>
                            <Input
                                type="number"
                                value={editData.service_interval_km}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('service_interval_km', e.target.value)}
                                placeholder="10000"
                            />
                        </InputGroup>
                    </FormRow>
                    
                    <FormRow>
                        <InputGroup>
                            <InputLabel>VTV</InputLabel>
                            <Input
                                type="date"
                                value={editData.vtv_date}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('vtv_date', e.target.value)}
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputLabel>{t('extintor')}</InputLabel>
                            <Input
                                type="date"
                                value={editData.extintor_date}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange('extintor_date', e.target.value)}
                            />
                        </InputGroup>
                    </FormRow>
                </Form>
            </DialogContent>
            <DialogActions sx={{ padding: '1rem 1.5rem' }}>
                <Button 
                    onClick={onClose}
                    sx={{ 
                        color: '#86868b',
                        textTransform: 'none',
                        fontWeight: 500
                    }}
                >
                    {t('cancel')}
                </Button>
                <Button 
                    onClick={onSave}
                    variant="contained"
                    sx={{ 
                        backgroundColor: '#0071e3',
                        textTransform: 'none',
                        fontWeight: 500,
                        borderRadius: '20px',
                        '&:hover': { backgroundColor: '#0077ed' }
                    }}
                >
                    {t('save')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
