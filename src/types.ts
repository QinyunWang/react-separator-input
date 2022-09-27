import React from 'react'

export type InputAttributes = Omit<
React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
keyof SeparatorInputProps
>

export type Separator = ',' | '.' | ' '

export interface SeparatorInputProps {
  value?: number | string | null
  precision?: number
  decimalSeparator?: Exclude<Separator, ' '>
  thousandSeparator?: Separator
  onValueChange?: (value: { formattedValue: string, numberValue: number }) => void
  onChange?: React.InputHTMLAttributes<HTMLInputElement>['onChange']
  onBlur?: React.InputHTMLAttributes<HTMLInputElement>['onBlur']
}
