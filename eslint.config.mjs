import { defineConfig } from "eslint/config";
import next from '@next/eslint-plugin-next';
import react from 'eslint-plugin-react'
import typescript from 'typescript-eslint'

export default defineConfig([
  {
    plugins: {
      'next': next.configs.recommended,
      'react': react.configs.recommended,
      'typescript': typescript.configs.recommended
    },
  },
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'coverage/**'
    ],
  }
])