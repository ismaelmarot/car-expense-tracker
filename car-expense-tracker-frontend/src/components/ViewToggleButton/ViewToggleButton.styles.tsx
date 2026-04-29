import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import { size } from '@/mixins'

export const ToggleButtonContainer = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    ${size('42px','42px')}
    border-radius: 21px;
    background-color: #f5f5f7;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #86868b;
    border: 1px solid rgba(0, 0, 0, 0.04);
    flex-shrink: 0;
    box-sizing: border-box;

    &:hover {
        background-color: #e8e8ed;
        color: #1d1d1f;
    }

    &:active {
        transform: scale(0.97);
    }

    @media (max-width: 480px) {
        width: 38px;
        height: 38px;
        border-radius: 19px;
    }
`