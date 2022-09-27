---
title: Props
order: 1
---

## value: `string | number | undefined | null`

**default: `undefined`**

This is the value for the input field. It can be a float number or a formatted string. <br />

```tsx
import React from 'react';
import { SeparatorInput } from 'react-separator-input';

const InputDemo: React.FC = () => {
  return (
    <div>
      <SeparatorInput value={2333.666} style={{ width: '30%' }} thousandSeparator="," />
    </div>
  );
};

export default InputDemo;
```

---

## thousandSeparator: `',' | '.' | ' '`

**default: `undefined`**

```tsx
import React from 'react';
import { SeparatorInput } from 'react-separator-input';

const InputDemo: React.FC = () => {
  return (
    <div>
      <SeparatorInput
        style={{ width: '30%' }}
        placeholder="Thousand separator(',')"
        thousandSeparator=","
      />
    </div>
  );
};

export default InputDemo;
```

---

## decimalSeparator: `',' | '.'`

**default: `'.'`**

⚠️ Thousand separator and decimal separator cannot be same

```tsx
import React from 'react';
import { SeparatorInput } from 'react-separator-input';

const InputDemo: React.FC = () => {
  return (
    <div>
      <SeparatorInput
        style={{ width: '30%' }}
        placeholder="Thousand separator('.') & Decimal separator(',')"
        thousandSeparator="."
        decimalSeparator=","
      />
    </div>
  );
};

export default InputDemo;
```

---

## precision: `number`

**default: `undefined`**

```tsx
import React from 'react';
import { SeparatorInput } from 'react-separator-input';

const InputDemo: React.FC = () => {
  return (
    <div>
      <SeparatorInput
        style={{ width: '30%' }}
        placeholder="Precision(2)"
        thousandSeparator=","
        precision={2}
      />
    </div>
  );
};

export default InputDemo;
```

---

## onValueChange<br/>`(value: { formattedValue: string, numberValue: number }) => void`

**default: `undefined`**

```tsx
import React, { useState } from 'react';
import { SeparatorInput } from 'react-separator-input';

const InputDemo: React.FC = () => {
  const [value, setValue] = useState<{ formattedValue: string; numberValue: number }>({
    formattedValue: '1,000',
    numberValue: 1000,
  });

  return (
    <div>
      <div>
        <p>Formatted Value: {value.formattedValue}</p>
        <p>Numeric Value: {value.numberValue}</p>
      </div>
      <br />
      <SeparatorInput
        style={{ width: '30%' }}
        value={value.formattedValue}
        thousandSeparator=","
        onValueChange={setValue}
      />
    </div>
  );
};

export default InputDemo;
```
