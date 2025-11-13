import styled from '@emotion/styled';
import { Grid, Link } from '@mui/material';
import { flex } from '../../helpers/setFlex';
import { GeneralColors } from '../../constants/GeneralColors';

export const Container = styled.div`
    ${flex('row', 'center', 'center')}
    color: ${GeneralColors.white};
    background-color: ${GeneralColors.AppData};
    width: 100%;
`;

export const Item = styled(Grid)`
    padding: .3rem .5rem;
`;

export const LinkStyled = styled(Link)`
    ${flex('row', 'center', 'center')}
    text-decoration: none;
    cursor: pointer;
    color: ${GeneralColors.white};
`;