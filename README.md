# chakra-multiselect

> A Multiselect component using ChakraUI

[![NPM](https://img.shields.io/npm/v/chakra-multiselect.svg)](https://www.npmjs.com/package/chakra-multiselect)
[![Package Size](https://badgen.net/bundlephobia/min/chakra-multiselect)](https://badgen.net/bundlephobia/min/chakra-multiselect)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-prettier-hotpink.svg)](https://prettier.io)

## Install

```bash
npm install --save chakra-multiselect
or
yarn add chakra-multiselect
```

## Usage

Single Mode

```tsx
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { MultiSelect, MultiSelectTheme } from 'chakra-multiselect'

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme
  }
})

const App = () => {
  const [value, setValue] = useState('')

  return (
    <ChakraProvider theme={theme}>
      <MultiSelect
        options={options}
        value={value}
        label='Choose an item'
        onChange={setValue}
        single
      />
    </ChakraProvider>
  )
}
```

Multi Mode

```tsx
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { MultiSelect, MultiSelectTheme } from 'chakra-multiselect'

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme
  }
})

const App = () => {
  const [value, setValue] = useState([])

  return (
    <ChakraProvider theme={theme}>
      <MultiSelect
        options={options}
        value={value}
        label='Choose an item'
        onChange={setValue}
      />
    </ChakraProvider>
  )
}
```

## License

MIT © [bmartel](https://github.com/bmartel)
