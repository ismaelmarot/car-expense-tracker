import React from 'react'
import HistoryIcon from '@mui/icons-material/History'
import BarChartIcon from '@mui/icons-material/BarChart'
import DescriptionIcon from '@mui/icons-material/Description'
import { useLanguage } from '../../../contexts/LanguageContext'
import { 
    TabsContainer, 
    TabButton, 
    TabLabel 
} from './CarTabs.styles'

interface CarTabsProps {
    activeTab: string
    onTabChange: (tab: string) => void
}

export const CarTabs: React.FC<CarTabsProps> = ({ activeTab, onTabChange }) => {
    const { t } = useLanguage()
    
    const tabs = [
        { id: 'historial', icon: <HistoryIcon sx={{ fontSize: 18 }} />, label: t('history') },
        { id: 'grafica', icon: <BarChartIcon sx={{ fontSize: 18 }} />, label: t('statistics') },
        { id: 'reportes', icon: <DescriptionIcon sx={{ fontSize: 18 }} />, label: t('settingsTab') }
    ]
    
    return (
        <TabsContainer>
            {tabs.map((tab) => (
                <TabButton 
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    active={activeTab === tab.id}
                >
                    {tab.icon}
                    <TabLabel>{tab.label}</TabLabel>
                </TabButton>
            ))}
        </TabsContainer>
    )
}
