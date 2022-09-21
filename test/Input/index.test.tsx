import '@testing-library/jest-dom'
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import SeparatorInput from '../../src'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import userEvent from '@testing-library/user-event'

describe('Separator Input', () => {
  it('should throw error given same thousand separator and decimal separator', () => {
    expect(() => render(<SeparatorInput thousandSeparator="." />)).toThrowError()
  })

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

    it('should truncate the decimal value exceed the precision', () => {
      render(<SeparatorInput value={1000.12} precision={1} />)
      expect(screen.getByRole('textbox')).toHaveValue('1000.1')
    })
  })

  describe('real time input convert', () => {
    let user: UserEvent
    beforeAll(() => {
      user = userEvent.setup()
    })

    it('should add comma thousand separator during input', async () => {
      render(<SeparatorInput thousandSeparator="," />)
      const element = screen.getByRole('textbox')

      await user.click(element)
      await user.keyboard('1000')
      expect(element).toHaveValue('1,000')

      await user.keyboard('.')
      expect(element).toHaveValue('1,000.')

      fireEvent.blur(element)
      expect(element).toHaveValue('1,000')

      await user.click(element)
      await user.keyboard('{Backspace}')
      expect(element).toHaveValue('100')
    })

    it('should add period thousand separator during input', async () => {
      render(<SeparatorInput thousandSeparator="." decimalSeparator="," />)
      const element = screen.getByRole('textbox')

      await user.click(element)
      await user.keyboard('1000000')
      expect(element).toHaveValue('1.000.000')

      await user.keyboard(',102345')
      expect(element).toHaveValue('1.000.000,102345')
    })

    it('should not accept input when out of range of precision', async () => {
      render(<SeparatorInput thousandSeparator="," precision={1} />)
      const element = screen.getByRole('textbox')

      await user.click(element)
      await user.keyboard('1234.1')
      expect(element).toHaveValue('1,234.1')

      await user.keyboard('666')
      expect(element).toHaveValue('1,234.1')

      await user.keyboard('{ArrowLeft>4/}.')
      expect(element).toHaveValue('12.3')
    })

    it('should not able to delete thousand separator when press backspace', async () => {
      render(<SeparatorInput thousandSeparator="," />)
      const element = screen.getByRole('textbox')

      await user.click(element)
      await user.keyboard('1000{ArrowLeft>3/}{Backspace}')
      expect(element).toHaveValue('1,000')
    })

    it('should not accept ahead decimal separator', async () => {
      render(<SeparatorInput thousandSeparator="," />)
      const element = screen.getByRole('textbox')

      await user.click(element)
      await user.keyboard('.123')
      expect(element).toHaveValue('123')

      await user.clear(element)
      await user.keyboard('0.1')
      expect(element).toHaveValue('0.1')
    })

    it('should only accept numeric and decimal separator input', async () => {
      render(<SeparatorInput thousandSeparator="," />)
      const element = screen.getByRole('textbox')

      await user.click(element)
      await user.keyboard('1000asd+-*&@#~`,_')
      expect(element).toHaveValue('1,000')

      await user.paste('abc666')
      expect(element).toHaveValue('1,000,666')
    })

    it('should call onValueChange with correct formatted value', async () => {
      const mockOnValueChange = jest.fn()
      render(<SeparatorInput thousandSeparator="," onValueChange={mockOnValueChange} />)
      const element = screen.getByRole('textbox')

      await user.click(element)
      await user.keyboard('1000.')
      expect(mockOnValueChange.mock.calls.length).toBe(5)
      expect(mockOnValueChange.mock.calls[4][0]?.formattedValue).toBe('1,000.')

      fireEvent.blur(element)
      expect(mockOnValueChange.mock.calls.length).toBe(6)
      expect(mockOnValueChange.mock.calls[5][0]?.formattedValue).toBe('1,000')
    })

    it('should call onValueChange with correct numeric value', async () => {
      const mockOnValueChange = jest.fn()
      render(
        <SeparatorInput
          thousandSeparator=" "
          decimalSeparator=","
          onValueChange={mockOnValueChange}
        />
      )
      const element = screen.getByRole('textbox')

      await user.click(element)
      await user.keyboard('1000,')
      expect(mockOnValueChange.mock.calls.length).toBe(5)
      expect(mockOnValueChange.mock.calls[4][0]?.numberValue).toBe(1000)

      fireEvent.blur(element)
      expect(mockOnValueChange.mock.calls.length).toBe(6)
      expect(mockOnValueChange.mock.calls[5][0]?.numberValue).toBe(1000)

      await user.click(element)
      await user.keyboard(',1234')
      fireEvent.blur(element)
      expect(mockOnValueChange.mock.calls[11][0]?.numberValue).toBe(1000.1234)
    })
  })
})
