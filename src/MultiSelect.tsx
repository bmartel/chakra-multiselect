import {
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
  Button,
  MenuProps,
  InputProps
} from '@chakra-ui/react'
import { ReactNode } from 'react'

export interface MultiSelectProps
  extends Omit<MenuProps, 'children' | 'variant' | 'size'>,
    Omit<InputProps, 'size' | 'variant'> {
  children?: ReactNode
  isLazy?: true
  closeOnSelect?: false
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  isLazy = true,
  closeOnSelect = false
}) => {
  return (
    <Menu closeOnSelect={closeOnSelect} isLazy={isLazy}>
      <MenuButton as={Button} colorScheme='blue'>
        MenuItem
      </MenuButton>
      <MenuList minWidth='240px'>
        <MenuOptionGroup defaultValue='asc' title='Order' type='radio'>
          <MenuItemOption value='asc'>Ascending</MenuItemOption>
          <MenuItemOption value='desc'>Descending</MenuItemOption>
        </MenuOptionGroup>
        <MenuDivider />
        <MenuOptionGroup title='Country' type='checkbox'>
          <MenuItemOption value='email'>Email</MenuItemOption>
          <MenuItemOption value='phone'>Phone</MenuItemOption>
          <MenuItemOption value='country'>Country</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}
