import {
  ChakraProvider,
  ColorModeScript,
  useColorMode,
  useColorModeValue,
  extendTheme,
  Button,
  Flex,
  VStack
} from '@chakra-ui/react'
import { MultiSelect, MultiSelectTheme } from 'chakra-multiselect'
import { useState } from 'react'

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme
  }
})

const ColorModeToggleBar = () => {
  const { toggleColorMode } = useColorMode()
  const nextMode = useColorModeValue('dark', 'light')

  return (
    <Flex justify='flex-end' mb={4}>
      <Button
        size='md'
        variant='ghost'
        color='current'
        marginLeft='2'
        onClick={toggleColorMode}
      >{`Switch to ${nextMode} mode`}</Button>
    </Flex>
  )
}

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
    <>
      <ColorModeScript initialColorMode='light' />
      <ChakraProvider theme={theme}>
        <VStack minH='100vh' w='full'>
          <ColorModeToggleBar />
          <VStack w='full' flex='1' justifyContent='center' alignItems='center'>
            <MultiSelect
              value={value}
              options={options}
              label='Choose an item'
              onChange={(next) => {
                setValue(next as any)
              }}
              create
            />
          </VStack>
        </VStack>
      </ChakraProvider>
    </>
  )
}

export default App
