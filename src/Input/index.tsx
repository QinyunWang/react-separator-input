import React, { useEffect, useMemo, useState } from 'react';
import { applyThousandSeparator, escapeVariable, isNil, noop, removeFormat, strip } from './utils';
import { Separator, SeparatorInputProps } from './types';

const getCursorPosition = (
  formattedValue: string,
  inputValue: string,
  cursorPosition: number,
  thousandSeparator: Separator | '',
  validInputRegex: RegExp,
): number => {
  let index = cursorPosition - 1;
  if (inputValue[index] === thousandSeparator) {
    index -= 1;
  }
  while (!validInputRegex.test(inputValue[index]) && index > 1) index--;

  // Record the character before cursor to find
  // Exactly times of occurrence is needed
  const charToFind = inputValue[index];
  let count = 0;
  for (let i = 0; i < index; i++) {
    if (inputValue[i] === charToFind) {
      count++;
    }
  }

  // Find the character with exact times of occurrence
  let timesOfMatch = 0;
  for (let j = 0; j < formattedValue.length; j++) {
    if (formattedValue[j] === charToFind) {
      if (timesOfMatch === count) {
        cursorPosition = j + 1;
        break;
      }
      timesOfMatch++;
    }
  }
  return cursorPosition;
};

const format = (
  valueNumberStr: string,
  thousandSeparator: Separator | '',
  decimalSeparator: Exclude<Separator, ' '>,
  stage: 'change' | 'blur',
  precision?: number,
): string => {
  const hasDecimalSeparator = valueNumberStr.includes(decimalSeparator);
  let [integerPart, decimalPart] = valueNumberStr.split(decimalSeparator);
  integerPart = applyThousandSeparator(integerPart, thousandSeparator);
  if (decimalPart && precision !== undefined) {
    decimalPart = decimalPart.substring(0, precision);
  }

  let result = integerPart;

  if (stage === 'change') {
    result += hasDecimalSeparator ? decimalSeparator + decimalPart || '' : '';
  }
  if (stage === 'blur') {
    result += decimalPart ? decimalSeparator + decimalPart : '';
  }

  return result;
};

const withSeparator = <P extends object>(Component: React.ComponentType<P> | 'input') =>
  function SeparatorInput(props: P & SeparatorInputProps) {
    const {
      precision,
      decimalSeparator = '.',
      thousandSeparator = '',
      onValueChange = noop,
      ...otherProps
    } = props;

    if (thousandSeparator === decimalSeparator) {
      throw new Error(`
      Thousand separator cannot be same with decimal separator.
      Thousand separator: '${thousandSeparator}'
      Decimal separator: '${decimalSeparator}'
    `);
    }

    const [formattedValue, setFormattedValue] = useState<string>('');

    useEffect(() => {
      const { formattedValue: newFormattedValue } = getValueGroup(props.value, 'change');
      setFormattedValue(newFormattedValue);
    }, [props.value]);

    const validInputRegex = useMemo(() => {
      return new RegExp(`[0-9${escapeVariable(decimalSeparator)}]`);
    }, [decimalSeparator]);

    const getValueGroup = (
      value: any,
      stage: 'change' | 'blur',
    ): {
      numberValueStr: string;
      formattedValue: string;
      numberValue: number;
    } => {
      if (typeof value === 'number') {
        value = value.toString().replace('.', decimalSeparator);
      }

      const numberValueStr = removeFormat(value, decimalSeparator);
      const formattedValue = format(
        numberValueStr,
        thousandSeparator,
        decimalSeparator,
        stage,
        precision,
      );
      const numberValue = isNil(numberValueStr)
        ? NaN
        : strip(formattedValue.replaceAll(thousandSeparator, '').replace(decimalSeparator, '.'));
      return { numberValueStr, formattedValue, numberValue };
    };

    const updateValue = (
      event: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>,
      stage: 'change' | 'blur',
    ): void => {
      const { value, selectionStart } = event.target;

      const { formattedValue: newFormattedValue, numberValue } = getValueGroup(value, stage);

      const cursorPosition = getCursorPosition(
        newFormattedValue,
        value,
        selectionStart ?? 0,
        thousandSeparator,
        validInputRegex,
      );

      event.target.value = newFormattedValue;
      event.target.setSelectionRange(cursorPosition, cursorPosition);
      setFormattedValue(newFormattedValue);

      onValueChange({ formattedValue: newFormattedValue, numberValue });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      updateValue(event, 'change');
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
      updateValue(event, 'blur');
    };

    return (
      <Component
        {...(otherProps as P)}
        value={formattedValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    );
  };

export default withSeparator;
