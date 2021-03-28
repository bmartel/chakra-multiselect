# chakra-multiselect

> A Multiselect component using ChakraUI

[![NPM](https://img.shields.io/npm/v/chakra-multiselect.svg)](https://www.npmjs.com/package/chakra-multiselect) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save chakra-multiselect
or
yarn add chakra-multiselect
```

## Usage

```tsx
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { MultiSelect, MultiSelectTheme } from 'chakra-multiselect'

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme
  }
})

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <MultiSelect items={items} label="Choose an item" />
    </ChakraProvider>
  )
}
```

## License

MIT © [bmartel](https://github.com/bmartel)
