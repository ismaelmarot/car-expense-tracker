import styled from '@emotion/styled';
import { Grid, Box, Button } from '@mui/material';
import { flex } from '../../mixins/setFlex';
import { GeneralColors } from '../../constants/GeneralColors';

export const BoxStyled = styled(Box)`
    ${flex('column', 'center', 'center')}
    height: 100vh;
`;

export const GridCarDetails = styled(Grid)`
    ${flex('row', 'center', 'center')}
    margin: 0 .5rem;
    background-color: ${GeneralColors.grey};
`;

export const GridDeleteCarIcon = styled(Grid)`
    ${flex('row', 'center', 'flex-end')}
    width: 100%;
    padding: 0 .5rem 0 1rem;
`;

export const ButtonDeleteCar = styled(Button)`
    background-color: ${GeneralColors.red};
`;
