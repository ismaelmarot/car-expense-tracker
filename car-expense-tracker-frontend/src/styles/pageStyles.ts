import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'

export const pageMaxWidth = '1200px'

export const PageContainer = styled(Box)`
  padding: 2rem 1.5rem;
  max-width: ${pageMaxWidth};
  margin: 0 auto;
  width: 100%;
  
  @media (max-width: 600px) {
    padding: 1.5rem 1rem;
  }
`

export const PageHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 1rem;
`

export const HeaderLeft = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
`

export const HeaderRight = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.625rem;
  flex-shrink: 0;
`

export const PageTitle = styled(Typography)`
  font-size: 2.25rem;
  font-weight: 700;
  color: #1d1d1f;
  letter-spacing: -0.025em;
  line-height: 1.1;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  
  @media (max-width: 600px) {
    font-size: 1.625rem;
  }
`

export const PageSubtitle = styled(Typography)`
  font-size: 0.9375rem;
  color: #86868b;
  font-weight: 400;
  line-height: 1.2;
  margin-top: 0.25rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  min-height: 1.2em;
`

export const PrimaryButton = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  min-width: 42px;
  padding: 0 1.25rem;
  background: #0071e3;
  color: white;
  border-radius: 21px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  gap: 0.375rem;
  box-sizing: border-box;
  
  @media (max-width: 480px) {
    height: 38px;
    min-width: 38px;
    padding: 0 0.875rem;
    border-radius: 19px;
  }
  
  &:hover {
    background: #0077ed;
  }
  
  &:active {
    transform: scale(0.97);
  }
`

export const IconButton = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background: #f5f5f7;
  color: #86868b;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  border: 1px solid rgba(0, 0, 0, 0.04);
  
  @media (max-width: 480px) {
    width: 38px;
    height: 38px;
    border-radius: 19px;
  }
  
  &:hover {
    background: #e8e8ed;
    color: #1d1d1f;
  }
  
  &:active {
    transform: scale(0.97);
  }
`

export const FormContainer = styled(Box)`
  max-width: 400px;
  margin: 0 auto;
  padding: 0 1rem;
`

export const FormCard = styled(Box)`
  background: transparent;
  padding: 0;
  border: none;
  box-shadow: none;
`

export const FormTitle = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1d1d1f;
  text-align: center;
  margin-bottom: 2rem;
  letter-spacing: -0.01em;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

export const InputWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const OptionalLabel = styled(Typography)`
  font-size: 0.8125rem;
  color: #86868b;
  font-weight: 400;
  margin-left: 0.25rem;
`

export const InputHint = styled(Typography)`
  font-size: 0.75rem;
  color: #86868b;
`

export const Label = styled(Typography)`
  font-size: 0.875rem;
  font-weight: 500;
  color: #1d1d1f;
`

export const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 1rem;
  font-size: 1rem;
  color: #1d1d1f;
  background: #ffffff;
  border: 1px solid #d1d1d6;
  border-radius: 12px;
  outline: none;
  transition: all 0.2s ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  
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

export const ImageUpload = styled(Box)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #f5f5f7 0%, #ececf1 100%);
  border: 2px dashed #d1d1d6;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  
  &:hover {
    border-color: #0071e3;
    background: linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 100%);
  }
`

export const ImagePreview = styled(Box)`
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  cursor: pointer;
  position: relative;
  
  &:hover .image-overlay {
    opacity: 1;
  }
`

export const ImageOverlay = styled(Box)`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: all 0.2s ease;
  border-radius: 20px;
`

export const ChangeImageButton = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: white;
  border-radius: 20px;
  color: #1d1d1f;
  font-size: 0.875rem;
  font-weight: 500;
`

export const UploadPlaceholder = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem;
`

export const UploadIconCircle = styled(Box)`
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #0071e3 0%, #00a0f0 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(0, 113, 227, 0.3);
`

export const UploadTitle = styled(Typography)`
  font-size: 1rem;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 0.375rem;
`

export const UploadSubtitle = styled(Typography)`
  font-size: 0.8125rem;
  color: #86868b;
`

export const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 44px;
  margin-top: 1.5rem;
  background: #0071e3;
  color: white;
  border: none;
  border-radius: 22px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #0077ed;
  }
  
  &:active {
    transform: scale(0.98);
    background: #0064c9;
  }
  
  &:disabled {
    background: #d1d1d6;
    color: #ffffff;
    cursor: not-allowed;
  }
`

export const CancelButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 44px;
  background: transparent;
  color: #0071e3;
  border: none;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.75rem;
  
  &:hover {
    background: rgba(0, 113, 227, 0.08);
    border-radius: 22px;
  }
`

export const InputRow = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`

export const CardsGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

export const CardStyled = styled(Box)`
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #0071e3 0%, #00c7be 100%);
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    border-color: rgba(0, 113, 227, 0.2);
    
    &::before {
      opacity: 1;
    }
  }
  
  &:active {
    transform: scale(0.99);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  }
`

export const AddCardStyled = styled(Box)`
  background: #fafbfc;
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1.5px dashed #d1d1d6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #86868b;
  min-height: 180px;
  
  &:hover {
    border-color: #0071e3;
    color: #0071e3;
    background: linear-gradient(135deg, #f0f7ff 0%, #e8f5fe 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 113, 227, 0.1);
  }
  
  &:active {
    transform: scale(0.98);
  }
`

export const EmptyState = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  color: #86868b;
  text-align: center;
`

export const ListContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`

export const ListAddItem = styled(Box)`
  background: #fafbfc;
  border-radius: 14px;
  padding: 1rem 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1.5px dashed #d1d1d6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #86868b;
  font-size: 0.9375rem;
  font-weight: 500;
  
  &:hover {
    border-color: #0071e3;
    color: #0071e3;
    background: #f0f7ff;
  }
  
  &:active {
    transform: scale(0.99);
  }
`