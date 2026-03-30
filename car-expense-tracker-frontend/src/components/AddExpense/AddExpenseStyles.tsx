import styled from '@emotion/styled'
import { Box, Typography, TextField, FormControl } from '@mui/material'

export const Container = styled(Box)`
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
`

export const FormHeader = styled(Box)`
  margin-bottom: 1.5rem;
`

export const FormTitle = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1d1d1f;
  letter-spacing: -0.02em;
  margin-bottom: 0.25rem;
`

export const FormSubtitle = styled(Typography)`
  font-size: 0.875rem;
  color: #86868b;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

export const FormRow = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
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

export const Input = styled(TextField)`
  .MuiOutlinedInput-root {
    border-radius: 35px;
    background: #ffffff;
    
    fieldset {
      border-color: #d1d1d6;
    }
    
    &:hover fieldset {
      border-color: #aeaeb2;
    }
    
    &.Mui-focused fieldset {
      border-color: #0071e3;
      box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.15);
    }
  }
  
  .MuiInputBase-input {
    padding: 0.875rem 1rem;
    font-size: 1rem;
    color: #1d1d1f;
  }
  
  .MuiInputLabel-root {
    color: #86868b;
    
    &.Mui-focused {
      color: #0071e3;
    }
  }
`

export const SelectInput = styled(FormControl)`
  .MuiOutlinedInput-root {
    border-radius: 12px;
    background: #ffffff;
    
    fieldset {
      border-color: #d1d1d6;
    }
    
    &:hover fieldset {
      border-color: #aeaeb2;
    }
    
    &.Mui-focused fieldset {
      border-color: #0071e3;
      box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.15);
    }
  }
  
  .MuiSelect-select {
    padding: 0.875rem 1rem;
    font-size: 1rem;
    color: #1d1d1f;
    text-align: left;
  }
  
  .MuiInputLabel-root {
    color: #86868b;
    
    &.Mui-focused {
      color: #0071e3;
    }
  }
`

export const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 0.5rem;
  background: #0071e3;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
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

export const ErrorMessage = styled(Typography)`
  font-size: 0.8125rem;
  color: #ff3b30;
  margin-top: -0.5rem;
`

export const OptionalLabel = styled.span`
  font-size: 0.8125rem;
  color: #86868b;
  font-weight: 400;
  margin-left: 0.25rem;
`