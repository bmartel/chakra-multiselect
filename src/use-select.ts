import {
  useCombobox,
  useMultipleSelection,
  UseMultipleSelectionReturnValue,
  UseComboboxReturnValue
} from 'downshift'
import { createContext } from './utils'
import { useState } from 'react'

export interface UseSelectReturnValue<T = any>
  extends Partial<UseMultipleSelectionReturnValue<T>>,
    Partial<UseComboboxReturnValue<T>> {
  getFilteredItems: (items: any[]) => any[]
  inputValue: any
  setInputValue: (input: any) => void
}

const [SelectProvider, useSelectContext] = createContext<UseSelectReturnValue>({
  strict: false,
  name: 'SelectContext'
})

export { SelectProvider, useSelectContext }

export const useSelect = <T = any>(
  { items = [], initialSelectedItems = [] } = {
    items: [],
    initialSelectedItems: []
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
  return {
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
    getFilteredItems
  }
}
