import styled from '@emotion/styled'
import { Box } from '@mui/material'

export const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`

export const FormRow = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

export const InputGroup = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const InputLabel = styled.label`
  font-size: 0.8125rem;
  font-weight: 500;
  color: #86868b;
`

export const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 34px;
  font-size: 0.9375rem;
  background: #f5f5f7;
  color: #1d1d1f;
  outline: none;
  transition: all 0.2s ease;
  
  &:focus {
    background: white;
    border-color: #0071e3;
    box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.1);
  }
  
  &::placeholder {
    color: #aeaeb2;
  }
`

export const PhotoContainer = styled(Box)`
  width: 160px;
  height: 160px;
  border-radius: 20px;
  background: linear-gradient(135deg, #f5f5f7 0%, #ececf1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
  border: 2px solid rgba(0, 0, 0, 0.06);
  position: relative;
  
  &:hover {
    border-color: #0071e3;
    background: linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 100%);
  }
  
  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
    border-radius: 14px;
  }
`

export const PhotoPreview = styled(Box)`
  width: 160px;
  height: 160px;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  position: relative;
  border: 2px solid rgba(0, 0, 0, 0.06);
  cursor: pointer;
  overflow: hidden;
  
  &:hover .photo-overlay {
    opacity: 1;
  }
  
  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
    border-radius: 14px;
  }
`

export const PhotoOverlay = styled(Box)`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  
  @media (max-width: 600px) {
    border-radius: 14px;
  }
`

export const EditIcon = styled(Box)`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  color: #1d1d1f;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  z-index: 2;
  
  &:hover {
    transform: scale(1.1);
    background: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 600px) {
    width: 26px;
    height: 26px;
    bottom: 4px;
    right: 4px;
  }
`
