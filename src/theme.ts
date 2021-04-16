import { mode } from '@chakra-ui/theme-tools'

const parts = [
  'item',
  'selectedItem',
  'list',
  'selectedList',
  'combobox',
  'control',
  'input',
  'button',
  'groupTitle',
  'divider',
  'label'
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
    borderWidth: '1px',
    maxH: '64',
    overflowY: 'auto'
  }
}

const baseStyleSelectedList = {
  d: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center'
}

const baseStyleLabel = {
  fontSize: 'md',
  marginEnd: 3,
  mb: 2,
  fontWeight: 'medium',
  transition: 'all 0.2s',
  opacity: 1,
  _disabled: {
    opacity: 0.4
  }
}

function baseStyleItem(props: Record<string, any>) {
  return {
    cursor: 'pointer',
    transition: 'background 50ms ease-out',
    _focus: {
      bg: mode(`gray.100`, `whiteAlpha.100`)(props)
    },
    _active: {
      bg: mode(`gray.100`, `whiteAlpha.100`)(props)
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
    _hover: {
      bg: 'transparent'
    },
    _focus: {
      bg: 'transparent'
    },
    _active: {
      bg: 'transparent'
    },
    colorscheme: props.colorscheme
  }
}

const baseStyleControl = {
  h: 'auto'
}

const baseStyleInput = (_props: Record<string, any>) => ({
  bgColor: 'transparent',
  appearance: 'none',
  flex: 1,
  outline: 0
})

const baseStyleCombobox = {
  d: 'flex',
  alignItems: 'center'
}

const baseStyleGroupTitle = {
  fontWeight: 'semibold'
}

const baseStyleDivider = {
  d: 'inline',
  h: 'full',
  border: 0,
  borderColor: 'inherit',
  my: 1,
  opacity: 0.8
}

const baseStyle = (props: Record<string, any>) => ({
  list: baseStyleList(props),
  selectedList: baseStyleSelectedList,
  item: baseStyleItem(props),
  selectedItem: baseStyleSelectedItem(props),
  button: baseStyleButton(props),
  combobox: baseStyleCombobox,
  control: baseStyleControl,
  input: baseStyleInput(props),
  groupTitle: baseStyleGroupTitle,
  divider: baseStyleDivider,
  label: baseStyleLabel
})

export const sizes = {
  sm: {
    control: {
      minH: 8,
      px: 1,
      spacing: 1
    },
    input: {
      m: 'px'
    },
    combobox: {
      spacing: '1'
    },
    item: {
      py: 1,
      px: 2
    },
    selectedItem: {
      m: 'px'
    },
    selectedList: {
      py: 'px'
    },
    groupTitle: {
      mx: 2,
      my: 1,
      fontSize: 'sm'
    }
  },
  md: {
    control: {
      minH: 10,
      px: 1,
      spacing: 1
    },
    input: {
      m: '2px'
    },
    combobox: {
      spacing: '1'
    },
    item: {
      py: 2,
      px: 3
    },
    selectedItem: {
      m: '2px'
    },
    selectedList: {
      py: '2px'
    },
    groupTitle: {
      mx: 4,
      my: 2,
      fontSize: 'sm'
    }
  },
  lg: {
    control: {
      minH: 12,
      px: 2,
      spacing: 2
    },
    input: {
      m: 1
    },
    combobox: {
      spacing: '2'
    },
    item: {
      py: 2,
      px: 3
    },
    selectedItem: {
      m: 1
    },
    selectedList: {
      py: 1
    },
    groupTitle: {
      mx: 4,
      my: 2,
      fontSize: 'sm'
    }
  }
}

export default {
  defaultProps: {
    size: 'md'
  },
  parts,
  sizes,
  baseStyle
}
