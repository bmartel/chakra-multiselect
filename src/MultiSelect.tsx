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
  forwardRef,
  Tag,
  TagLabel,
  TagCloseButton,
  TagProps
} from '@chakra-ui/react'
import { ReactNode, useMemo } from 'react'
import { PropsOf } from '@emotion/react'
import {
  SelectProvider,
  useSelect,
  useSelectButton,
  useSelectControl,
  useSelectCombobox,
  useSelectedItem,
  useSelectInput,
  useSelectItem,
  useSelectLabel,
  useSelectList,
  useSelectedList
} from './use-select'

// @see https://github.com/chakra-ui/chakra-ui/issues/140

export interface SelectItem {
  value: any
  label?: string
}

export interface SelectProps
  extends Omit<HTMLChakraProps<'select'>, 'size'>,
    Omit<MenuProps, 'children'> {
  label?: string
  items?: any[]
  value?: any
  initialSelectedItems?: any[]
  defaultIsOpen?: boolean
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

export interface SelectedItemProps extends TagProps, SelectItem {
  index: number
}

export interface MultiSelectProps
  extends Omit<SelectProps, 'children' | 'value'> {
  children?: ReactNode
  value?: any[]
}

export const Select: React.FC<SelectProps> = (props) => {
  const { children } = props

  const styles = useMultiStyleConfig('MultiSelect', props)
  const ownProps = omitThemingProps(props)

  const ctx = useSelect(ownProps as any)
  const context = useMemo(() => ctx, [ctx])

  return (
    <SelectProvider value={context}>
      <StylesProvider value={styles}>
        <chakra.div pos='relative'>{children}</chakra.div>
      </StylesProvider>
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
        listStyle: 'none',
        position: 'absolute',
        ...(!isOpen && { visibility: 'hidden' }),
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
  <svg viewBox='0 0 24 24' width='1.5em' height='1.5em' {...props}>
    <path
      fill='currentColor'
      d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z'
    />
  </svg>
)

export const SelectInput = () => {
  const inputProps = useSelectInput()

  return <chakra.input {...inputProps} />
}

export const SelectedItem: React.FC<SelectedItemProps> = ({
  value,
  index,
  ...props
}) => {
  const { removeSelectedItem, __css, ...itemProps } = useSelectedItem({
    item: value,
    index,
    ...props
  })

  return (
    <Tag {...__css} {...itemProps}>
      <TagLabel>{value}</TagLabel>
      <TagCloseButton onClick={() => removeSelectedItem(value)} />
    </Tag>
  )
}

export const SelectButton = () => {
  const { __css, ...buttonProps } = useSelectButton()
  return (
    <IconButton
      size='sm'
      aria-label='toggle menu'
      icon={<SelectToggleIcon />}
      {...__css}
      {...buttonProps}
    />
  )
}

export const SelectedList = () => {
  const { __css, selectedItems } = useSelectedList()

  return (
    <HStack flexWrap='wrap' py={1} spacing={1} {...__css}>
      {selectedItems?.map((selectedItem: any, index: number) => (
        <SelectedItem
          key={`selected-item-${index}`}
          value={selectedItem}
          index={index}
        />
      ))}
    </HStack>
  )
}

export const SelectCombobox = () => {
  const { __css, hasDivider, ...comboboxProps } = useSelectCombobox()

  return (
    <Box d='flex' alignItems='center' {...__css} {...comboboxProps}>
      <SelectInput />
      <Box h='full' d='flex' p='1' alignItems='center'>
        {hasDivider && <Divider orientation='vertical' />}
      </Box>
      <SelectButton />
    </Box>
  )
}

export const SelectControl = forwardRef<SelectControlProps, 'div'>(
  ({ children }, ref) => {
    const { ref: controlRef, __css } = useSelectControl({ ref })

    return (
      <Input ref={controlRef} as={HStack} pl={1} pr={0} spacing={1} {...__css}>
        {children}
      </Input>
    )
  }
)

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  ...props
}) => {
  return (
    <Select {...props}>
      {label && <SelectLabel>{label}</SelectLabel>}
      <SelectControl>
        <SelectedList />
        <SelectCombobox />
      </SelectControl>
      <SelectList />
    </Select>
  )
}
