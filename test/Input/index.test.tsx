import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import SeparatorInput from '../../src'

describe('Separator Input', () => {
  describe('value prop', () => {
    it('should render empty string given nullish value', () => {
      render(<SeparatorInput value={null} />)
      expect(screen.getByRole('textbox')).toHaveValue('')
    })

    it('should render value without separator given 100', () => {
      render(<SeparatorInput value={100} />)
      expect(screen.getByRole('textbox')).toHaveValue('100')
    })

    it('should render period decimal separator given 1.1', () => {
      render(<SeparatorInput value={1.1} />)
      expect(screen.getByRole('textbox')).toHaveValue('1.1')
    })

    it('should render comma decimal separator given 1.1', () => {
      render(<SeparatorInput value={1.1} decimalSeparator="," />)
      expect(screen.getByRole('textbox')).toHaveValue('1,1')
    })

    it('should render comma thousand separator given 1000', () => {
      render(<SeparatorInput value={1000} thousandSeparator="," />)
      expect(screen.getByRole('textbox')).toHaveValue('1,000')
    })

    it('should render period thousand separator given 1000', () => {
      render(<SeparatorInput value={'1000'} thousandSeparator="." decimalSeparator="," />)
      expect(screen.getByRole('textbox')).toHaveValue('1.000')
    })

    it('should render space thousand separator given 1000', () => {
      render(<SeparatorInput value={'1000'} thousandSeparator=" " />)
      expect(screen.getByRole('textbox')).toHaveValue('1 000')
    })
  })
})
