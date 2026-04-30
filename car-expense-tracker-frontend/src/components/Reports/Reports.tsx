import React from 'react'
import { Typography, CircularProgress, Input } from '@mui/material'
import { useLanguage } from '@/contexts'
import { CATEGORIES, Icons } from '@/constants'
import { useReports } from './useReports'

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
  const { t, language } = useLanguage()

  const {
    dateFrom,
    dateTo,
    setDateFrom,
    setDateTo,
    selectedCategories,
    toggleCategory,
    selectAllCategories,
    clearAllCategories,
    format,
    setFormat,
    loading,
    handleDownload
  } = useReports()

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

      <SelectAllButton
        onClick={
          selectedCategories.length === CATEGORIES.length
            ? clearAllCategories
            : selectAllCategories
        }
      >
        {selectedCategories.length === CATEGORIES.length
          ? t('deselectAll')
          : t('selectAll')}
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
          <Icons.Pdf sx={{ fontSize: 20 }} />
          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
            PDF
          </Typography>
        </FormatOption>

        <FormatOption
          selected={format === 'csv'}
          onClick={() => setFormat('csv')}
        >
          <Icons.Csv sx={{ fontSize: 20 }} />
          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
            Excel (CSV)
          </Typography>
        </FormatOption>
      </FormatContainer>

      <DownloadButton
        variant="contained"
        onClick={handleDownload}
        disabled={loading || (!dateFrom && !dateTo)}
        startIcon={
          loading
            ? <CircularProgress size={20} color='inherit' />
            : <Icons.Download sx={{ fontSize: 20 }} />
        }
      >
        {loading ? t('generating') : t('download')}
      </DownloadButton>
    </Container>
  )
}