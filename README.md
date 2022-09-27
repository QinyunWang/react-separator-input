# react-separator-input

A number input component with automatically added separators.

## Feature

1. Configurable thousand and decimal separator
2. Support number precision
3. HOC to support use with UI framework like antd and materialUI

## Install

```bash
npm install react-separator-input --save
```

## Docs

https://qinyunwang.github.io/react-separator-input/

## Usage

### HTML input component

```tsx | pure
import { SeparatorInput } from 'react-separator-input';

React.render(<SeparatorInput thousandSeparator="," precision={2} />);
```

### With UI libraries

```tsx | pure
import { withSeparator } from 'react-separator-input';
import { Input } from 'antd';

const AntdInput = withSeparator(Input);

React.render(<AntdInput thousandSeparator="," precision={2} />);
```
