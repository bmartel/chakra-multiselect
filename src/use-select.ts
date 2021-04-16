import {
  usePopper,
  UsePopperProps,
  UsePopperReturn,
  useStyles
} from '@chakra-ui/react'
import { createContext, mergeRefs, EventKeys } from '@chakra-ui/utils'
import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  MutableRefObject
} from 'react'

export interface Option {
  label: string
  value: string | number
}

export interface SelectState {
  searchValue: string
  resolvedSearchValue: string
  isOpen: boolean
  highlightedIndex: number
}

type AnyFunc = (...args: any[]) => any

export interface KeyMeta {
  key?: EventKeys
  keyCode?: EventKeys
  shift?: boolean
  meta?: boolean
}

export type KeyboardEventHandler = (e: KeyboardEvent) => void

export type KeyHandler = () => void

export type ScrollToIndex = (index: number) => void

export type GetDebounce = (options: Option[]) => number

export type SelectOnChange = (
  value: string | number | Array<string | number>,
  current?: string | number
) => void

export type SelectFilter = (
  options: Option[],
  searchValue: string | number
) => Option[]

export type SelectRemoveValue = (index: number) => void

export type SelectSetOpen = (open: boolean) => void

export type SelectSetSearch = (searchValue: string) => void

export type GetCreateLabel = (searchValue: string) => string

export enum SelectActions {
  SetOpen = 'setOpen', // eslint-disable-line
  SetSearch = 'setSearch', // eslint-disable-line
  HighlightIndex = 'highlightIndex' // eslint-disable-line
}

export type SelectStateUpdater = (
  updater: (old: SelectState) => SelectState,
  action: SelectActions
) => void

export type StateReducer = (
  old: SelectState,
  newState: SelectState,
  action: SelectActions
) => SelectState

const defaultMultiValue: any[] = []
const defaultOptions: Option[] = []

const initialState: SelectState = {
  searchValue: '',
  resolvedSearchValue: '',
  isOpen: false,
  highlightedIndex: 0
}

const defaultStateReducer: StateReducer = (_, newState) => newState
const defaultGetCreateLabel: GetCreateLabel = (d) => `Create "${d}"`
const defaultScrollToIndex: ScrollToIndex = () => {}
const defaultGetDebounce: GetDebounce = (options) =>
  options.length > 10000 ? 1000 : options.length > 1000 ? 200 : 0

const defaultFilterFn: SelectFilter = (options, searchValue) => {
  return options
    .filter((option) =>
      option.value
        .toString()
        .toLowerCase()
        .includes(searchValue.toString().toLowerCase())
    )
    .sort((a) => {
      return a.value
        .toString()
        .toLowerCase()
        .indexOf(searchValue.toString().toLowerCase())
    })
}

function useDebounce(fn: AnyFunc, time = 0) {
  const ref = useRef(null)
  const fnRef = useRef()

  fnRef.current = fn as any

  useEffect(() => {
    return () => {
      clearTimeout((ref.current as unknown) as number)
    }
  }, [time])

  return useCallback(
    async (...args) => {
      if (ref.current) {
        clearTimeout((ref.current as unknown) as number)
      }
      return new Promise((resolve, reject) => {
        ref.current = setTimeout(() => {
          ref.current = null
          try {
            resolve(((fnRef.current as unknown) as AnyFunc)(...args))
          } catch (err) {
            reject(err)
          }
        }, time) as any
      })
    },
    [time]
  )
}

function useHoistedState(
  initialState: SelectState,
  reducer: StateReducer
): [SelectState, SelectStateUpdater] {
  const reducerRef = useRef()
  ;(reducerRef.current as any) = reducer
  const [state, _setState] = useState(initialState)
  const setState = useCallback(
    (updater, action) => {
      if (!action) {
        throw new Error('An action type is required to update the state')
      }
      return _setState((old: SelectState) =>
        ((reducerRef.current as unknown) as StateReducer)(
          old,
          updater(old),
          action
        )
      )
    },
    [_setState]
  )
  return [state, setState]
}

const useKeys = (
  userKeys: {
    [K in EventKeys]: (opts: { shift: any; meta: any }, e?: any) => K | any
  }
) => {
  return ({ onKeyDown, ...rest } = {} as any) => {
    return {
      ...rest,
      onKeyDown: (e: KeyboardEvent) => {
        const { keyCode, key, shiftKey: shift, metaKey: meta } = e
        const handler = userKeys[key] || userKeys[keyCode]
        if (handler) {
          handler(
            {
              keyCode,
              key,
              shift,
              meta
            },
            e
          )
        }
        if (onKeyDown) {
          onKeyDown(e)
        }
      }
    }
  }
}

export interface UseSelectProps extends UsePopperProps {
  onChange: SelectOnChange
  multi?: boolean
  create?: boolean
  duplicates?: boolean
  options?: Option[]
  value?: any
  shiftAmount?: number
  getCreateLabel?: GetCreateLabel
  getDebounce?: GetDebounce
  stateReducer?: StateReducer
  scrollToIndex?: ScrollToIndex
  filterFn?: SelectFilter
}
export interface UseSelectReturn {
  value: any
  multi: boolean
  searchValue: string
  isOpen: boolean
  highlightedIndex: number
  selectedOption: Option
  visibleOptions: Option[]
  selectIndex: (index: number) => any
  highlightIndex: (value: any) => any
  removeValue: SelectRemoveValue
  setOpen: SelectSetOpen
  setSearch: SelectSetSearch
  popper: UsePopperReturn
  getInputProps: AnyFunc
  getOptionProps: AnyFunc
  optionsRef: MutableRefObject<any>
}

const [SelectProvider, useSelectContext] = createContext<UseSelectReturn>({
  strict: false,
  name: 'SelectContext'
})

export { SelectProvider, useSelectContext }

export function useSelect({
  multi,
  create,
  getCreateLabel = defaultGetCreateLabel,
  getDebounce = defaultGetDebounce,
  stateReducer = defaultStateReducer,
  filterFn = defaultFilterFn,
  scrollToIndex = defaultScrollToIndex,
  shiftAmount = 5,
  duplicates,
  options,
  value,
  onChange,
  placement = 'bottom-start'
}: UseSelectProps): UseSelectReturn {
  const [
    { searchValue, resolvedSearchValue, isOpen, highlightedIndex },
    setState
  ] = useHoistedState(initialState, stateReducer)

  // Refs

  const optionsRef = useRef()
  const inputRef = useRef()
  const onBlurRef = useRef({})
  const onChangeRef = useRef()
  const filterFnRef = useRef()
  const getCreateLabelRef = useRef()
  const scrollToIndexRef = useRef()

  const popper = usePopper({
    placement
  })

  ;(filterFnRef.current as any) = filterFn
  ;(scrollToIndexRef.current as any) = scrollToIndex
  ;(getCreateLabelRef.current as any) = getCreateLabel
  ;(onChangeRef.current as any) = onChange

  // Multi should always at least have an empty array as the value
  if (multi && typeof value === 'undefined') {
    value = defaultMultiValue
  }

  // If no options are provided, then use an empty array
  if (!options) {
    options = defaultOptions
  }

  const originalOptions = options

  // If multi and duplicates aren't allowed, filter out the
  // selected options from the options list
  options = useMemo(() => {
    if (multi && !duplicates) {
      return options?.filter((d) => !value.includes(d.value))
    }
    return options
  }, [options, value, duplicates, multi])

  // Compute the currently selected option(s)
  const selectedOption = useMemo(() => {
    if (!multi) {
      return (
        originalOptions.find((d) => d.value === value) || {
          label: value,
          value: value
        }
      )
    } else {
      return value.map(
        (val: string | number) =>
          originalOptions.find((d) => d.value === val) || {
            label: val,
            value: val
          }
      )
    }
  }, [multi, value, originalOptions])

  // If there is a search value, filter the options for that value
  // TODO: This is likely where we will perform async option fetching
  // in the future.
  options = useMemo(() => {
    if (resolvedSearchValue) {
      return (filterFnRef.current as any)?.(options, resolvedSearchValue)
    }
    return options
  }, [options, resolvedSearchValue])

  // If in create mode and we have a search value, fabricate
  // an option for that searchValue and prepend it to options
  options = useMemo(() => {
    if (create && searchValue) {
      return [
        {
          label: (getCreateLabelRef.current as any)?.(searchValue),
          value: searchValue
        },
        ...options!
      ]
    }
    return options
  }, [create, searchValue, options])

  // Actions

  const setOpen = useCallback(
    (newIsOpen) => {
      setState(
        (old) => ({
          ...old,
          isOpen: newIsOpen
        }),
        SelectActions.SetOpen
      )
    },
    [setState]
  )

  const setResolvedSearch = useDebounce((value) => {
    setState(
      (old) => ({
        ...old,
        resolvedSearchValue: value
      }),
      SelectActions.SetSearch
    )
  }, getDebounce(options!))

  const setSearch = useCallback(
    (value) => {
      setState(
        (old) => ({
          ...old,
          searchValue: value
        }),
        SelectActions.SetSearch
      )
      setResolvedSearch(value)
    },
    [setState, setResolvedSearch]
  )

  const highlightIndex = useCallback(
    (value) => {
      setState((old) => {
        return {
          ...old,
          highlightedIndex: Math.min(
            Math.max(
              0,
              typeof value === 'function' ? value(old.highlightedIndex) : value
            ),
            options!.length - 1
          )
        }
      }, SelectActions.HighlightIndex)
    },
    [options, setState]
  )

  const selectIndex = useCallback(
    (index) => {
      const option = options![index]
      if (option) {
        if (!multi) {
          ;(onChangeRef.current as any)?.(option.value)
        } else {
          if (duplicates || !value.includes(option.value)) {
            ;(onChangeRef.current as any)?.(
              [...value, option.value],
              option.value
            )
          }
        }
      }

      if (!multi) {
        setOpen(false)
      } else {
        setSearch('')
      }
    },
    [multi, options, duplicates, value, setOpen, setSearch]
  )

  const removeValue = useCallback(
    (index) => {
      ;(onChangeRef.current as any)(
        value.filter((_: string, i: number) => i !== index)
      )
    },
    [value]
  )

  // Handlers

  const handleSearchValueChange = (e: any) => {
    setSearch(e.target.value)
    setOpen(true)
  }

  const handleSearchClick = () => {
    if (!create || multi) {
      setSearch('')
    }
    setOpen(true)
  }

  const handleSearchFocus = () => handleSearchClick()

  // Prop Getters

  const ArrowUp = (defaultShift?: any, defaultMeta?: any) => (
    { shift, meta }: any,
    e: any
  ) => {
    e.preventDefault()
    const amount =
      defaultMeta || meta
        ? 1000000000000
        : defaultShift || shift
        ? shiftAmount - 1
        : 1
    setOpen(true)
    highlightIndex((old: number) => old - amount)
  }

  const ArrowDown = (defaultShift?: any, defaultMeta?: any) => (
    { shift, meta }: any,
    e: any
  ) => {
    e.preventDefault()
    const amount =
      defaultMeta || meta
        ? 1000000000000
        : defaultShift || shift
        ? shiftAmount - 1
        : 1
    setOpen(true)
    highlightIndex((old: number) => old + amount)
  }

  const Enter = (_: any, e: any) => {
    if (isOpen) {
      if (searchValue || options![highlightedIndex]) {
        e.preventDefault()
      }
      if (options![highlightedIndex]) {
        selectIndex(highlightedIndex)
      }
    }
  }

  const Escape = () => {
    setOpen(false)
  }

  const Tab = () => {
    setOpen(false)
  }

  const Backspace = () => {
    if (!multi || searchValue) {
      return
    }
    removeValue(value.length - 1)
  }

  const getKeyProps = useKeys({
    ArrowUp: ArrowUp(),
    ArrowDown: ArrowDown(),
    PageUp: ArrowUp(true),
    PageDown: ArrowDown(true),
    Home: ArrowUp(false, true),
    End: ArrowDown(false, true),
    Enter,
    Escape,
    Tab,
    Backspace
  } as any)

  const getInputProps = (
    {
      refKey = 'ref',
      ref,
      onChange,
      onFocus,
      onClick,
      onBlur,
      ...rest
    } = {} as any
  ) => {
    return getKeyProps({
      [refKey]: (el: HTMLElement) => {
        ;(inputRef.current as any) = el
        if (ref) {
          ref.current = el
        }
      },
      value:
        (isOpen ? searchValue : selectedOption ? selectedOption.label : '') ||
        '',
      onChange: (e: any) => {
        handleSearchValueChange(e)
        if (onChange) {
          onChange(e)
        }
      },
      onFocus: (e: any) => {
        handleSearchFocus()
        if (onFocus) {
          onFocus(e)
        }
      },
      onClick: (e: any) => {
        handleSearchClick()
        if (onClick) {
          onClick(e)
        }
      },
      onBlur: (e: any) => {
        if (onBlur) {
          e.persist()
          ;(onBlurRef.current as any).cb = onBlur
          ;(onBlurRef.current as any).event = e
        }
      },
      ...rest
    })
  }

  const getOptionProps = (
    { index, key = index, onClick, onMouseEnter, ...rest } = {} as any
  ) => {
    if (typeof index !== 'number' || index < 0) {
      throw new Error(
        `useSelect: The getOptionProps prop getter requires an index property, eg. 'getOptionProps({index: 1})'`
      )
    }

    return {
      key,
      ...rest,
      onClick: (e: any) => {
        selectIndex(index)
        if (onClick) {
          onClick(e)
        }
      },
      onMouseEnter: (e: any) => {
        highlightIndex(index)
        if (onMouseEnter) {
          onMouseEnter(e)
        }
      }
    }
  }

  // Effects

  // When the user clicks outside of the options box
  // while open, we need to close the dropdown
  useClickOutsideRef(
    isOpen,
    () => {
      setOpen(false)
    },
    optionsRef!
  )

  // When searching, activate the first option
  useEffect(() => {
    highlightIndex(0)
  }, [searchValue, highlightIndex])

  // When we open and close the options, set the highlightedIndex to 0
  useEffect(() => {
    highlightIndex(0)

    if (!isOpen && (onBlurRef.current as any)?.event) {
      ;(onBlurRef.current as any)?.cb((onBlurRef.current as any).event)
      ;(onBlurRef.current as any).event = null
    }
  }, [isOpen, highlightIndex])

  // When the highlightedIndex changes, scroll to that item
  useEffect(() => {
    ;(scrollToIndexRef.current as any)?.(highlightedIndex)
  }, [highlightedIndex])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        ;(inputRef.current as any)?.focus()
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, inputRef.current])

  return {
    multi: !!multi,
    optionsRef,
    popper,
    // State
    value,
    searchValue,
    isOpen,
    highlightedIndex,
    selectedOption,
    visibleOptions: options!,
    // Actions
    selectIndex,
    removeValue,
    setOpen,
    setSearch,
    highlightIndex,
    // Prop Getters
    getInputProps,
    getOptionProps
  }
}

function useClickOutsideRef(
  enable: boolean,
  fn: AnyFunc,
  userRef: MutableRefObject<any>
) {
  const localRef = useRef()
  const fnRef = useRef()

  ;(fnRef.current as any) = fn
  const elRef =
    userRef || ((localRef as unknown) as MutableRefObject<HTMLElement>)

  const handle = useCallback(
    (e) => {
      const isTouch = e.type === 'touchstart'
      if (e.type === 'click' && isTouch) {
        return
      }
      const el = elRef.current as HTMLElement
      if (el && !el.contains(e.target)) {
        ;(fnRef.current as any)(e)
      }
    },
    [elRef]
  )

  useEffect(() => {
    if (enable) {
      document.addEventListener('touchstart', handle, true)
      document.addEventListener('click', handle, true)
    }

    return () => {
      document.removeEventListener('touchstart', handle, true)
      document.removeEventListener('click', handle, true)
    }
  }, [enable, handle])
}

export function useSelectCombobox(props: any = {}) {
  const styles = useStyles()
  return {
    ...props,
    __css: styles.combobox
  }
}

export function useSelectInput(props: any = {}) {
  const { getInputProps } = useSelectContext()
  const styles = useStyles()

  // const onClick = useCallback(() => {
  //   if (openMenuOnInputFocus) {
  //     openMenu()
  //   }
  // }, [openMenuOnInputFocus, openMenu])

  return {
    ...props,
    ...getInputProps(),
    __css: styles.input
    // onClick
  }
}
export function useSelectLabel(props: any = {}) {
  // const {getLabelProps } = useSelectContext()
  const styles = useStyles()

  return {
    ...props,
    // ...useMemo(getLabelProps!, [getLabelProps]),
    __css: styles.label
  }
}

export function useSelectButton(props: any = {}) {
  const { isOpen, setOpen } = useSelectContext()
  const onClick = useCallback(() => setOpen(!isOpen), [setOpen, isOpen])
  const styles = useStyles()

  return {
    ...props,
    __css: styles.button,
    onClick
  }
}

export function useSelectedItem(props: any = {}) {
  const { removeValue } = useSelectContext()
  const styles = useStyles()

  const onClick = useCallback(() => removeValue(props.index), [
    props.index,
    removeValue
  ])

  return {
    key: props.value,
    onClick,
    __css: styles.selectedItem,
    ...props
  }
}

export function useSelectItem(props: any = {}) {
  const { getOptionProps, highlightedIndex } = useSelectContext()
  const styles = useStyles()
  const highlighted = highlightedIndex === props.index

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
      [getOptionProps, props.value, props.index, styles.item]
    )
  }
}

export function useSelectList(props: any = {}) {
  const { isOpen, optionsRef, popper, visibleOptions } = useSelectContext()
  const styles = useStyles()

  return {
    ...props,
    ref: mergeRefs(optionsRef, popper.popperRef),
    isOpen,
    visibleOptions,
    __css: styles.list
  }
}

export function useSelectedList(props: any = {}) {
  const { value: selectedItems, multi } = useSelectContext()
  const styles = useStyles()

  return {
    ...props,
    multi,
    selectedItems,
    __css: styles.selectedList
  }
}

export function useSelectControl(props: any = {}) {
  const { isOpen, popper } = useSelectContext()
  const styles = useStyles()

  return {
    ...props,
    ...useMemo(
      () => ({
        ref: mergeRefs(props.ref, popper.referenceRef)
      }),
      [props.ref, popper.referenceRef]
    ),
    isOpen,
    __css: styles.control
  }
}
