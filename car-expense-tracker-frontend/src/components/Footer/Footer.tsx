import React, { useState } from 'react';
import LegalModal from '../LegalModal/LegalModal';
import { getCurrentYear } from '../../functions/getCurrentYear';
import { Container, Item, LinkStyled } from './FooterStyles';

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

            <Container container>
                <Item item>Vehicles Expenses Tracker - © {getCurrentYear()}</Item>
                <Item item> | </Item>
                <Item item>Creado por ismaelmarot</Item>
                <Item item> | </Item>
                <LinkStyled onClick={handleOpenLegal}>
                    T&eacute;rminos Legales
                </LinkStyled>
            </Container>

            <LegalModal open={openLegal} onClose={handleCloseLegal} />
        </>
    );
};

export default Footer;