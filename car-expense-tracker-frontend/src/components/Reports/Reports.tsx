import React, { useState } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useLanguage } from '../../contexts/LanguageContext';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableChartIcon from '@mui/icons-material/TableChart';

const Container = styled(Box)`
  background: white;
  border-radius: 16px;
  padding: 1.25rem;
  margin-bottom: 1rem;
`;

const Title = styled(Typography)`
  font-size: 0.875rem;
  font-weight: 600;
  color: #86868b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
`;

const DateRangeContainer = styled(Box)`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.25rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const DateInput = styled(Box)`
  flex: 1;
`;

const Label = styled(Typography)`
  font-size: 0.75rem;
  font-weight: 500;
  color: #86868b;
  margin-bottom: 0.375rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e5ea;
  border-radius: 12px;
  font-size: 0.9375rem;
  font-family: inherit;
  color: #1d1d1f;
  background: #f5f5f7;
  outline: none;
  transition: all 0.2s ease;
  
  &:focus {
    border-color: #0071e3;
    background: white;
  }
`;

const CategoriesContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
`;

const CategoryChip = styled(Box)<{ selected: boolean }>`
  padding: 0.5rem 0.875rem;
  border-radius: 20px;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.selected ? '#0071e3' : '#f5f5f7'};
  color: ${props => props.selected ? 'white' : '#1d1d1f'};
  
  &:hover {
    background: ${props => props.selected ? '#0077ed' : '#e8e8ed'};
  }
`;

const SelectAllButton = styled(Typography)`
  font-size: 0.75rem;
  color: #0071e3;
  cursor: pointer;
  margin-bottom: 0.75rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const FormatContainer = styled(Box)`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
`;

const FormatOption = styled(Box)<{ selected: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 35px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.selected ? '#0071e3' : '#f5f5f7'};
  color: ${props => props.selected ? 'white' : '#1d1d1f'};
  
  &:hover {
    background: ${props => props.selected ? '#0077ed' : '#e8e8ed'};
  }
`;

const DownloadButton = styled(Button)`
  width: 100%;
  padding: 0.875rem !important;
  border-radius: 35px !important;
  background: #0071e3 !important;
  text-transform: none !important;
  font-weight: 500 !important;
  font-size: 0.9375rem !important;
  
  &:hover {
    background: #0077ed !important;
  }
  
  &:disabled {
    background: #e5e5ea !important;
    color: #aeaeb2 !important;
  }
`;

const categories = [
  { key: 'accesorios', label: { es: 'Accesorios', en: 'Accessories' } },
  { key: 'chapa_pintura', label: { es: 'Chapa y pintura', en: 'Body & paint' } },
  { key: 'combustible', label: { es: 'Combustible', en: 'Fuel' } },
  { key: 'electricidad', label: { es: 'Electricidad', en: 'Electricity' } },
  { key: 'estacionamiento', label: { es: 'Estacionamiento', en: 'Parking' } },
  { key: 'extintor', label: { es: 'Extintor', en: 'Extinguisher' } },
  { key: 'grua_asistencia', label: { es: 'Grúa / asistencia', en: 'Towing' } },
  { key: 'lavado', label: { es: 'Lavado', en: 'Washing' } },
  { key: 'mantenimiento', label: { es: 'Mantenimiento', en: 'Maintenance' } },
  { key: 'mejoras_tuning', label: { es: 'Mejoras / tuning', en: 'Improvements' } },
  { key: 'multas', label: { es: 'Multas', en: 'Fines' } },
  { key: 'neumaticos', label: { es: 'Neumáticos', en: 'Tires' } },
  { key: 'patente', label: { es: 'Patente', en: 'Registration' } },
  { key: 'peajes', label: { es: 'Peajes', en: 'Tolls' } },
  { key: 'reparacion', label: { es: 'Reparación', en: 'Repairs' } },
  { key: 'reparaciones_mecanicas', label: { es: 'Reparaciones mecánicas', en: 'Mechanical repairs' } },
  { key: 'repuestos', label: { es: 'Repuestos', en: 'Parts' } },
  { key: 'seguro', label: { es: 'Seguro', en: 'Insurance' } },
  { key: 'service', label: { es: 'Service', en: 'Service' } },
  { key: 'vtv_itv', label: { es: 'VTV / ITV', en: 'Inspection' } },
  { key: 'otros', label: { es: 'Otros', en: 'Other' } },
];

const Reports: React.FC = () => {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [format, setFormat] = useState<'pdf' | 'csv'>('pdf');
  const [loading, setLoading] = useState(false);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const selectAllCategories = () => {
    setSelectedCategories(categories.map(c => c.key));
  };

  const clearAllCategories = () => {
    setSelectedCategories([]);
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        carId: id || '',
        dateFrom: dateFrom || '',
        dateTo: dateTo || '',
        categories: selectedCategories.join(','),
        language: language
      });

      const endpoint = format === 'pdf' ? '/reports/pdf' : '/reports/csv';
      const response = await fetch(`http://localhost:5001${endpoint}?${params}`);
      
      if (!response.ok) throw new Error('Error generating report');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report_${dateFrom}_${dateTo}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading report:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>{t('generateReport')}</Title>
      
      <DateRangeContainer>
        <DateInput>
          <Label>{t('from')}</Label>
          <Input 
            type="date" 
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </DateInput>
        <DateInput>
          <Label>{t('to')}</Label>
          <Input 
            type="date" 
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </DateInput>
      </DateRangeContainer>
      
      <Label style={{ marginBottom: '0.5rem' }}>{t('categories')}</Label>
      <SelectAllButton onClick={selectedCategories.length === categories.length ? clearAllCategories : selectAllCategories}>
        {selectedCategories.length === categories.length ? t('deselectAll') : t('selectAll')}
      </SelectAllButton>
      <CategoriesContainer>
        {categories.map(cat => (
          <CategoryChip 
            key={cat.key}
            selected={selectedCategories.includes(cat.key)}
            onClick={() => toggleCategory(cat.key)}
          >
            {cat.label[language]}
          </CategoryChip>
        ))}
      </CategoriesContainer>
      
      <Label style={{ marginBottom: '0.5rem' }}>{t('format')}</Label>
      <FormatContainer>
        <FormatOption 
          selected={format === 'pdf'} 
          onClick={() => setFormat('pdf')}
        >
          <PictureAsPdfIcon sx={{ fontSize: 20 }} />
          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>PDF</Typography>
        </FormatOption>
        <FormatOption 
          selected={format === 'csv'} 
          onClick={() => setFormat('csv')}
        >
          <TableChartIcon sx={{ fontSize: 20 }} />
          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>Excel (CSV)</Typography>
        </FormatOption>
      </FormatContainer>
      
      <DownloadButton 
        variant="contained" 
        onClick={handleDownload}
        disabled={loading || (!dateFrom && !dateTo)}
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <DownloadIcon />}
      >
        {loading ? t('generating') : t('download')}
      </DownloadButton>
    </Container>
  );
};

export default Reports;
