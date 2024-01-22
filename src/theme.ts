import { mode } from '@chakra-ui/theme-tools'

const parts = [
  'item',
  'selectedItem',
  'list',
  'textList',
  'selectedList',
  'actionGroup',
  'control',
  'input',
  'button',
  'groupTitle',
  'divider',
  'label',
]

// eslint-disable-next-line
function baseStyleList(props: Record<string, any>, m?: typeof mode) {
  return {
    bg: m!(`#fff`, `gray.700`)(props),
    boxShadow: m!(`sm`, `dark-lg`)(props),
    color: 'inherit',
    w: 'full',
    py: '2',
    zIndex: 1,
    borderRadius: 'md',
    borderWidth: '1px',
    maxH: '64',
    overflowY: 'auto',
    overscrollBehaviorY: 'contain',
  }
}

const baseStyleSelectedList = {
  display: 'flex',
  flex: 1,
  flexWrap: 'wrap',
  alignItems: 'center',
}

const baseStyleLabel = {
  display: 'block',
  textAlign: 'start',
}

// eslint-disable-next-line
function baseStyleItem(props: Record<string, any>, m?: typeof mode) {
  return {
    cursor: 'pointer',
    transition: 'background 50ms ease-out',
    _focus: {
      bg: m!(`gray.50`, `whiteAlpha.100`)(props),
      boxShadow: 'outline',
    },
    _active: {
      bg: m!(`gray.50`, `whiteAlpha.100`)(props),
    },
    _expanded: {
      bg: m!(`gray.50`, `whiteAlpha.100`)(props),
    },
    _selected: {
      bg: m!(`gray.100`, `whiteAlpha.300`)(props),
    },
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  }
}

// eslint-disable-next-line
function baseStyleSelectedItem(props: Record<string, any>, _m?: typeof mode) {
  return {
    borderRadius: 'full',
    variant: 'solid',
    colorscheme: props.colorscheme,
  }
}

// eslint-disable-next-line
function baseStyleButton(props: Record<string, any>, m?: typeof mode) {
  return {
    variant: 'ghost',
    _hover: {
      bg: m!(`gray.200`, `whiteAlpha.300`)(props),
    },
    _focus: {
      bg: m!(`gray.200`, `whiteAlpha.300`)(props),
      boxShadow: 'outline',
    },
    _active: {
      bg: m!(`gray.100`, `whiteAlpha.100`)(props),
    },
    colorscheme: props.colorscheme,
  }
}

const baseStyleControl = {
  h: 'auto',
  minW: 72,
  pr: 1,
}

// eslint-disable-next-line
const baseStyleInput = (_props: Record<string, any>, _m?: typeof mode) => ({
  bgColor: 'transparent',
  appearance: 'none',
  flex: 1,
  outline: 0,
})

const baseStyleActionGroup = {
  display: 'flex',
  alignItems: 'center',
}

const baseStyleGroupTitle = {
  fontWeight: 'semibold',
}

const baseStyleDivider = {
  display: 'inline',
  h: 'full',
  border: 0,
  borderColor: 'inherit',
  my: 1,
  opacity: 0.8,
}

// eslint-disable-next-line
const baseStyle = (props: Record<string, any>) => ({
  list: baseStyleList(props, mode),
  selectedList: baseStyleSelectedList,
  item: baseStyleItem(props, mode),
  selectedItem: baseStyleSelectedItem(props, mode),
  button: baseStyleButton(props, mode),
  actionGroup: baseStyleActionGroup,
  control: baseStyleControl,
  input: baseStyleInput(props, mode),
  groupTitle: baseStyleGroupTitle,
  divider: baseStyleDivider,
  label: baseStyleLabel,
})

export const sizes = {
  sm: {
    control: {
      minH: 8,
      spacing: 1,
    },
    input: {
      p: 'px',
    },
    actionGroup: {
      spacing: '0',
    },
    list: {
      fontSize: 'sm',
    },
    item: {
      py: 1,
      px: 2,
    },
    textList: {
      py: 0,
      px: 1,
    },
    selectedItem: {
      m: 'px',
    },
    selectedList: {
      py: 'px',
    },
    groupTitle: {
      mx: 2,
      my: 1,
      fontSize: 'sm',
    },
  },
  md: {
    control: {
      minH: 10,
      spacing: 1,
    },
    input: {
      p: '2px',
    },
    actionGroup: {
      spacing: '0',
    },
    list: {
      fontSize: 'md',
    },
    item: {
      py: 2,
      px: 3,
    },
    textList: {
      p: 1,
    },
    selectedItem: {
      m: '2px',
    },
    selectedList: {
      py: '2px',
    },
    groupTitle: {
      mx: 4,
      my: 2,
      fontSize: 'sm',
    },
  },
  lg: {
    control: {
      minH: 12,
      spacing: 2,
    },
    input: {
      p: 1,
    },
    actionGroup: {
      spacing: '0',
    },
    list: {
      fontSize: 'lg',
    },
    item: {
      py: 2,
      px: 3,
    },
    textList: {
      py: 1,
      px: 2,
    },
    selectedItem: {
      m: 1,
    },
    selectedList: {
      py: 1,
    },
    groupTitle: {
      mx: 4,
      my: 2,
      fontSize: 'sm',
    },
  },
}

export default {
  defaultProps: {
    size: 'md',
  },
  parts,
  sizes,
  baseStyle,
}
