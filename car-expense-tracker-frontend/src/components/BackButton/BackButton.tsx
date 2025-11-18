import React from 'react';
import { Container, ArrowBackIconStyled, ButtonStyled, TypographyStyled } from './BackButtonStyles';
import { useNavigate } from 'react-router-dom';

const BackButton: React.FC = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate('/');
    };
    return (
        <Container>
            <ButtonStyled onClick={handleGoBack}>
                <ArrowBackIconStyled />
                <TypographyStyled>Volver a los veh&iacute;culos</TypographyStyled>
            </ButtonStyled>
        </Container>
    )
};

export default BackButton;
