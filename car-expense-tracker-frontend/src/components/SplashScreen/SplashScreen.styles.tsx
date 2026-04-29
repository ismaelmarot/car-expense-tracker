import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'

export const Container = styled(Box)`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #1976d2;
    color: white;
    padding: 1.5rem;
    text-align: center;
`

export const Title = styled(Typography)`
    margin-bottom: 1.5rem;
    font-weight: bold;

    @media (max-width: 600px) {
        font-size: 1.5rem;
    }

    @media (min-width: 600px) {
        font-size: 2rem;
    }

    @media (min-width: 900px) {
        font-size: 2.5rem;
    }
`