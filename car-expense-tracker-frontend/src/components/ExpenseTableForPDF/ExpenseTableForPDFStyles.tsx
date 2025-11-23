import styled from '@emotion/styled';
import { Table, TableCell } from '@mui/material';
import { GeneralColors } from '../../constants/GeneralColors';

export const TableStyled = styled(Table)`
    width: 100%;
`;

export const ThStyled = styled(TableCell)`
    padding: 8px;
    text-align: center;
    border: 1px solid ${GeneralColors.grey};
`;

export const TdStyled = styled.td`
    padding: 8px;
    border: 1px solid ${GeneralColors.grey};
`;

export const TdStyledRight = styled(TdStyled)`
    text-align: right;
`;