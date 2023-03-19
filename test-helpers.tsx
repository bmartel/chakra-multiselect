import { randomFillSync } from 'crypto'
import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ThemeProvider } from '@chakra-ui/react'
import { MultiSelectTheme } from './src'

const theme = {
  Components: {
    MultiSelect: MultiSelectTheme,
  },
}

window.crypto = {
  getRandomValues(buffer: any): any {
    return randomFillSync(buffer as Buffer)
  },
} as any

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'
export { customRender as render }
