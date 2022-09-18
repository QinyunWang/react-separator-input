import {Separator} from "./types";

export const noop = () => {};

export const isNil = (value: any): boolean => {
  return [null, undefined, ''].includes(value);
};

export const strip = (num: number | string, precision = 15): number => {
  return +parseFloat(Number(num).toPrecision(precision));
}

export const escapeVariable = (value: string) => {
  return value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

export const removeFormat = (value: any, decimalSeparator: Exclude<Separator, ' '>) => {
  const regex = new RegExp(`[^0-9${escapeVariable(decimalSeparator)}]|^${escapeVariable(decimalSeparator)}$`, 'g');
  const valueWithoutInvalidInput = value?.toString().replace(regex, '') || '';
  return valueWithoutInvalidInput.replace(new RegExp(`${escapeVariable(decimalSeparator)}`, 'g'), ((i) => (match: string) => !i++ ? match : '')(0));
}

export const applyThousandSeparator = (value: string, thousandSeparator: Separator | '') => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
}
