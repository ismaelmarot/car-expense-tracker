import React from 'react'
import { useBackButton } from './useBackButton'
import {
    Container,
    ArrowBackIconStyled,
    ButtonStyled,
    TypographyStyled
} from './BackButtonStyles'

export const BackButton: React.FC = () => {
    const { goBack } = useBackButton();

    return (
        <Container>
            <ButtonStyled onClick={goBack}>
                <ArrowBackIconStyled />
                <TypographyStyled>
                    Volver a los vehículos
                </TypographyStyled>
            </ButtonStyled>
        </Container>
    )
}