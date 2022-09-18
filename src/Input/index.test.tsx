import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import SeparatorInput from './index';

describe('basic props', () => {
  it('render Foo with dumi', () => {

    render(<SeparatorInput />);
    expect(screen.queryByText('')).toBeInTheDocument();
  });
});
