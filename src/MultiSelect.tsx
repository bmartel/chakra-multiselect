import {
  HTMLChakraProps,
  Input,
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
  useStyles,
  BoxProps,
  IconButtonProps,
} from '@chakra-ui/react'
import { FC, memo, ReactNode, useCallback, useMemo } from 'react'
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
    UseSelectProps {
  label?: string
  children?: ReactNode
}

export interface SelectControlProps
  extends Omit<HTMLChakraProps<'select'>, 'size'> {
  defaultIsOpen?: boolean
  isLazy?: true
  closeOnSelect?: false
  children?: ReactNode
}

export type SelectListProps = HTMLChakraProps<'ul'>
export type SelectedListProps = BoxProps
export type SelectLabelProps = HTMLChakraProps<'label'>
export interface SelectActionGroupProps extends StackProps {
  clearButtonProps?: IconButtonProps
  toggleButtonProps?: IconButtonProps
}

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
  labelProps?: SelectLabelProps
  controlProps?: SelectControlProps
  listProps?: SelectListProps
  selectedListProps?: SelectedListProps
  actionGroupProps?: SelectActionGroupProps
}

export const ChakraSvg = chakra('svg')

export const Select = memo<SelectProps>((props) => {
  const { children } = props

  const styles = useMultiStyleConfig('MultiSelect', props)
  const ownProps = omitThemingProps(props as any)

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
})
Select.displayName = 'Select'

export const SelectLabel = memo<SelectLabelProps>((props) => {
  const labelProps = useSelectLabel()

  return <chakra.label {...props} {...labelProps} />
})
SelectLabel.displayName = 'SelectLabel'

export const SelectOptionLabel = memo<
  StackProps & { label: string; created?: boolean }
>(({ label, created }) => (
  <HStack justifyContent='space-between' w='full' role='list'>
    <Box>{label}</Box>
    {!!created && (
      <Tag flexShrink={0}>
        <TagLabel fontSize='xs' fontWeight='bold' role='listitem'>
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
        role='option'
        {...(selected && { 'aria-selected': selected })}
        {...props}
        {...itemProps}
      >
        <SelectOptionLabel label={option?.label || value} created={!!created} />
      </chakra.li>
    )
  }
)
SelectOptionItem.displayName = 'SelectOptionItem'

export const EmptySelectResults = memo<{ label?: string }>(
  ({ label = 'No results found' }) => {
    const styles = useStyles()
    return (
      <chakra.li __css={styles.item}>
        <SelectOptionLabel label={label} />
      </chakra.li>
    )
  }
)
EmptySelectResults.displayName = 'EmptySelectResults'

export const SelectList = memo<SelectListProps>((props) => {
  const {
    __css,
    visibleOptions,
    isOpen,
    getOption,
    ref: listRef,
    ...listProps
  } = useSelectList()

  const dropdownVisible = isOpen
  const optionItemProps = useCallback((option: string, index: number) => {
    const optionItem = getOption(option) as any
    return {
      key: optionItem.id || idFromOption(optionItem, 'option-'),
      value: optionItem.value,
      label: optionItem.label || labelFromValue(optionItem.value),
      selected: optionItem.selected,
      created: optionItem.created,
      index,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <chakra.ul
      ref={listRef}
      __css={useMemo(
        () => ({
          listStyle: 'none',
          position: 'absolute',
          ...(!dropdownVisible && { display: 'none' }),
          ...__css,
        }),
        [dropdownVisible, __css]
      )}
      aria-orientation='vertical'
      role='listbox'
      {...listProps}
      {...props}
    >
      {dropdownVisible && visibleOptions.length > 0 ? (
        visibleOptions.map((item: any, index: number) => {
          const { key: itemKey, ...restItemProps } = optionItemProps(
            item,
            index
          )
          return <SelectOptionItem key={itemKey} {...restItemProps} />
        })
      ) : (
        <EmptySelectResults />
      )}
    </chakra.ul>
  )
})
SelectList.displayName = 'SelectList'

const SelectToggleIcon: FC<HTMLChakraProps<'svg'> & { isActive?: boolean }> = ({
  isActive,
  width = 4,
  height = 4,
  __css,
  ...props
}) => (
  <ChakraSvg
    viewBox='0 0 24 24'
    stroke='currentColor'
    fill='none'
    width={width}
    height={height}
    __css={{
      ...__css,
      ...(isActive && ((__css as any)?._active as any)),
    }}
    {...props}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M19 9l-7 7-7-7'
    />
  </ChakraSvg>
)

const SelectClearIcon: FC<HTMLChakraProps<'svg'> & { isActive?: boolean }> = ({
  width = 4,
  height = 4,
  ...props
}) => (
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
    <Tag {...(__css as any)} {...itemProps}>
      <TagLabel>{value}</TagLabel>
      <TagCloseButton onClick={onClick} />
    </Tag>
  )
})
SelectedItem.displayName = 'SelectedItem'

export const SelectToggleButton = memo<IconButtonProps>((props) => {
  const {
    __css,
    size = 'sm',
    ariaLabel = 'toggle menu',
    icon: Icon = SelectToggleIcon,
    isOpen,
    ...buttonProps
  } = useSelectButton(props)

  return (
    <IconButton
      tabIndex={0}
      size={size}
      aria-label={ariaLabel}
      aria-haspopup={true}
      aria-expanded={isOpen}
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

export const SelectClearButton = memo<IconButtonProps>((props) => {
  const {
    __css,
    size = 'sm',
    ariaLabel = 'clear all selected',
    icon: Icon = SelectClearIcon,
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

export const SelectedList = memo<SelectedListProps>(
  ({ children, ...props }) => {
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
  }
)
SelectedList.displayName = 'SelectedList'

export const SelectActionGroup = memo<SelectActionGroupProps>((props) => {
  const {
    __css,
    clearable,
    clearOnClick,
    clearButtonProps,
    toggleButtonProps,
    ...toggleActionProps
  } = useSelectActionGroup(props)

  return (
    <HStack {...__css} {...toggleActionProps}>
      {clearable && (
        <SelectClearButton onClick={clearOnClick} {...clearButtonProps} />
      )}
      <SelectToggleButton {...toggleButtonProps} />
    </HStack>
  )
})
SelectActionGroup.displayName = 'SelectActionGroup'

export const SelectControl = forwardRef<SelectControlProps, 'div'>(
  ({ children, ...props }, ref) => {
    const { ref: controlRef, __css } = useSelectControl({ ref })

    return (
      <Input ref={controlRef} as={HStack} {...__css} {...props}>
        {children}
      </Input>
    )
  }
)

export const MultiSelect: FC<MultiSelectProps> = ({
  label,
  labelProps,
  controlProps,
  listProps,
  selectedListProps,
  actionGroupProps,
  ...props
}) => {
  return (
    <Select {...props}>
      {label && <SelectLabel {...labelProps}>{label}</SelectLabel>}
      <SelectControl {...controlProps}>
        <SelectedList {...selectedListProps}>
          <SelectInput />
        </SelectedList>
        <SelectActionGroup {...actionGroupProps} />
      </SelectControl>
      <SelectList {...listProps} />
    </Select>
  )
}
