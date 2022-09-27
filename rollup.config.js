import fileSize from 'rollup-plugin-filesize';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';

import packageJson from './package.json';

const globals = {
  react: 'React',
};

const defaultConfig = {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
      globals,
      exports: 'auto',
    },
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
      globals,
      exports: 'auto',
    },
  ],
  external: ['react'],
  plugins: [
    peerDepsExternal(),
    typescript({
      target: 'es2021',
      tsconfig: './tsconfig.production.json',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    resolve(),
    commonjs(),
    terser(),
    fileSize(),
  ],
};

const dtsConfig = {
  input: 'dist/index.d.ts',
  output: [{ file: 'dist/index.d.ts', format: 'esm' }],
  plugins: [dts()],
};

export default [defaultConfig, dtsConfig];
