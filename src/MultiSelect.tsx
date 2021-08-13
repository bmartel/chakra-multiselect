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
  TagProps,
  StackProps,
  ButtonProps,
} from '@chakra-ui/react'
import { memo, ReactNode, useCallback, useMemo } from 'react'
import {
  SelectProvider,
  useSelect,
  useSelectButton,
  useSelectActionGroup,
  useSelectControl,
  useSelectInput,
  useSelectedItem,
  useSelectItem,
  useSelectLabel,
  useSelectList,
  useSelectedList,
  UseSelectProps,
  idFromOption,
  labelFromValue,
  SelectedProvider,
  SelectInputProvider,
  SelectedListProvider,
  SelectActionProvider,
  SelectionVisibilityMode,
  useClearButton,
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

export type SelectListProps = MenuListProps
export type SelectOptionGroupProps = MenuOptionGroupProps
export interface SelectOptionItemProps extends HTMLChakraProps<'li'> {
  highlighted?: boolean
  label?: string
  index: number
  selected?: boolean
  created?: boolean
}

export interface SelectedItemProps extends TagProps, SelectItem {}

export interface MultiSelectProps extends Omit<SelectProps, 'children'> {
  children?: ReactNode
}

export const ChakraSvg = chakra('svg')

export const Select: React.FC<SelectProps> = (props) => {
  const { children } = props

  const styles = useMultiStyleConfig('MultiSelect', props)
  const ownProps = omitThemingProps(props)

  const ctx = useSelect(ownProps as any)
  const context = useMemo(() => ctx, [ctx])
  const selectInputContext = useMemo(
    () => ({ getInputProps: ctx.getInputProps }),
    [ctx.getInputProps]
  )
  const selectedContext = useMemo(
    () => ({ removeValue: ctx.removeValue }),
    [ctx.removeValue]
  )
  const selectedListContext = useMemo(
    () => ({
      value: ctx.value,
      multi: ctx.multi,
      selectionVisibleIn: ctx.selectionVisibleIn,
    }),
    [ctx.value, ctx.multi, ctx.selectionVisibleIn]
  )
  const selectActionContext = useMemo(
    () => ({
      isOpen: ctx.isOpen,
      setOpen: ctx.setOpen,
      clearable: ctx.clearable,
      clearAll: ctx.clearAll,
    }),
    [ctx.isOpen, ctx.setOpen, ctx.clearable, ctx.clearAll]
  )

  return (
    <StylesProvider value={styles}>
      <SelectProvider value={context}>
        <SelectInputProvider value={selectInputContext}>
          <SelectedListProvider value={selectedListContext}>
            <SelectedProvider value={selectedContext}>
              <SelectActionProvider value={selectActionContext}>
                <chakra.div pos='relative'>{children}</chakra.div>
              </SelectActionProvider>
            </SelectedProvider>
          </SelectedListProvider>
        </SelectInputProvider>
      </SelectProvider>
    </StylesProvider>
  )
}

export const SelectLabel = memo<HTMLChakraProps<'label'>>((props) => {
  const labelProps = useSelectLabel()

  return <chakra.label {...props} {...labelProps} />
})
SelectLabel.displayName = 'SelectLabel'

export const SelectOptionLabel = memo<
  StackProps & { label: string; created: boolean }
>(({ label, created }) => (
  <HStack justifyContent='space-between' w='full'>
    <Box>{label}</Box>
    {!!created && (
      <Tag flexShrink={0}>
        <TagLabel fontSize='xs' fontWeight='bold'>
          New
        </TagLabel>
      </Tag>
    )}
  </HStack>
))
SelectOptionLabel.displayName = 'SelectOptionLabel'

export const SelectOptionItem = memo<SelectOptionItemProps>(
  ({ value, label, index, selected, created, ...props }) => {
    const { highlightedRef, option, ...itemProps } = useSelectItem({
      value,
      label,
      index,
      selected,
    })

    return (
      <chakra.li
        ref={highlightedRef && highlightedRef}
        {...props}
        {...itemProps}
      >
        <SelectOptionLabel label={option?.label || value} created={!!created} />
      </chakra.li>
    )
  }
)

export const SelectList = memo(() => {
  const {
    __css,
    visibleOptions,
    isOpen,
    getOption,
    ref: listRef,
    ...listProps
  } = useSelectList({})

  const dropdownVisible = !!(isOpen && visibleOptions.length)
  const optionItemProps = useCallback(
    (option, index) => {
      const optionItem = getOption(option)
      return {
        key: optionItem.id || idFromOption(optionItem, 'option-'),
        value: optionItem.value,
        label: optionItem.label || labelFromValue(optionItem.value),
        selected: optionItem.selected,
        created: optionItem.created,
        index,
      }
    },
    [getOption]
  )

  return (
    <chakra.ul
      ref={listRef}
      __css={{
        listStyle: 'none',
        position: 'absolute',
        ...(!dropdownVisible && { display: 'none' }),
        ...__css,
      }}
      {...listProps}
    >
      {dropdownVisible &&
        visibleOptions.map((item: any, index: number) => {
          const { key: itemKey, ...restItemProps } = optionItemProps(
            item,
            index
          )
          return <SelectOptionItem key={itemKey} {...restItemProps} />
        })}
    </chakra.ul>
  )
})

export const SelectOptionGroup: React.FC<SelectOptionGroupProps> = (props) => {
  return <MenuOptionGroup {...props} />
}

const SelectToggleIcon: React.FC<
  HTMLChakraProps<'svg'> & { isActive?: boolean }
> = ({ isActive, width = '1.25rem', height = '1.25rem', __css, ...props }) => (
  <ChakraSvg
    viewBox='0 0 24 24'
    width={width}
    height={height}
    __css={{
      ...__css,
      ...(isActive && ((__css as any)?._active as any)),
    }}
    {...props}
  >
    <path
      fill='currentColor'
      d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z'
    />
  </ChakraSvg>
)

const SelectClearIcon: React.FC<
  HTMLChakraProps<'svg'> & { isActive?: boolean }
> = ({ width = '1.25rem', height = '1.25rem', ...props }) => (
  <ChakraSvg
    viewBox='0 0 24 24'
    stroke='currentColor'
    fill='none'
    width={width}
    height={height}
    {...props}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
    />
  </ChakraSvg>
)

export const SelectInput = memo((props) => {
  const inputProps = useSelectInput(props)

  return <chakra.input {...inputProps} />
})
SelectInput.displayName = 'SelectInput'

export const SelectedItem = memo<SelectedItemProps>(({ value, ...props }) => {
  const { onClick, __css, ...itemProps } = useSelectedItem({
    value,
    ...props,
  })

  return (
    <Tag {...__css} {...itemProps}>
      <TagLabel>{value}</TagLabel>
      <TagCloseButton onClick={onClick} />
    </Tag>
  )
})
SelectedItem.displayName = 'SelectedItem'

export const SelectToggleButton = memo<ButtonProps>((props) => {
  const {
    __css,
    size = 'sm',
    ariaLabel = 'toggle menu',
    Icon = SelectToggleIcon,
    isOpen,
    ...buttonProps
  } = useSelectButton(props)

  return (
    <IconButton
      tabIndex={0}
      size={size}
      aria-label={ariaLabel}
      icon={
        <Icon
          isActive={isOpen}
          __css={{
            transitionDuration: '200ms',
            transitionProperty: 'transform',
            _active: { transform: 'rotate(180deg)' },
          }}
        />
      }
      {...__css}
      {...buttonProps}
    />
  )
})
SelectToggleButton.displayName = 'SelectToggleButton'

export const SelectClearButton = memo<ButtonProps>((props) => {
  const {
    __css,
    size = 'sm',
    ariaLabel = 'clear all selected',
    Icon = SelectClearIcon,
    ...buttonProps
  } = useClearButton(props)

  return (
    <IconButton
      tabIndex={0}
      size={size}
      aria-label={ariaLabel}
      icon={<Icon />}
      {...__css}
      {...buttonProps}
    />
  )
})
SelectClearButton.displayName = 'SelectClearButton'

export const SelectedList = memo(({ children, ...props }) => {
  const {
    __css,
    textList,
    selectedItems,
    multi,
    selectionVisibleIn,
    ...selectedListProps
  } = useSelectedList(props)

  return (
    <Box {...__css} {...selectedListProps}>
      {multi && // Both || Input
        selectionVisibleIn !== SelectionVisibilityMode.List &&
        selectedItems?.map((selectedItem: any) => (
          <SelectedItem
            key={`selected-item-${selectedItem}`}
            value={selectedItem}
          />
        ))}
      {multi && // List only
        selectionVisibleIn === SelectionVisibilityMode.List &&
        !!selectedItems?.length && (
          <Box {...textList?.__css}>{selectedItems?.join(', ')}</Box>
        )}
      {children}
    </Box>
  )
})
SelectedList.displayName = 'SelectedList'

export const SelectActionGroup = memo((props) => {
  const { __css, clearable, clearOnClick, ...toggleActionProps } =
    useSelectActionGroup(props)

  return (
    <HStack {...__css} {...toggleActionProps}>
      {clearable && <SelectClearButton onClick={clearOnClick} />}
      <SelectToggleButton />
    </HStack>
  )
})
SelectActionGroup.displayName = 'SelectActionGroup'

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
        <SelectActionGroup />
      </SelectControl>
      <SelectList />
    </Select>
  )
}
