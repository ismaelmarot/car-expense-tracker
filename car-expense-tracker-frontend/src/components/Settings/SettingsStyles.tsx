import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

export const SettingsContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    max-width: 600px;
    margin: 0 auto;
`;

export const TitleStyled = styled(Typography)`
    font-size: 1.25rem;
    font-weight: 600;
    color: #1d1d1f;
    margin-bottom: 1.5rem;
`;

export const SectionCard = styled(Box)`
    background: white;
    border-radius: 16px;
    padding: 1.25rem;
    margin-bottom: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;

export const SectionTitle = styled(Typography)`
    font-size: 0.875rem;
    font-weight: 600;
    color: #86868b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 1rem;
`;

export const OptionItem = styled(Box)<{ selected?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.875rem 1rem;
    border-radius: 12px;
    background: ${props => props.selected ? '#0071e3' : '#f5f5f7'};
    color: ${props => props.selected ? 'white' : '#1d1d1f'};
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 0.5rem;
    
    &:last-child {
        margin-bottom: 0;
    }
    
    &:hover {
        background: ${props => props.selected ? '#0077ed' : '#e8e8ed'};
    }
`;

export const OptionLabel = styled(Typography)`
    font-size: 0.9375rem;
    font-weight: 500;
`;

export const OptionIcon = styled(Box)`
    font-size: 1.25rem;
`;