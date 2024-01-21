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
import {
  FC,
  JSXElementConstructor,
  memo,
  ReactNode,
  useCallback,
  useMemo,
} from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
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
  useId,
  SelectIdProvider,
} from './use-select'

// @see https://github.com/chakra-ui/chakra-ui/issues/140

export type SelectIconButtonProps = Omit<IconButtonProps, 'icon'> & {
  icon?: JSXElementConstructor<any>
}
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

export type SelectListProps = HTMLChakraProps<'ul'> & Pick<SelectProps, 'size'>
export type SelectedListProps = BoxProps & {
  size?: SelectProps['size']
  selectedItems?: SelectItem[]
  value?: string | string[]
  multi?: boolean
  selectionVisibleIn?: SelectionVisibilityMode
  textList?: BoxProps
}
export type SelectLabelProps = HTMLChakraProps<'label'> &
  Pick<SelectProps, 'size'>
export interface SelectActionGroupProps
  extends StackProps,
    Pick<SelectProps, 'size'> {
  size?: SelectProps['size']
  disabled?: boolean
  clearButtonProps?: SelectIconButtonProps
  toggleButtonProps?: SelectIconButtonProps
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

  const selectLabelId = useId()
  const selectInputId = useId()

  const selectIdContext = useMemo(
    () => ({
      selectLabelId,
      selectInputId,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

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
      <SelectIdProvider value={selectIdContext}>
        <SelectProvider value={context}>
          <SelectInputProvider value={selectInputContext}>
            <SelectedListProvider value={selectedListContext}>
              <SelectedProvider value={selectedContext}>
                <SelectActionProvider value={selectActionContext}>
                  <chakra.div
                    pos='relative'
                    display='flex'
                    flexDirection='column'
                  >
                    {children}
                  </chakra.div>
                </SelectActionProvider>
              </SelectedProvider>
            </SelectedListProvider>
          </SelectInputProvider>
        </SelectProvider>
      </SelectIdProvider>
    </StylesProvider>
  )
})
Select.displayName = 'Select'

export const SelectLabel = memo<SelectLabelProps>((props) => {
  const labelProps = useSelectLabel(props)

  return <chakra.label {...props} {...labelProps} />
})
SelectLabel.displayName = 'SelectLabel'

export const SelectOptionLabel = memo<
  StackProps & { label: string; created?: boolean }
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
    const { highlightedRef, option, multi, ...itemProps } = useSelectItem({
      value,
      label,
      index,
      selected,
    })

    return (
      <chakra.li
        ref={highlightedRef && highlightedRef}
        role='option'
        {...((selected || multi) && { 'aria-selected': !!selected })}
        {...props}
        {...itemProps}
      >
        <SelectOptionLabel label={option?.label || value} created={!!created} />
      </chakra.li>
    )
  }
)
SelectOptionItem.displayName = 'SelectOptionItem'

export type SelectOptionVirtualItemProps = {
  index: number
  start: number
  size: number
  item: SelectItem
  optionItemProps: (value: any, index: number) => any
}

export const SelectOptionVirtualItem = memo<SelectOptionVirtualItemProps>(
  ({ index, size, start, item, optionItemProps, ...rest }: any) => {
    return (
      <SelectOptionItem
        {...optionItemProps(item.value, index)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: `${size}px`,
          transform: `translateY(${start}px)`,
        }}
        selected={item.selected}
        created={item.created}
        label={item.label}
        {...rest}
      />
    )
  }
)
SelectOptionVirtualItem.displayName = 'SelectOptionVirtualItem'

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
    optionsRef: parentRef,
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

  const estimatedSize = useMemo(() => {
    if (props.size === 'lg') return 43
    if (props.size === 'sm') return 29
    return 40
  }, [props.size])

  // Virtualize the list data
  const rowVirtualizer = useVirtualizer({
    count: visibleOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimatedSize,
  })

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
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem: any) => (
            <SelectOptionVirtualItem
              key={virtualItem.key}
              optionItemProps={optionItemProps}
              item={visibleOptions[virtualItem.index]}
              index={virtualItem.index}
              size={virtualItem.size}
              start={virtualItem.start}
            />
          ))}
        </div>
      ) : dropdownVisible ? (
        <EmptySelectResults />
      ) : null}
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

export const SelectInput = memo<Pick<SelectProps, 'size' | 'disabled'>>(
  (props) => {
    const inputProps = useSelectInput(props)

    return <chakra.input {...inputProps} />
  }
)
SelectInput.displayName = 'SelectInput'

export const SelectedItem = memo<SelectedItemProps>(
  ({ value: _value, label: _label, ...props }) => {
    const { onClick, __css, value, label, ...itemProps } = useSelectedItem({
      value: _value,
      label: _label || '',
      key: props.key || ('' as any),
      ...props,
    })

    const tagSizeProps =
      {
        sm: {
          fontSize: 'sm',
        },
        md: {
          fontSize: 'md',
        },
        lg: {
          fontSize: 'lg',
        },
      }[props.size || ('md' as any)] || {}

    return (
      <Tag
        size={props.size}
        {...tagSizeProps}
        {...(__css as any)}
        {...itemProps}
        role='listitem'
      >
        <TagLabel>{label || value}</TagLabel>
        <TagCloseButton onClick={onClick} />
      </Tag>
    )
  }
)
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

  const sizeProps =
    {
      sm: {
        height: '6',
        width: '6',
      },
      md: {
        height: '8',
        width: '8',
      },
      lg: {
        height: '10',
        width: '10',
      },
    }[size] || {}

  return (
    <IconButton
      tabIndex={0}
      size={size}
      aria-label={ariaLabel}
      aria-haspopup={true}
      aria-expanded={!props.disabled && isOpen}
      icon={
        <Icon
          isActive={!props.disabled && isOpen}
          __css={
            !props.disabled
              ? {
                  transitionDuration: '200ms',
                  transitionProperty: 'transform',
                  _active: { transform: 'rotate(180deg)' },
                }
              : undefined
          }
        />
      }
      minWidth={0}
      {...sizeProps}
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

  const sizeProps =
    {
      sm: {
        height: '6',
        width: '6',
      },
      md: {
        height: '8',
        width: '8',
      },
      lg: {
        height: '10',
        width: '10',
      },
    }[size] || {}

  return (
    <IconButton
      tabIndex={0}
      size={size}
      aria-label={ariaLabel}
      icon={<Icon />}
      minWidth={0}
      {...sizeProps}
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

    const shownAsTagList =
      multi && selectionVisibleIn !== SelectionVisibilityMode.List
    const shownAsText =
      multi && selectionVisibleIn === SelectionVisibilityMode.List

    return (
      <Box
        {...__css}
        {...(selectedListProps as any)}
        {...(shownAsTagList ? { role: 'list' } : null)}
      >
        {shownAsTagList &&
          selectedItems?.map(
            (selectedItem: { value: string; label?: string }) => (
              <SelectedItem
                size={props.size}
                key={`selected-item-${selectedItem.value}`}
                value={selectedItem.value}
                label={selectedItem.label}
              />
            )
          )}
        {shownAsText && !!selectedItems?.length && (
          <Box aria-current='true' {...(textList?.__css as any)}>
            {selectedItems
              ?.map(({ label }: { value: string; label: string }) => label)
              .join(', ')}
          </Box>
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
        <SelectClearButton
          size={props.size}
          onClick={clearOnClick}
          {...clearButtonProps}
        />
      )}
      <SelectToggleButton
        size={props.size}
        disabled={props.disabled}
        {...toggleButtonProps}
      />
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
  size = 'md',
  ...props
}) => {
  return (
    <Select size={size} {...props}>
      {label && (
        <SelectLabel size={size} {...labelProps}>
          {label}
        </SelectLabel>
      )}
      <SelectControl size={size} disabled={props.disabled} {...controlProps}>
        <SelectedList size={size} {...selectedListProps}>
          <SelectInput size={size} disabled={props.disabled} />
        </SelectedList>
        <SelectActionGroup
          size={size}
          disabled={props.disabled}
          {...actionGroupProps}
        />
      </SelectControl>
      <SelectList size={size} {...listProps} />
    </Select>
  )
}
