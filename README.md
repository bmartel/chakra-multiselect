# chakra-multiselect

> A Multiselect component using ChakraUI

[![NPM](https://img.shields.io/npm/v/chakra-multiselect.svg)](https://www.npmjs.com/package/chakra-multiselect)
[![Package Size](https://badgen.net/bundlephobia/min/chakra-multiselect)](https://badgen.net/bundlephobia/min/chakra-multiselect)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-prettier-hotpink.svg)](https://prettier.io)

## Install [ChakraUI](https://chakra-ui.com/getting-started)

```bash
npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

## Install ChakraMultiselect

```bash
npm install --save chakra-multiselect
or
yarn add chakra-multiselect
```

## Usage

Ensure your application has a `ChakraProvider` wrapping your Application's main component (ex. `<App />`).

Include the MultiSelectTheme as a component in the theme declarations.

See https://bmartel.github.io/chakra-multiselect/docs for full documentation.

``` tsx
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import {  MultiSelectTheme } from 'chakra-multiselect'

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme
  }
})

const App = () => (
  <ChakraProvider theme={theme}>
    {/* ... */}
  </ChakraProvider>
)
```

Single Mode

```tsx
import { MultiSelect } from 'chakra-multiselect'

const Component = () => {
  const [value, setValue] = useState('')

  return (
    <MultiSelect
      options={options}
      value={value}
      label='Choose an item'
      onChange={setValue}
      single
    />
  )
}
```

Multi Mode

```tsx
import { MultiSelect } from 'chakra-multiselect'

const Component = () => {
  const [value, setValue] = useState([])

  return (
    <MultiSelect
      options={options}
      value={value}
      label='Choose an item'
      onChange={setValue}
    />
  )
}
```

Single + Create Mode

```tsx
import { MultiSelect, useMultiSelect } from 'chakra-multiselect'

const Component = () => {
  const { value, options, onChange } = useMultiSelect({
    value: '',
    options: []
  })

  return (
    <MultiSelect
      options={options}
      value={value}
      label='Choose or create an item'
      onChange={onChange}
      create
      single
    />
  )
}
```

Multi + Create Mode

```tsx
import { MultiSelect, useMultiSelect } from 'chakra-multiselect'

const Component = () => {
  const { value, options, onChange } = useMultiSelect({
    value: [],
    options: []
  })

  return (
    <MultiSelect
      options={options}
      value={value}
      label='Choose or create items'
      onChange={onChange}
      create
    />
  )
}
```


## License

MIT © [bmartel](https://github.com/bmartel)
