import styled from '@emotion/styled';
import { Grid, Link } from '@mui/material';
import { flex } from '../../helpers/setFlex';

export const Container = styled.div`
    ${flex('row', 'center', 'center')}
    color: rgba(255, 255, 255, 1);
    background-color: rgba(0,0,0,1);
`;

export const Item = styled(Grid)`
    padding: .3rem .5rem;
`;

export const LinkStyled = styled(Link)`
    ${flex('row', 'center', 'center')}
    text-decoration: none;
    cursor: pointer;
    color: rgba(255, 255, 255, 1);
`;