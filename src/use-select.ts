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
  value?: any
  options?: any[]
  size?: string | number
  initialSelectedItems: any[]
  hasDivider?: boolean
}

export interface UseSelectReturnValue<T = any>
  extends Partial<UseMultipleSelectionReturnValue<T>>,
    Partial<UseComboboxReturnValue<T>> {
  popper: UsePopperReturn
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

export const useSelect = <T = any>(
  {
    options = [],
    initialSelectedItems = [],
    placement = 'bottom-start',
    hasDivider = true
  }: UseSelectProps = {
    options: [],
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
        (typeof item === 'string' ? item : item.label)
          .toLowerCase()
          .startsWith(inputValue.toLowerCase())
    )

  const filteredItems = getFilteredItems(options)

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
    items: filteredItems,
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
  const { getInputProps, getDropdownProps, isOpen } = useSelectContext()
  const styles = useStyles()

  return {
    ...props,
    ...getInputProps!(getDropdownProps!({ preventKeyAction: isOpen })),
    __css: styles.input
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
