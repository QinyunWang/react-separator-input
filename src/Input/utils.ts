import { Separator } from './types';

export const noop = (): void => {};

export const isNil = (value: any): boolean => {
  return [null, undefined, ''].includes(value);
};

export const strip = (num: number | string, precision = 15): number => {
  return +parseFloat(Number(num).toPrecision(precision));
};

export const escapeVariable = (value: string): string => {
  return value.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
};

export const removeFormat = (value: any, decimalSeparator: Exclude<Separator, ' '>): string => {
  const regex = new RegExp(
    `[^0-9${escapeVariable(decimalSeparator)}]|^${escapeVariable(decimalSeparator)}$`,
    'g',
  );
  const valueWithoutInvalidInput = value?.toString().replace(regex, '') || '';
  // Only retain the first decimal separator
  return valueWithoutInvalidInput.replace(
    new RegExp(`${escapeVariable(decimalSeparator)}`, 'g'),
    (
      (i) => (match: string) =>
        !i++ ? match : ''
    )(0),
  );
};

export const applyThousandSeparator = (
  value: string,
  thousandSeparator: Separator | '',
): string => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
};
