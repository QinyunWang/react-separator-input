export type Separator = ',' | '.' | ' ';

export interface SeparatorInputProps {
  value?: number | string | null;
  precision?: number;
  decimalSeparator?: Exclude<Separator, ' '>;
  thousandSeparator?: Separator;
  onValueChange?: (value: { formattedValue: string; numberValue: number }) => void;
}
