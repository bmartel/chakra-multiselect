import { ChakraProvider, extendTheme, VStack } from '@chakra-ui/react'
import { MultiSelect, MultiSelectTheme } from 'chakra-multiselect'

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme
  }
})

const options = [
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

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <VStack minH='100vh' w='full' justifyContent='center' alignItems='center'>
        <MultiSelect items={options} label='Choose an item' />
      </VStack>
    </ChakraProvider>
  )
}

export default App
