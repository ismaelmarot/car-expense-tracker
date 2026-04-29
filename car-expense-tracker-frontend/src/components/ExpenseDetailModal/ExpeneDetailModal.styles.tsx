import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'

export const PopupOverlay = styled(Box)`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1.5rem;
`

export const PopupCard = styled(Box)`
    background: #ffffff;
    border-radius: 20px;
    width: 100%;
    max-width: 340px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    position: relative;
`

export const PopupHeader = styled(Box)`
    background: linear-gradient(135deg, #1d1d1f 0%, #2c2c2e 100%);
    padding: 1.5rem;
    text-align: center;
`

export const PopupTitle = styled(Typography)`
    font-size: 1.125rem;
    font-weight: 600;
    color: #ffffff;
    text-align: center;
    word-break: break-word;
`

export const PopupContent = styled(Box)`
    padding: 1.5rem;
`

export const PopupActions = styled(Box)`
    display: flex;
    gap: 0.75rem;
    padding: 1rem 1.5rem 1.5rem;
`

export const PopupButton = styled(Box)<{ variant?: 'edit' | 'delete' }>`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 12px 16px;
    border-radius: 35px;
    font-size: 0.9375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    
    ${props => props.variant === 'edit' ? `
        background: #0071e3;
        color: #ffffff;
        &:hover { background: #0077ed; }
    ` : `
        background: #fff0f0;
        color: #ff3b30;
        &:hover { background: #ffe4e4; }
    `}
`

export const CloseButton = styled(Box)`
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 28px;
    height: 28px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
    &:hover {
        background: rgba(255, 255, 255, 0.3);
    }
`

export const PopupPriceSection = styled(Box)`
    text-align: center;
    padding: 1rem;
    background: #f5f5f7;
    border-radius: 14px;
    margin-bottom: 1rem;
`

export const PriceLabel = styled(Typography)`
    font-size: 0.75rem;
    color: #86868b;
    margin-bottom: 0.25rem;
`

export const PriceValue = styled(Typography)`
    font-size: 1.25rem;
    font-weight: 700;
    color: #1d1d1f;
`

export const PhotosSection = styled(Box)`
    display: flex;
    gap: 0.625rem;
    margin-top: 1rem;
    flex-wrap: wrap;
`

export const PhotoThumb = styled(Box)<{ src: string }>`
    width: 80px;
    height: 80px;
    border-radius: 14px;
    background-image: url(${props => props.src});
    background-size: cover;
    background-position: center;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    
    &:hover {
        transform: scale(1.04);
        box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    }
    
    &:active {
        transform: scale(0.98);
    }
`

export const PhotosLabel = styled(Typography)`
    font-size: 0.8125rem;
    color: #86868b;
    font-weight: 500;
    margin-bottom: 0.5rem;
`