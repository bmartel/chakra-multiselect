import { useMemo, useState } from 'react'
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
  UseComboboxReturnValue
} from 'downshift'
import { createContext } from './utils'

export interface UseSelectProps extends UsePopperProps {
  items?: any[]
  initialSelectedItems: any[]
  hasDivider?: boolean
}

export interface UseSelectReturnValue<T = any>
  extends Partial<UseMultipleSelectionReturnValue<T>>,
    Partial<UseComboboxReturnValue<T>> {
  popper: UsePopperReturn
  items: any[]
  getFilteredItems: (items: any[]) => any[]
  inputValue: any
  setInputValue: (input: any) => void
  hasDivider?: boolean
}

const [SelectProvider, useSelectContext] = createContext<UseSelectReturnValue>({
  strict: false,
  name: 'SelectContext'
})

export { SelectProvider, useSelectContext }

export const useSelect = <T = any>(
  {
    items = [],
    initialSelectedItems = [],
    placement = 'bottom-start',
    hasDivider = true
  }: UseSelectProps = {
    items: [],
    initialSelectedItems: [],
    placement: 'bottom-start'
  }
): UseSelectReturnValue<T> => {
  const [inputValue, setInputValue] = useState('')
  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems
  } = useMultipleSelection<any>({ initialSelectedItems })
  const getFilteredItems = (items: any[]) =>
    items.filter(
      (item) =>
        selectedItems.indexOf(item) < 0 &&
        item.toLowerCase().startsWith(inputValue.toLowerCase())
    )
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectItem
  } = useCombobox({
    inputValue,
    items: getFilteredItems(items),
    onStateChange: ({ inputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue as any)
          break
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (selectedItem) {
            setInputValue('')
            addSelectedItem(selectedItem)
            selectItem(null)
          }
          break
        default:
          break
      }
    }
  })

  const popper = usePopper({
    placement
  })

  return {
    items,
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
    getFilteredItems,
    popper
  }
}

export function useSelectList(props: any = {}) {
  const {
    isOpen,
    getMenuProps,
    getFilteredItems,
    popper,
    items
  } = useSelectContext()
  const { ref: menuRef, ...menuProps } = getMenuProps!()
  const styles = useStyles()
  return {
    ...props,
    ...menuProps,
    isOpen,
    getFilteredItems,
    items,
    ...useMemo(
      () => ({
        ref: mergeRefs(props.ref, menuRef, popper.popperRef),
        __css: styles.list
      }),
      [props.ref, menuRef, styles.list, popper.popperRef]
    )
  }
}

export function useSelectInput(props: any = {}) {
  const { getInputProps, getDropdownProps, isOpen } = useSelectContext()
  const styles = useStyles()

  return {
    ...props,
    ...getInputProps!(getDropdownProps!({ preventKeyAction: isOpen })),
    ...useMemo(
      () => ({
        __css: styles.input
      }),
      [styles.input]
    )
  }
}

export function useSelectControl(props: any = {}) {
  const {
    isOpen,
    hasDivider,
    selectedItems,
    getSelectedItemProps,
    removeSelectedItem,
    getInputProps,
    getToggleButtonProps,
    getDropdownProps,
    getComboboxProps,
    popper
  } = useSelectContext()
  const styles = useStyles()

  return {
    ...props,
    hasDivider,
    selectedItems,
    getSelectedItemProps,
    removeSelectedItem,
    getInputProps,
    getToggleButtonProps,
    getDropdownProps,
    getComboboxProps,
    isOpen,
    ...useMemo(
      () => ({
        ref: mergeRefs(props.ref, popper.referenceRef),
        __css: styles.input
      }),
      [props.ref, styles.control, popper.referenceRef]
    )
  }
}

export function useSelectLabel(props: any = {}) {
  const { getLabelProps } = useSelectContext()
  return {
    ...props,
    ...getLabelProps!()
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
