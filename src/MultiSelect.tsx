import {
  HTMLChakraProps,
  MenuOptionGroup,
  MenuDivider,
  MenuProps,
  Input,
  MenuListProps,
  MenuOptionGroupProps,
  MenuDividerProps,
  Box,
  IconButton,
  Divider,
  chakra,
  HStack,
  omitThemingProps,
  useMultiStyleConfig,
  StylesProvider,
  forwardRef
} from '@chakra-ui/react'
import { ReactNode, useMemo } from 'react'
import { PropsOf } from '@emotion/react'
import {
  SelectProvider,
  useSelect,
  useSelectContext,
  useSelectItem,
  useSelectLabel,
  useSelectList
} from './use-select'

// @see https://github.com/chakra-ui/chakra-ui/issues/140

export interface SelectProps
  extends Omit<HTMLChakraProps<'select'>, 'size'>,
    Omit<MenuProps, 'children'> {
  items?: any[]
  initialSelectedItems?: any[]
  defaultIsOpen?: boolean
  isLazy?: true
  closeOnSelect?: false
  children: ReactNode
}

export interface SelectControlProps
  extends Omit<HTMLChakraProps<'select'>, 'size'>,
    Omit<MenuProps, 'children'> {
  defaultIsOpen?: boolean
  isLazy?: true
  closeOnSelect?: false
  children?: ReactNode
}

export interface SelectListProps extends MenuListProps {}
export interface SelectDividerProps extends MenuDividerProps {}
export interface SelectOptionGroupProps extends MenuOptionGroupProps {}
export interface SelectOptionItemProps extends HTMLChakraProps<'li'> {
  highlighted?: boolean
  index: number
}

export interface MultiSelectProps extends Omit<SelectProps, 'children'> {
  children?: ReactNode
}

const selectedItemStyles = {
  marginLeft: '5px',
  backgroundColor: 'aliceblue',
  borderRadius: '10px'
}

const selectedItemIconStyles = { cursor: 'pointer' }
// END OF TEMP

export const Select: React.FC<SelectProps> = (props) => {
  const { children } = props

  const styles = useMultiStyleConfig('MultiSelect', props)
  const ownProps = omitThemingProps(props)

  const ctx = useSelect(ownProps as any)
  const context = useMemo(() => ctx, [ctx])

  return (
    <SelectProvider value={context}>
      <StylesProvider value={styles}>{children}</StylesProvider>
    </SelectProvider>
  )
}

export const SelectLabel: React.FC<HTMLChakraProps<'label'>> = (props) => {
  const labelProps = useSelectLabel()

  return <chakra.label {...props} {...labelProps} />
}

export const SelectOptionItem: React.FC<SelectOptionItemProps> = ({
  value,
  index,
  ...props
}) => {
  const itemProps = useSelectItem({ item: value, index })

  return (
    <chakra.li {...props} {...itemProps}>
      {value}
    </chakra.li>
  )
}
export const SelectList = forwardRef<SelectListProps, 'ul'>((_, ref) => {
  const {
    __css,
    items,
    isOpen,
    getFilteredItems,
    ref: listRef,
    ...listProps
  } = useSelectList({ ref })

  return (
    <chakra.ul
      ref={listRef}
      __css={{
        position: 'absolute',
        top: 0,
        transition: 'all 250ms',
        ...__css
      }}
      {...listProps}
    >
      {isOpen &&
        getFilteredItems!(items)?.map((item: any, index: number) => (
          <SelectOptionItem
            key={`${item}${index}`}
            value={item}
            index={index}
          />
        ))}
    </chakra.ul>
  )
})

export const SelectOptionGroup: React.FC<SelectOptionGroupProps> = (props) => {
  return <MenuOptionGroup {...props} />
}

export const SelectDivider: React.FC<SelectDividerProps> = (props) => {
  return <MenuDivider {...props} />
}

const SelectToggleIcon: React.FC<PropsOf<'svg'>> = (props) => (
  <svg
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    viewBox='0 0 24 24'
    width='1.5em'
    height='1.5em'
    {...props}
  >
    <path d='M6 9l6 6 6-6' />
  </svg>
)

export const SelectControl: React.FC<SelectControlProps> = () => {
  const {
    isOpen,
    selectedItems,
    getSelectedItemProps,
    removeSelectedItem,
    getInputProps,
    getToggleButtonProps,
    getDropdownProps,
    getComboboxProps
  } = useSelectContext()

  return (
    <Input as={Box} pos='relative' px={1} d='flex'>
      <HStack>
        {selectedItems?.map((selectedItem, index) => (
          <span
            style={selectedItemStyles}
            key={`selected-item-${index}`}
            {...getSelectedItemProps!({ selectedItem, index })}
          >
            {selectedItem}
            <span
              style={selectedItemIconStyles}
              onClick={() => removeSelectedItem!(selectedItem)}
            >
              &#10005;
            </span>
          </span>
        ))}
      </HStack>

      <Box d='flex' alignItems='center' {...getComboboxProps!()}>
        <chakra.input
          {...getInputProps!(getDropdownProps!({ preventKeyAction: isOpen }))}
        />
        <Box d='flex' py='1' alignItems='center'>
          <Divider orientation='vertical' />
        </Box>
        <IconButton
          variant='ghost'
          size='sm'
          aria-label='toggle menu'
          icon={<SelectToggleIcon />}
          {...getToggleButtonProps!()}
        />
      </Box>
    </Input>
  )
}

export const MultiSelect: React.FC<MultiSelectProps> = ({ items }) => {
  return (
    <Select items={items}>
      <SelectLabel>Choose some elements:</SelectLabel>
      <SelectControl />
      <SelectList />
    </Select>
  )
}
