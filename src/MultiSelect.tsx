import {
  HTMLChakraProps,
  Menu,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
  MenuProps,
  forwardRef,
  useMenuButton,
  Input,
  MenuListProps,
  MenuOptionGroupProps,
  MenuItemOptionProps,
  MenuDividerProps
} from '@chakra-ui/react'
import { ReactNode } from 'react'

// @see https://github.com/chakra-ui/chakra-ui/issues/140

export interface SelectProps
  extends Omit<HTMLChakraProps<'select'>, 'size'>,
    Omit<MenuProps, 'children'> {
  defaultIsOpen?: boolean
  isLazy?: true
  closeOnSelect?: false
  children: ReactNode
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
export interface SelectDividerProps extends MenuDividerProps {}
export interface SelectOptionGroupProps extends MenuOptionGroupProps {}
export interface SelectOptionItemProps extends MenuItemOptionProps {}

export const Select: React.FC<SelectProps> = (props) => {
  return <Menu {...props} />
}

export const SelectList: React.FC<SelectListProps> = (props) => {
  return <MenuList {...props} />
}

export const SelectOptionGroup: React.FC<SelectOptionGroupProps> = (props) => {
  return <MenuOptionGroup {...props} />
}

export const SelectOptionItem: React.FC<SelectOptionItemProps> = (props) => {
  return <MenuItemOption {...props} />
}

export const SelectDivider: React.FC<SelectDividerProps> = (props) => {
  return <MenuDivider {...props} />
}

export const SelectControl = forwardRef<SelectControlProps, 'input'>(
  (props, ref) => {
    const { children, as: As, ...rest } = props

    const inputProps = useMenuButton(rest, ref)

    const Element = As || Input

    return <Element {...inputProps} {...props} />
  }
)

export interface MultiSelectProps extends Omit<SelectProps, 'children'> {
  children?: ReactNode
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  isLazy = true,
  closeOnSelect = false,
  maxW,
  ...props
}) => {
  return (
    <Select closeOnSelect={closeOnSelect} isLazy={isLazy} {...props}>
      <SelectControl maxW={maxW} />
      <SelectList minWidth='240px'>
        <SelectOptionGroup defaultValue='asc' title='Order' type='radio'>
          <SelectOptionItem value='asc'>Ascending</SelectOptionItem>
          <SelectOptionItem value='desc'>Descending</SelectOptionItem>
        </SelectOptionGroup>
        <SelectDivider />
        <SelectOptionGroup title='Country' type='checkbox'>
          <SelectOptionItem value='email'>Email</SelectOptionItem>
          <SelectOptionItem value='phone'>Phone</SelectOptionItem>
          <SelectOptionItem value='country'>Country</SelectOptionItem>
        </SelectOptionGroup>
      </SelectList>
    </Select>
  )
}
