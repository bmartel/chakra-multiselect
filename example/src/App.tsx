import { ChakraProvider, extendTheme, VStack } from '@chakra-ui/react'
import { MultiSelect, MultiSelectTheme } from 'chakra-multiselect'

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme
  }
})

// START OF TEMP
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

/* const menuStyles = { */
/*   maxHeight: 80, */
/*   maxWidth: 300, */
/*   overflowY: 'scroll', */
/*   backgroundColor: '#eee', */
/*   padding: 0, */
/*   listStyle: 'none', */
/*   position: 'relative', */
/* } */

/* const menuMultipleStyles = { */
/*   maxHeight: '180px', */
/*   overflowY: 'auto', */
/*   width: '135px', */
/*   margin: 0, */
/*   borderTop: 0, */
/*   background: 'white', */
/*   position: 'absolute', */
/*   zIndex: 1000, */
/*   listStyle: 'none', */
/*   padding: 0, */
/*   left: '340px' */
/* } */

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <VStack minH='100vh' w='full' justifyContent='center' alignItems='center'>
        <MultiSelect items={items} />
      </VStack>
    </ChakraProvider>
  )
}

export default App
