import { ChakraProvider, extendTheme, VStack } from '@chakra-ui/react'
import { MultiSelect, MultiSelectTheme } from 'chakra-multiselect'
import { useState } from 'react'

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme
  }
})

const items = [
  'Neptunium',
  'Plutonium',
  'Americium',
  'Curium',
  'Berkelium',
  'Californium',
  'Einsteinium',
  'Fermium',
  'Mendelevium',
  'Nobelium',
  'Lawrencium',
  'Rutherfordium',
  'Dubnium',
  'Seaborgium',
  'Bohrium',
  'Hassium',
  'Meitnerium',
  'Darmstadtium',
  'Roentgenium',
  'Copernicium',
  'Nihonium',
  'Flerovium',
  'Moscovium',
  'Livermorium',
  'Tennessine',
  'Oganesson'
]

const options = items.map((label) => ({ label, value: label.toLowerCase() }))

const App = () => {
  const [value, setValue] = useState([])

  return (
    <ChakraProvider theme={theme}>
      <VStack minH='100vh' w='full' justifyContent='center' alignItems='center'>
        <MultiSelect
          value={value}
          options={options}
          label='Choose an item'
          onChange={next => setValue(next as any)}
          multi
        />
      </VStack>
    </ChakraProvider>
  )
}

export default App
