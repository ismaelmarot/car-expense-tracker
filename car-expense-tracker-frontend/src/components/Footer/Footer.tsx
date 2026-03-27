import React, { useState } from 'react';
import LegalModal from '../LegalModal/LegalModal';
import { getCurrentYear } from '../../functions/getCurrentYear';
import { Container, FooterText, FooterLink, Divider } from './FooterStyles';

const Footer: React.FC = () => {
    const [openLegal, setOpenLegal] = useState(false);

    const handleOpenLegal = () => {
        setOpenLegal(true);
    };

    const handleCloseLegal = () => {
        setOpenLegal(false);
    };

    return (
        <>
            <Container>
                <FooterText>
                    Vehicles Expenses Tracker © {getCurrentYear()}
                </FooterText>
                <Divider>•</Divider>
                <FooterText>
                    Creado por ismaelmarot
                </FooterText>
                <Divider>•</Divider>
                <FooterLink onClick={handleOpenLegal}>
                    Términos Legales
                </FooterLink>
            </Container>

            <LegalModal open={openLegal} onClose={handleCloseLegal} />
        </>
    );
};

export default Footer;
