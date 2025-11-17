import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';

export const TitleStyled = styled(Typography)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .3rem;
    font-size: 1.5rem;
    font-weight: bold;
    border-radius: 3px;
    color: rgba(36,99,235,1);
    background-color: rgba(166,201,238,1);
`;

export const GridAcordeons = styled(Grid)`
    margin-top: 1rem;
    padding: 1rem 1rem 0;
    border: 3px solid rgba(228,232,236,1);
    border-radius: 3px;
    background-color:rgb(228,232,236);
`;