import { useCallback, useMemo, useState } from 'react'
import {
  usePopper,
  UsePopperProps,
  UsePopperReturn,
  useStyles
} from '@chakra-ui/react'
import { mergeRefs } from '@chakra-ui/utils'
import {
  useCombobox,
  useMultipleSelection,
  UseMultipleSelectionReturnValue,
  UseComboboxReturnValue,
  UseComboboxProps,
  UseMultipleSelectionProps,
  ControllerStateAndHelpers,
  StateChangeOptions,
  UseComboboxStateChangeTypes
} from 'downshift'

export interface UseComboboxStateChangeOptions<T = any>
  extends Omit<StateChangeOptions<T>, 'type'> {
  type: UseComboboxStateChangeTypes
}
export type OnStateChange<T = any> = (
  options: UseComboboxStateChangeOptions<T>,
  stateAndHelpers: ControllerStateAndHelpers<T>
) => void

export interface UseSelectProps<T = any>
  extends UsePopperProps,
    UseComboboxProps<T>,
    Omit<
      UseMultipleSelectionProps<T>,
      'itemToString' | 'onStateChange' | 'stateReducer'
    > {
  value?: any
  size?: string | number
  hasDivider?: boolean
  defaultIsOpen?: boolean
  openMenuOnInputFocus?: boolean
}

export interface UseSelectReturnValue<T = any>
  extends Partial<UseMultipleSelectionReturnValue<T>>,
    Partial<UseComboboxReturnValue<T>> {
  popper: UsePopperReturn
  closeMenu: () => void
  openMenu: () => void
  openMenuOnInputFocus?: boolean
  size?: string | number
  filteredItems: any[]
  inputValue: any
  setInputValue: (input: any) => void
  hasDivider?: boolean
}

const [SelectProvider, useSelectContext] = createContext<UseSelectReturnValue>({
  strict: false,
  name: 'SelectContext'
})

export { SelectProvider, useSelectContext }

export const useSelect = <T = any>({
  items: options = [],
  initialSelectedItems = [],
  placement = 'bottom-start',
  hasDivider = true,
  defaultIsOpen = false,
  openMenuOnInputFocus = true,
  id,
  labelId,
  menuId,
  toggleButtonId,
  defaultActiveIndex = 0,
  defaultInputValue,
  defaultSelectedItem,
  defaultSelectedItems,
  defaultHighlightedIndex = 0,
  itemToString,
  onSelectedItemChange,
  onSelectedItemsChange,
  onHighlightedIndexChange,
  onIsOpenChange,
  onInputValueChange,
  stateReducer,
  onStateChange
}: UseSelectProps): UseSelectReturnValue<T> => {
  const [inputValue, setInputValue] = useState('')
  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems
  } = useMultipleSelection<any>({
    defaultActiveIndex,
    defaultSelectedItems,
    initialSelectedItems,
    onSelectedItemsChange
  })

  const getFilteredItems = (items: any[]) =>
    items.filter(
      (item) =>
        selectedItems.indexOf(item) < 0 &&
        (typeof item === 'string' ? item : item.label)
          .toLowerCase()
          .startsWith(inputValue.toLowerCase())
    )

  const defaultOnstateChange: OnStateChange<T> = useCallback(
    ({ inputValue: onChangeInputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(onChangeInputValue as any)
          break
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          console.log(
            'type:enter',
            type === useCombobox.stateChangeTypes.InputKeyDownEnter
          )
          if (selectedItem || inputValue) {
            setInputValue('')
            addSelectedItem(selectedItem || inputValue)
            selectItem(null)
          }
          break
        default:
          break
      }
    },
    [inputValue]
  )

  const filteredItems = getFilteredItems(options)
  const onStateChangeCallback = onStateChange || defaultOnstateChange

  const comboboxProps: any = {
    id,
    labelId,
    menuId,
    toggleButtonId,
    defaultIsOpen,
    defaultInputValue,
    defaultSelectedItem,
    defaultHighlightedIndex,
    inputValue,
    items: filteredItems,
    onSelectedItemChange,
    onHighlightedIndexChange,
    onIsOpenChange,
    onInputValueChange: (change) => {
      console.log(change)
    },
    onStateChange: onStateChangeCallback as any
  }

  if (stateReducer) {
    comboboxProps.stateReducer = stateReducer
  }
  if (itemToString) {
    comboboxProps.itemToString = itemToString
  }

  const {
    isOpen,
    closeMenu,
    openMenu,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectItem
  } = useCombobox(comboboxProps)

  const popper = usePopper({
    placement
  })

  return {
    openMenuOnInputFocus,
    closeMenu,
    openMenu,
    filteredItems,
    hasDivider,
    inputValue,
    setInputValue,
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectItem,
    popper
  }
}

export function useSelectItem(props: any = {}) {
  const {
    getOptionProps,
    highlightedOption
    // selectedOption
  } = useSelectContext()
  const styles = useStyles()
  const highlighted = highlightedOption.value === props.value

  return {
    ...props,
    ...useMemo(
      () => ({
        ...getOptionProps!({
          option: { value: props.value },
          index: props.index
        }),
        __css: {
          ...styles.item,
          ...(highlighted && (styles.item as any))?._active
        }
      }),
      [getOptionProps, props.value, styles.item]
    )
  }
}

export function useSelectList(props: any = {}) {
  const { isOpen, getMenuProps, popper, filteredItems } = useSelectContext()
  const { ref: menuRef, ...menuProps } = getMenuProps!()
  const styles = useStyles()

  return {
    ...props,
    ...menuProps,
    ...useMemo(
      () => ({
        ref: mergeRefs(props.ref, menuRef, popper.popperRef)
      }),
      [props.ref, menuRef, popper.popperRef]
    ),
    isOpen,
    filteredItems,
    __css: styles.list
  }
}

export function useSelectedList(props: any = {}) {
  const { selectedItems } = useSelectContext()
  const styles = useStyles()

  return {
    ...props,
    selectedItems,
    __css: styles.selectedList
  }
}

export function useSelectInput(props: any = {}) {
  const {
    getInputProps,
    getDropdownProps,
    isOpen,
    openMenu,
    openMenuOnInputFocus
  } = useSelectContext()
  const styles = useStyles()

  const onClick = useCallback(() => {
    if (openMenuOnInputFocus) {
      openMenu()
    }
  }, [openMenuOnInputFocus, openMenu])

  return {
    ...props,
    ...getInputProps!(getDropdownProps!({ preventKeyAction: isOpen })),
    __css: styles.input,
    onClick
  }
}

export function useSelectCombobox(props: any = {}) {
  const { getComboboxProps } = useSelectContext()
  const styles = useStyles()

  return {
    ...props,
    ...useMemo(getComboboxProps!, [getComboboxProps]),
    __css: styles.combobox
  }
}

export function useSelectControl(props: any = {}) {
  const {
    getSelectedItemProps,
    removeSelectedItem,
    getInputProps,
    getToggleButtonProps,
    getDropdownProps,
    getComboboxProps,
    isOpen,
    popper
  } = useSelectContext()
  const styles = useStyles()

  return {
    ...props,
    ...useMemo(
      () => ({
        ref: mergeRefs(props.ref, popper.referenceRef)
      }),
      [props.ref, popper.referenceRef]
    ),
    getSelectedItemProps,
    removeSelectedItem,
    getInputProps,
    getToggleButtonProps,
    getDropdownProps,
    getComboboxProps,
    isOpen,
    __css: styles.control
  }
}

export function useSelectLabel(props: any = {}) {
  const { getLabelProps } = useSelectContext()
  const styles = useStyles()

  return {
    ...props,
    ...useMemo(getLabelProps!, [getLabelProps]),
    __css: styles.label
  }
}

export function useSelectDivider(props: any = {}) {
  const { hasDivider } = useSelectContext()
  const styles = useStyles()

  return {
    ...props,
    hasDivider,
    __css: styles.divider
  }
}

export function useSelectButton(props: any = {}) {
  const { getToggleButtonProps } = useSelectContext()
  const styles = useStyles()

  return {
    ...props,
    ...useMemo(getToggleButtonProps!, [getToggleButtonProps]),
    __css: styles.button
  }
}

export function useSelectItem(props: any = {}) {
  const { getItemProps, highlightedIndex } = useSelectContext()
  const styles = useStyles()
  const highlighted = highlightedIndex === props.index

  return {
    ...props,
    ...useMemo(
      () => ({
        ...getItemProps!({ item: props.item, index: props.index }),
        __css: {
          ...styles.item,
          ...(highlighted && (styles.item as any))?._active
        }
      }),
      [getItemProps, props.item, props.index, highlighted, styles.item]
    )
  }
}

export function useSelectedItem(props: any = {}) {
  const { getSelectedItemProps, removeSelectedItem } = useSelectContext()
  const styles = useStyles()

  return {
    ...props,
    ...useMemo(
      () =>
        getSelectedItemProps!({
          selectedItem: props.item,
          index: props.index
        }),
      [getSelectedItemProps, props.item, props.index]
    ),
    removeSelectedItem,
    __css: styles.selectedItem
  }
}
