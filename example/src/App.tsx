import {
  ChakraProvider,
  ColorModeScript,
  useColorMode,
  useColorModeValue,
  extendTheme,
  Button,
  Flex,
  VStack,
} from '@chakra-ui/react'
import {
  MultiSelect,
  MultiSelectProps,
  MultiSelectTheme,
} from 'chakra-multiselect'
import { FC, useCallback, useState } from 'react'

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme,
  },
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
  'Oganesson',
]

const options = items.map((label) => ({ label, value: label.toLowerCase() }))

const StatefulMultiSelect: FC<
  Omit<MultiSelectProps, 'onChange' | 'value'> &
    Partial<Pick<MultiSelectProps, 'onChange' | 'value'>>
> = ({ onChange: _onChange, value: _value, ...props }) => {
  const [value, setValue] = useState(_value || props.single ? '' : [])
  const onChange = useCallback(
    (next: any) => {
      setValue(next)
      _onChange?.(next)
    },
    [setValue, _onChange]
  )

  return <MultiSelect value={value} onChange={onChange} {...props} />
}

const App = () => {
  return (
    <>
      <ColorModeScript initialColorMode='light' />
      <ChakraProvider theme={theme}>
        <VStack minH='100vh' w='full'>
          <ColorModeToggleBar />
          <VStack
            spacing='12'
            w='full'
            flex='1'
            justifyContent='center'
            alignItems='center'
          >
            <StatefulMultiSelect
              options={options}
              label='Choose a single item'
              single
            />
            <StatefulMultiSelect
              options={options}
              label='Choose multiple items'
            />
            <StatefulMultiSelect
              options={options}
              label='Choose or create a single item'
              single
              create
            />
            <StatefulMultiSelect
              options={options}
              label='Choose or create multiple items'
              create
            />
          </VStack>
        </VStack>
      </ChakraProvider>
    </>
  )
}

export default App
