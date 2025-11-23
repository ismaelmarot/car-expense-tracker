import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { GeneralColors } from '../../constants/GeneralColors'; 

export const ButtonCancel = styled(Button)`
    color: ${GeneralColors.blue};
`;

export const ButtonConfirm = styled(Button)`
    padding: .5rem;
    color: ${GeneralColors.white};
    background-color: ${GeneralColors.red};
`;