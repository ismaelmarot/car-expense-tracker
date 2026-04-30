import React, { useState } from 'react'
import { useLanguage } from '@/contexts'
import { getCurrentYear } from '@/functions'
import { LegalModal } from '@/components'
import {
    Container,
    FooterText,
    FooterLink,
    Divider
} from './Footer.styles'

export const Footer: React.FC = () => {
    const [openLegal, setOpenLegal] = useState(false)
    const { t } = useLanguage()

    const handleOpenLegal = () => {
        setOpenLegal(true)
    }

    const handleCloseLegal = () => {
        setOpenLegal(false)
    }

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
    )
}