import {
  memo,
  FC,
  MutableRefObject,
  ReactNode,
  useCallback,
  useMemo,
  Fragment,
} from 'react'
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
  useStyles,
} from '@chakra-ui/react'
import { mergeRefs } from '@chakra-ui/react-utils'
import {
  SelectProvider,
  useSelect,
  useSelectItem,
  useSelectLabel,
  UseSelectProps,
  idFromOption,
  labelFromValue,
  SelectionVisibilityMode,
  useClearButton,
  useSelectContext,
  SelectRemoveValue,
  Option,
  GetOption,
  SelectSetOpen,
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
  popperRef: MutableRefObject<any>
  controlRef: MutableRefObject<any>
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

export interface SelectedItemProps extends TagProps, SelectItem {
  removeValue: SelectRemoveValue
}

export interface MultiSelectProps extends Omit<SelectProps, 'children'> {
  children?: ReactNode
}

export const ChakraSvg = chakra('svg')

export const StyledSelect = memo<SelectProps>((props) => {
  const { children } = props

  const styles = useMultiStyleConfig('MultiSelect', props)
  const ownProps = omitThemingProps(props)
  const ctx = useSelect(ownProps as any)
  const context = useMemo(() => ctx, [ctx])

  return (
    <StylesProvider value={styles}>
      <SelectProvider value={context}>
        <chakra.div pos='relative'>{children}</chakra.div>
      </SelectProvider>
    </StylesProvider>
  )
})
StyledSelect.displayName = 'StyledSelect'

export const SelectLabel = memo<HTMLChakraProps<'label'>>((props) => {
  const labelProps = useSelectLabel()

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

export const SelectList = memo<{
  value: Option[]
  getOption: GetOption
  popperRef: MutableRefObject<any>
  optionsRef: MutableRefObject<any>
  isOpen: boolean
}>(
  ({
    value: visibleOptions,
    getOption,
    popperRef,
    optionsRef,
    isOpen: dropdownVisible,
    ...props
  }) => {
    const styles = useStyles()
    const __listCss = styles.list
    const __css = useMemo(
      () => ({
        listStyle: 'none',
        position: 'absolute',
        ...(!dropdownVisible && { display: 'none' }),
        ...__listCss,
      }),
      [dropdownVisible, __listCss]
    )
    const ref = useMemo(() => mergeRefs(optionsRef, popperRef), [])

    const optionItemProps = useCallback((option, index) => {
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
        ref={ref}
        __css={__css}
        aria-orientation='vertical'
        role='listbox'
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
  }
)
SelectList.displayName = 'SelectList'

export const SelectOptionGroup: FC<SelectOptionGroupProps> = (props) => {
  return <MenuOptionGroup {...props} />
}

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

export const SelectInput = memo<{ getInputProps: () => any }>(
  ({ getInputProps }) => {
    const styles = useStyles()
    const __css = styles.input as any
    const inputProps = getInputProps()

    return <chakra.input __css={__css} {...inputProps} />
  }
)
SelectInput.displayName = 'SelectInput'

export const SelectedItem = memo<SelectedItemProps>(
  ({ value, removeValue, ...props }) => {
    const styles = useStyles()
    const __css = styles.selectedItem as any
    const onClick = useCallback(() => removeValue(value), [value])

    return (
      <Tag {...__css} {...props}>
        <TagLabel>{value}</TagLabel>
        <TagCloseButton onClick={onClick} />
      </Tag>
    )
  }
)
SelectedItem.displayName = 'SelectedItem'

export const SelectToggleButton = memo<
  ButtonProps & {
    isOpen: boolean
    setOpen: SelectSetOpen
    ariaLabel?: string
    Icon?: FC
  }
>(
  ({
    isOpen,
    setOpen,
    Icon = SelectToggleIcon,
    size = 'sm',
    ariaLabel = 'toggle menu',
    ...props
  }) => {
    const styles = useStyles()
    const __css = useMemo(
      () => ({
        ...styles.button,
        ...(isOpen && (styles.button as any))?._active,
      }),
      [isOpen, styles.button]
    )

    const onClick = useCallback(
      (e) => {
        e.preventDefault()
        e.stopPropagation()
        ;(setOpen as any)((o: any) => !o)
      },
      [setOpen]
    )

    const ToggleIcon: FC = useCallback(
      () => (
        <Icon
          isActive={isOpen}
          __css={{
            transitionDuration: '200ms',
            transitionProperty: 'transform',
            _active: { transform: 'rotate(180deg)' },
          }}
        />
      ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [isOpen]
    )

    return (
      <IconButton
        tabIndex={0}
        size={size}
        aria-label={ariaLabel}
        aria-haspopup={true}
        aria-expanded={isOpen}
        icon={ToggleIcon}
        onClick={onClick}
        {...__css}
        {...props}
      />
    )
  }
)
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

export const SelectedList = memo<{
  value: string[]
  multi: boolean
  selectionVisibleIn: SelectionVisibilityMode
  removeValue: SelectRemoveValue
  children?: ReactNode
}>(
  ({
    children,
    value: selectedItems,
    removeValue,
    multi,
    selectionVisibleIn,
    ...props
  }) => {
    const styles = useStyles()
    const __listCss = styles.selectedList as any
    const __textCss = styles.textList as any

    return (
      <Box {...__listCss} {...props}>
        {multi && // Both || Input
          selectionVisibleIn !== SelectionVisibilityMode.List &&
          selectedItems?.map((selectedItem: any) => (
            <SelectedItem
              key={`selected-item-${selectedItem}`}
              value={selectedItem}
              removeValue={removeValue}
            />
          ))}
        {multi && // List only
          selectionVisibleIn === SelectionVisibilityMode.List &&
          !!selectedItems?.length && (
            <Box {...__textCss}>{selectedItems?.join(', ')}</Box>
          )}
        {children}
      </Box>
    )
  }
)
SelectedList.displayName = 'SelectedList'

export const SelectActionGroup = memo<{
  isOpen: boolean
  setOpen: SelectSetOpen
  clearAll: () => void
  clearable: boolean
}>(({ isOpen, setOpen, clearAll, clearable, ...props }) => {
  const styles = useStyles()
  const __css = styles.actionGroup as any

  const clearOnClick = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    clearAll()
  }, [])

  return (
    <HStack {...__css} {...props}>
      {clearable && <SelectClearButton onClick={clearOnClick} />}
      <SelectToggleButton isOpen={isOpen} setOpen={setOpen} />
    </HStack>
  )
})
SelectActionGroup.displayName = 'SelectActionGroup'

export const SelectControl = memo(
  forwardRef<SelectControlProps, 'div'>(
    ({ children, popperRef, controlRef }, _ref) => {
      const ref = useMemo(() => mergeRefs(_ref, controlRef, popperRef), [])
      const styles = useStyles()
      const __css = styles.control as any

      return (
        <Input ref={ref} as={HStack} {...__css}>
          {children}
        </Input>
      )
    }
  )
)
SelectControl.displayName = 'SelectControl'

export const StyledMultiSelect = memo(() => {
  const {
    clearable,
    clearAll,
    getInputProps,
    value,
    removeValue,
    multi,
    selectionVisibleIn,
    controlRef,
    optionsRef,
    popper,
    visibleOptions,
    getOption,
    isOpen,
    setOpen,
  } = useSelectContext()
  return (
    <Fragment>
      <SelectControl
        popperRef={popper.referenceRef as any}
        controlRef={controlRef}
      >
        <SelectedList
          value={value}
          removeValue={removeValue}
          multi={multi}
          selectionVisibleIn={selectionVisibleIn}
        >
          <SelectInput getInputProps={getInputProps} />
        </SelectedList>
        <SelectActionGroup
          isOpen={isOpen}
          setOpen={setOpen}
          clearable={clearable}
          clearAll={clearAll}
        />
      </SelectControl>
      <SelectList
        value={visibleOptions}
        popperRef={popper.popperRef as any}
        optionsRef={optionsRef}
        getOption={getOption}
        isOpen={isOpen}
      />
    </Fragment>
  )
})
StyledMultiSelect.displayName = 'StyledMultiSelect'

export const MultiSelect = memo<MultiSelectProps>(({ label, ...props }) => {
  return (
    <StyledSelect {...props}>
      {label && <SelectLabel>{label}</SelectLabel>}
      <StyledMultiSelect />
    </StyledSelect>
  )
})
MultiSelect.displayName = 'MultiSelect'
