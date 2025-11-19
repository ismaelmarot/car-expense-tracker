import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
import { flex } from '../../mixins/setFlex';
import { GeneralColors } from '../../constants/GeneralColors';

export const SettingsContainer = styled(Grid)`
    ${flex('column','center','center')}
`;

export const TitleStyled = styled(Typography)`
    ${flex('column','center','center')}
    width: 100%;
    padding: .3rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: ${GeneralColors.white};
    background-color: ${GeneralColors.black};
`;

export const GridAcordeons = styled(Grid)`
    ${flex('column','center','center')}
    margin-top: 1rem;
    padding: 1rem 1rem 0;
    border-radius: 3px;
    background-color: ${GeneralColors.grey};
`;