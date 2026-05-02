import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { Grid, Button, Typography } from '@mui/material'
import { GeneralColors, Icons } from '@/constants'
import { flex, size } from '@/mixins'

export const Container = styled(Grid)`
    ${flex('row', 'center', 'flex-start')}
    width: 100%;
    height: 3rem;
    margin: 0 .5rem .5rem;
`

export const LinkStyled = styled(Link)`
    text-decoration: none;
`

export const ArrowBackIconStyled = styled(Icons.ArrowBack)`
    font-size: 1.5rem;
    margin: 0 .4rem;
    color: ${GeneralColors.white};
`

export const ButtonStyled = styled(Button)`
    ${flex('row', 'center', 'center')}
    ${size('auto', '3rem')}
    background-color: ${GeneralColors.blue};
`

export const TypographyStyled = styled(Typography)`
    margin-right: 1.5rem;
    font-size: 1rem;
    color: ${GeneralColors.white};
`