import { mode } from '@chakra-ui/theme-tools'

const parts = [
  'item',
  'list',
  'control',
  'input',
  'button',
  'groupTitle',
  'divider'
]

function baseStyleList(props: Record<string, any>) {
  return {
    bg: mode(`#fff`, `gray.700`)(props),
    boxShadow: mode(`sm`, `dark-lg`)(props),
    color: 'inherit',
    w: 'full',
    py: '2',
    zIndex: 1,
    borderRadius: 'md',
    borderWidth: '1px'
  }
}

function baseStyleItem(props: Record<string, any>) {
  return {
    py: '0.4rem',
    px: '0.8rem',
    cursor: 'pointer',
    transition: 'background 50ms ease-in 0s',
    _focus: {
      bg: mode(`gray.100`, `whiteAlpha.100`)(props)
    },
    _active: {
      bg: mode(`gray.200`, `whiteAlpha.200`)(props)
    },
    _expanded: {
      bg: mode(`gray.100`, `whiteAlpha.100`)(props)
    },
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed'
    }
  }
}

function baseStyleSelectedItem(props: Record<string, any>) {
  return {
    borderRadius: 'full',
    variant: 'solid',
    colorscheme: props.colorscheme
  }
}

function baseStyleButton(props: Record<string, any>) {
  return {
    variant: 'ghost',
    colorscheme: props.colorscheme
  }
}

const baseStyleControl = (props: Record<string, any>) => ({
  minH: props.theme.components.Input.sizes[props.size || 'md'].h,
  h: 'auto'
})

const baseStyleInput = (_props: Record<string, any>) => ({
  appearance: 'none',
  outline: 0
})

const baseStyleGroupTitle = {
  mx: 4,
  my: 2,
  fontWeight: 'semibold',
  fontSize: 'sm'
}

const baseStyleDivider = {
  border: 0,
  borderBottom: '1px solid',
  borderColor: 'inherit',
  my: '0.5rem',
  opacity: 0.6
}

const baseStyle = (props: Record<string, any>) => ({
  list: baseStyleList(props),
  item: baseStyleItem(props),
  button: baseStyleButton(props),
  selectedItem: baseStyleSelectedItem(props),
  control: baseStyleControl(props),
  input: baseStyleInput(props),
  groupTitle: baseStyleGroupTitle,
  divider: baseStyleDivider
})

export default {
  parts,
  baseStyle
}
