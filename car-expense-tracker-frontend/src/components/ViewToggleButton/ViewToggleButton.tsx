import React from 'react'
import { GridViewIcon, ListViewIcon } from '@/constants'
import { ViewToggleButtonProps } from '@/interfaces'
import { ToggleButtonContainer } from './ViewToggleButton.styles'

export const ViewToggleButton: React.FC<ViewToggleButtonProps> = ({ isGridView, onToggle }) => {
  return (
    <ToggleButtonContainer onClick={onToggle}>
      {isGridView ? <GridViewIcon /> : <ListViewIcon />}
    </ToggleButtonContainer>
  )
}