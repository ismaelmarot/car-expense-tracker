import React, { useState } from 'react';
import LegalModal from '../LegalModal/LegalModal';
import { getCurrentYear } from '../../functions/getCurrentYear';
import { Container, FooterText, FooterLink, Divider } from './FooterStyles';
import { useLanguage } from '../../contexts/LanguageContext';

const Footer: React.FC = () => {
    const [openLegal, setOpenLegal] = useState(false);
    const { t } = useLanguage();

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
                    {t('createdBy')} ismaelmarot
                </FooterText>
                <Divider>•</Divider>
                <FooterLink onClick={handleOpenLegal}>
                    {t('legalTerms')}
                </FooterLink>
            </Container>

            <LegalModal open={openLegal} onClose={handleCloseLegal} />
        </>
    );
};

export default Footer;
