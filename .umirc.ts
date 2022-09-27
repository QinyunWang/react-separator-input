import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'react-separator-input',
  favicon: process.env.NODE_ENV === 'production' ? './assets/ke.ico' : '/assets/ke.ico',
  logo: process.env.NODE_ENV === 'production' ? './images/logo.svg' : '/images/logo.svg',
  outputPath: 'docs-dist',
  base: '/react-separator-input/',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // more config: https://d.umijs.org/config
});
