import React, { useState } from 'react'
import { Typography, CircularProgress, Input } from '@mui/material'
import { useLanguage } from '../../contexts/LanguageContext'
import { useParams } from 'react-router-dom'
import DownloadIcon from '@mui/icons-material/Download'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import TableChartIcon from '@mui/icons-material/TableChart'
import { CATEGORIES } from '@/constants'
import {
  CategoriesContainer,
  CategoryChip,
  Container,
  DateInput,
  DateRangeContainer,
  DownloadButton,
  FormatContainer,
  FormatOption,
  Label,
  SelectAllButton,
  Title
} from './Reports.styles'

export const Reports: React.FC = () => {
  const { id } = useParams()
  const { language, t } = useLanguage()
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [format, setFormat] = useState<'pdf' | 'csv'>('pdf')
  const [loading, setLoading] = useState(false)

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const selectAllCategories = () => {
    setSelectedCategories(CATEGORIES.map(c => c.key));
  }

  const clearAllCategories = () => {
    setSelectedCategories([])
  }

  const handleDownload = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        car_id: id || '',
        start_date: dateFrom || '',
        end_date: dateTo || '',
        categories: selectedCategories.join(',')
      })

      const endpoint = format === 'pdf' ? '/reports/pdf' : '/reports/csv'
      const response = await fetch(`http://localhost:5001${endpoint}?${params}`)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('Report generation error:', errorText)
        throw new Error(`Error generating report: ${response.status}`)
      }
      
      const blob = await response.blob()
      if (blob.size === 0) {
        throw new Error('Empty report received')
      }
      
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `report_${dateFrom}_${dateTo}.${format}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading report:', error)
      alert(`Error al descargar el reporte: ${error instanceof Error ? error.message : 'Error desconocido'}`)
    } finally {
      setLoading(false)
    }
  }

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
      <SelectAllButton onClick={selectedCategories.length === CATEGORIES.length ? clearAllCategories : selectAllCategories}>
        {selectedCategories.length === CATEGORIES.length ? t('deselectAll') : t('selectAll')}
      </SelectAllButton>
      <CategoriesContainer>
        {CATEGORIES.map(cat => (
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
        startIcon={loading ? <CircularProgress size={20} color='inherit' /> : <DownloadIcon />}
      >
        {loading ? t('generating') : t('download')}
      </DownloadButton>
    </Container>
  )
}