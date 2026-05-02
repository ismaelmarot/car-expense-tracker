import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import { getCategoryStyle } from '@/constants'

export const TableHeader = styled(Box)`
    display: none;
    padding: 0.5rem 1.25rem;
    background: #ffffff;
    position: sticky;
    top: 0;
    z-index: 5;
      
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 1fr 70px 90px 100px 90px;
        gap: 1.5rem;
    }
`

export const HeaderCell = styled(Box)`
    font-size: 0.6875rem;
    font-weight: 600;
    color: #86868b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    user-select: none;
    transition: color 0.2s ease;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 4px;
    
    &:hover {
        color: #1d1d1f;
    }
    
    &:nth-of-type(1) { justify-content: flex-start; }
    &:nth-of-type(2) { justify-content: center; }
    &:nth-of-type(3) { justify-content: center; }
    &:nth-of-type(4) { justify-content: flex-end; }
    &:nth-of-type(5) { justify-content: flex-end; }
`

export const ExpenseItem = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: #ffffff;
    padding: 0.875rem 1rem;
    border: 1px solid rgba(0, 0, 0, 0.07);
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 35px !important;
    
    &:hover {
        border-color: rgba(0, 0, 0, 0.1);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    }

    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 1fr 70px 90px 100px 90px;
        gap: 1.5rem;
        padding: 0.75rem 1.25rem;
        border-radius: 12px;
        align-items: center;
    }
`

export const ExpenseName = styled(Typography)`
    font-size: 0.9375rem;
    font-weight: 500;
    color: #1d1d1f;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const ExpenseDate = styled(Typography)`
    display: none;
    font-size: 0.8125rem;
    color: #86868b;
    text-align: right;
    white-space: nowrap;

    @media (min-width: 768px) {
        display: block;
    }
`

export const ExpenseKm = styled(Typography)`
    display: none;
    font-size: 0.8125rem;
    color: #86868b;
    text-align: center;
    white-space: nowrap;

    @media (min-width: 768px) {
        display: block;
    }
`

export const ExpenseCategory = styled(Box)`
    display: none;

    @media (min-width: 768px) {
        display: flex;
        justify-content: center;
    }
`

export const ExpensePrice = styled(Typography)`
    display: none;
    font-size: 0.9375rem;
    font-weight: 600;
    color: #1d1d1f;
    text-align: right;
    white-space: nowrap;

    @media (min-width: 768px) {
        display: block;
    }
`

export const MobileDate = styled(Typography)`
    font-size: 0.8125rem;
    color: #86868b;
    text-align: right;
    white-space: nowrap;

    @media (min-width: 768px) {
        display: none;
    }
`

export const CategoryBadge = styled(Box)<{ category: string }>`
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;

    ${({ category }) => {
        const key = category?.toLowerCase()
        const style =  getCategoryStyle(category)
        return `
        background: ${style.light};
        color: ${style.main};
        `
    }}
`

export const SortIndicator = styled.span`
    font-size: 11px;
    opacity: 0.7;
    display: inline-flex;
    align-items: center;
    margin-left: 2px;
`

export const ExpenseList = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
`