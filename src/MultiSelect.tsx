import {
  HTMLChakraProps,
  MenuOptionGroup,
  MenuProps,
  Input,
  MenuListProps,
  MenuOptionGroupProps,
  Box,
  IconButton,
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
import { memo, ReactNode, useMemo } from 'react'
import { PropsOf } from '@emotion/react'
import {
  SelectProvider,
  useSelect,
  useSelectButton,
  useSelectCombobox,
  useSelectControl,
  useSelectInput,
  useSelectedItem,
  useSelectItem,
  useSelectLabel,
  useSelectList,
  useSelectedList,
  UseSelectProps
} from './use-select'

// @see https://github.com/chakra-ui/chakra-ui/issues/140

export interface SelectItem {
  value: any
  label?: string
}

export interface SelectProps
  extends Omit<
      HTMLChakraProps<'select'>,
      'value' | 'size' | 'onChange' | 'onSelect' | 'children'
    >,
    Omit<MenuProps, 'children'>,
    UseSelectProps {
  label?: string
  children?: ReactNode
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
export interface SelectOptionGroupProps extends MenuOptionGroupProps {}
export interface SelectOptionItemProps extends HTMLChakraProps<'li'> {
  highlighted?: boolean
  index: number
}

export interface SelectedItemProps extends TagProps, SelectItem {
  index: number
}

export interface MultiSelectProps extends Omit<SelectProps, 'children'> {
  children?: ReactNode
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

export const SelectLabel = memo<HTMLChakraProps<'label'>>((props) => {
  const labelProps = useSelectLabel()

  return <chakra.label {...props} {...labelProps} />
})

export const SelectOptionItem: React.FC<SelectOptionItemProps> = ({
  value,
  index,
  ...props
}) => {
  const itemProps = useSelectItem({ value, index })

  return (
    <chakra.li {...props} {...itemProps}>
      {value}
    </chakra.li>
  )
}

export const SelectList = memo(() => {
  const {
    __css,
    visibleOptions,
    isOpen,
    ref: listRef,
    ...listProps
  } = useSelectList({})

  const dropdownVisible = !!(isOpen && visibleOptions.length)

  return (
    <chakra.ul
      ref={listRef}
      __css={{
        listStyle: 'none',
        position: 'absolute',
        ...(!dropdownVisible && { display: 'none' }),
        ...__css
      }}
      {...listProps}
    >
      {dropdownVisible &&
        visibleOptions.map((item: any, index: number) => (
          <SelectOptionItem
            key={`${item.value}${index}`}
            value={item.value}
            index={index}
          />
        ))}
    </chakra.ul>
  )
})

export const SelectOptionGroup: React.FC<SelectOptionGroupProps> = (props) => {
  return <MenuOptionGroup {...props} />
}

const SelectToggleIcon: React.FC<PropsOf<'svg'>> = (props) => (
  <svg viewBox='0 0 24 24' width='1.25rem' height='1.25rem' {...props}>
    <path
      fill='currentColor'
      d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z'
    />
  </svg>
)

export const SelectInput = memo((props) => {
  const inputProps = useSelectInput(props)

  return <chakra.input {...inputProps} />
})

export const SelectedItem: React.FC<SelectedItemProps> = ({
  value,
  index,
  ...props
}) => {
  const { onClick, __css, ...itemProps } = useSelectedItem({
    value,
    index,
    ...props
  })

  return (
    <Tag {...__css} {...itemProps}>
      <TagLabel>{value}</TagLabel>
      <TagCloseButton onClick={onClick} />
    </Tag>
  )
}

export const SelectToggleButton = memo((props) => {
  const {
    __css,
    size = 'sm',
    ariaLabel = 'toggle menu',
    Icon = SelectToggleIcon,
    ...buttonProps
  } = useSelectButton(props)

  return (
    <IconButton
      size={size}
      aria-label={ariaLabel}
      icon={<Icon />}
      {...__css}
      {...buttonProps}
    />
  )
})

export const SelectedList = memo(({ children, ...props }) => {
  const { __css, selectedItems, multi, ...selectedListProps } = useSelectedList(
    props
  )

  return (
    <Box {...__css} {...selectedListProps}>
      {multi &&
        selectedItems?.map((selectedItem: any, index: number) => (
          <SelectedItem
            key={`selected-item-${index}`}
            value={selectedItem}
            index={index}
          />
        ))}
      {children}
    </Box>
  )
})

export const SelectCombobox = memo((props) => {
  const { __css, ...comboboxProps } = useSelectCombobox(props)

  return (
    <HStack {...__css} {...comboboxProps}>
      <SelectToggleButton />
    </HStack>
  )
})

export const SelectControl = forwardRef<SelectControlProps, 'div'>(
  ({ children }, ref) => {
    const { ref: controlRef, __css } = useSelectControl({ ref })

    return (
      <Input ref={controlRef} as={HStack} {...__css}>
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
        <SelectedList>
          <SelectInput />
        </SelectedList>
        <SelectCombobox />
      </SelectControl>
      <SelectList />
    </Select>
  )
}
