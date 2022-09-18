import React, { useState } from 'react'
import SeparatorInput from 'react-separator-input'

const InputDemo: React.FC = () => {
  const [value, setValue] = useState('1')

  return (
    <div>
      <div>{value}</div>
      <SeparatorInput
        value={value}
        precision={5}
        placeholder="Input"
        thousandSeparator=","
        decimalSeparator="."
        onValueChange={({ numberValue, formattedValue }) => {
          setValue(formattedValue)
        }}
      />
    </div>
  )
}

export default InputDemo
