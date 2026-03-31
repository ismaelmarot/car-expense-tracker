import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'

export const AlertsContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
`

export const AlertCard = styled(Box)<{ expired: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: ${props => props.expired ? '#fff5f5' : '#f5f5f7'};
    border-radius: 12px;
    border-left: 3px solid ${props => props.expired ? '#ff6b6b' : '#0071e3'};
`

export const AlertIcon = styled(Typography)`
    font-size: 1.25rem;
`

export const AlertInfo = styled(Box)`
    flex: 1;
`

export const AlertTitle = styled(Typography)`
    font-size: 0.75rem;
    font-weight: 600;
    color: #1d1d1f;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`

export const AlertDate = styled(Typography)`
    font-size: 0.875rem;
    color: #1d1d1f;
`

export const AlertRemaining = styled(Typography)<{ expired: boolean }>`
    font-size: 0.75rem;
    color: ${props => props.expired ? '#ff6b6b' : '#86868b'};
`
