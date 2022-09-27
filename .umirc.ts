import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'react-separator-input',
  favicon:
    process.env.NODE_ENV === 'production'
      ? './react-separator-input/assets/ke.ico'
      : '/assets/ke.ico',
  logo:
    process.env.NODE_ENV === 'production'
      ? './react-separator-input/images/logo.svg'
      : '/images/logo.svg',
  outputPath: 'docs-dist',
  base: '/react-separator-input/',
  publicPath: process.env.NODE_ENV === 'production' ? './react-separator-input/' : '/',
  // more config: https://d.umijs.org/config
});
