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
  SelectionVisibilityMode,
  useMultiSelect,
} from 'chakra-multiselect'
import { FC, useState } from 'react'

const theme = extendTheme({
  components: {
    MultiSelect: {
      ...MultiSelectTheme,
      baseStyle: (props: any) => {
        const baseStyle = MultiSelectTheme.baseStyle(props) as any
        return {
          ...baseStyle,
        }
      },
    },
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

const _options = items.map((label) => ({ label, value: label.toLowerCase() }))

const StatefulMultiSelect: FC<
  Omit<MultiSelectProps, 'onChange' | 'value'> &
    Partial<Pick<MultiSelectProps, 'onChange' | 'value'>>
> = ({ onChange: _onChange, value: _value, options: __options, ...props }) => {
  const { value, options, onChange } = useMultiSelect({
    value: _value ?? (props.single ? '' : []),
    options: __options!,
    onChange: _onChange,
  })

  return (
    <MultiSelect
      value={value}
      options={options}
      onChange={onChange!}
      {...props}
    />
  )
}

const initialValue = _options.slice(0, 3)

const App = () => {
  const [items, setItems] = useState<any>(initialValue)
  const isDisabled = items?.length > 2

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
              options={_options}
              label='Choose a single item'
              placeholder='Select ...'
              searchPlaceholder='Search ...'
              single
            />
            <StatefulMultiSelect
              options={_options}
              value={initialValue}
              label='Choose multiple items (small)'
              placeholder='Select ...'
              searchPlaceholder='Search ...'
              size='sm'
            />
            <StatefulMultiSelect
              options={_options}
              value={initialValue}
              label={isDisabled ? `Remove ${items.length - 2} item(s) to continue (medium|default)` : 'Choose multiple items (medium|default)'}
              placeholder='Select ...'
              searchPlaceholder='Search ...'
              size='md'
              disabled={isDisabled}
              onChange={setItems}
            />
            <StatefulMultiSelect
              options={_options}
              value={initialValue}
              label='Choose multiple items (large)'
              placeholder='Select ...'
              searchPlaceholder='Search ...'
              size='lg'
            />
            <StatefulMultiSelect
              options={_options}
              label='Choose or create a single item'
              placeholder='Select or create...'
              single
              create
            />
            <StatefulMultiSelect
              options={_options}
              label='Choose or create multiple items'
              placeholder='Select or create ...'
              searchPlaceholder='Search or create ...'
              create
            />
            <StatefulMultiSelect
              options={_options}
              label='Choose a single item with list selection'
              placeholder='Select ...'
              searchPlaceholder='Search ...'
              selectionVisibleIn={SelectionVisibilityMode.List}
              single
            />
            <StatefulMultiSelect
              options={_options}
              label='Choose multiple items with list selection'
              placeholder='Select ...'
              searchPlaceholder='Search ...'
              selectionVisibleIn={SelectionVisibilityMode.List}
            />
            <StatefulMultiSelect
              options={_options}
              label='Choose multiple items with both selection'
              placeholder='Select ...'
              searchPlaceholder='Search ...'
              selectionVisibleIn={SelectionVisibilityMode.Both}
            />
          </VStack>
        </VStack>
      </ChakraProvider>
    </>
  )
}

export default App
