import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'

export const Container = styled(Box)`
  padding: 2rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  flex: 1;
  border: 3px solid red;
  
  @media (max-width: 600px) {
    padding: 1.5rem 1rem;
  }
`

export const Header = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 1rem;
    border: 3px dashed red;
`

export const HeaderLeft = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const HeaderRight = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`

export const PageTitle = styled(Typography)`
  font-size: 2.25rem;
  font-weight: 700;
  color: #1d1d1f;
  letter-spacing: -0.025em;
  line-height: 1.1;
  
  @media (max-width: 600px) {
    font-size: 1.625rem;
  }
`

export const PageSubtitle = styled(Typography)`
  font-size: 0.9375rem;
  color: #86868b;
`

export const ActionButton = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  padding: 0 1.25rem;
  background: #0071e3;
  color: white;
  border-radius: 21px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  gap: 0.375rem;
  
  &:hover {
    background: #0077ed;
  }
  
  &:active {
    transform: scale(0.97);
  }
  
  @media (max-width: 480px) {
    height: 38px;
    padding: 0 0.875rem;
    border-radius: 19px;
  }
`

export const BackButton = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  padding: 0 1.25rem;
  background: #f5f5f7;
  color: #1d1d1f;
  border-radius: 21px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  gap: 0.375rem;
  border: 1px solid rgba(0, 0, 0, 0.04);
  
  &:hover {
    background: #e8e8ed;
  }
  
  &:active {
    transform: scale(0.97);
  }
  
  @media (max-width: 480px) {
    height: 38px;
    padding: 0 0.875rem;
    border-radius: 19px;
  }
`

export const PhotoSection = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`

export const PhotoContainer = styled(Box)`
  width: 120px;
  height: 120px;
  border-radius: 24px;
  background: linear-gradient(135deg, #f5f5f7 0%, #ececf1 100%);
  border: 2px dashed #d1d1d6;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  
  &:hover {
    border-color: #0071e3;
    background: linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 100%);
  }
`

export const PhotoPreview = styled(Box)`
  width: 120px;
  height: 120px;
  border-radius: 24px;
  background-size: cover;
  background-position: center;
  position: relative;
  border: 2px solid #d1d1d6;
  cursor: pointer;
  
  &:hover .photo-overlay {
    opacity: 1;
  }
`

export const PhotoOverlay = styled(Box)`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
`

export const PhotoLabel = styled(Typography)`
  font-size: 0.8125rem;
  color: #86868b;
  margin-top: 0.75rem;
  text-align: center;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

export const InputGroup = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const InputLabel = styled(Typography)`
  font-size: 0.875rem;
  font-weight: 500;
  color: #1d1d1f;
`

export const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 1rem;
  font-size: 1rem;
  border: 1px solid #d1d1d6;
  border-radius: 35px;
  outline: none;
  color: #1d1d1f;
  background: #ffffff;
  transition: all 0.2s ease;
  
  &::placeholder {
    color: #86868b;
  }
  
  &:focus {
    border-color: #0071e3;
    box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.15);
  }
  
  &:hover:not(:focus) {
    border-color: #aeaeb2;
  }
`

export const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 1.5rem;
  background: #0071e3;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #0077ed;
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  &:disabled {
    background: #d1d1d6;
    cursor: not-allowed;
  }
`

export const OptionalLabel = styled.span`
  font-size: 0.8125rem;
  color: #86868b;
  font-weight: 400;
  margin-left: 0.25rem;
`

export const HiddenInput = styled.input`
  display: none;
`