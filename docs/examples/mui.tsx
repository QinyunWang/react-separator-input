import React from 'react'
import { withSeparator } from 'react-separator-input'
import { InputAdornment, TextField } from '@mui/material'

const MuiInput = withSeparator(TextField)

const InputDemo: React.FC = () => {
  return (
    <MuiInput
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>
      }}
      label="Separator Input"
      size="small"
      thousandSeparator=","
      precision={2}
    />
  )
}

export default InputDemo
