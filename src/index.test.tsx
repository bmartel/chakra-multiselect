import { render, screen, fireEvent, act, waitFor } from '../test-helpers'
import { MultiSelect, MultiSelectProps, useMultiSelect } from '.'

const items = [
  'Neptunium',
  'Plutonium',
  'Americium',
  'Curium',
  'Berkelium',
  'Californium',
  'Einsteinium',
  'Fermium',
  'Mendelevium',
  'Nobelium',
  'Lawrencium',
  'Rutherfordium',
  'Dubnium',
  'Seaborgium',
  'Bohrium',
  'Hassium',
  'Meitnerium',
  'Darmstadtium',
  'Roentgenium',
  'Copernicium',
  'Nihonium',
  'Flerovium',
  'Moscovium',
  'Livermorium',
  'Tennessine',
  'Oganesson',
]

const options = items.map((label) => ({ label, value: label.toLowerCase() }))

const StatefulMultiSelect: React.FC<
  Omit<MultiSelectProps, 'onChange' | 'value'> &
  Partial<Pick<MultiSelectProps, 'onChange' | 'value'>>
> = ({ onChange: _onChange, value: _value, options: __options, ...props }) => {
  const { value, options, onChange } = useMultiSelect({
    value: _value || props.single ? '' : [],
    options: __options!,
    onChange: _onChange,
  })

  return (
    <MultiSelect
      value={value}
      options={options}
      onChange={onChange!}
      {...props}
    />
  )
}

describe('MultiSelect', () => {
  it('Correctly renders', () => {
    render(<MultiSelect label='select an item' onChange={() => null} />)

    const toggleButton = screen.getByLabelText('toggle menu')

    expect(toggleButton.getAttribute('aria-haspopup')).toBe('true')
    expect(toggleButton.getAttribute('aria-expanded')).toBe('false')
    expect(screen.queryByText('select an item')).toBeInTheDocument()
    screen.getByText('No results found')

    expect(screen.queryByRole('listbox')).toBeNull()
  })

  it('Can toggle the list of options open and closed', () => {
    render(<MultiSelect label='select an item' onChange={() => null} />)

    const toggleButton = screen.getByLabelText('toggle menu')

    expect(toggleButton.getAttribute('aria-expanded')).toBe('false')
    expect(screen.queryByRole('listbox')).toBeNull()

    fireEvent.click(toggleButton)

    expect(toggleButton.getAttribute('aria-expanded')).toBe('true')
    expect(screen.queryByRole('listbox')).toBeVisible()

    fireEvent.click(toggleButton)

    expect(toggleButton.getAttribute('aria-expanded')).toBe('false')
    expect(screen.queryByRole('listbox')).toBeNull()

    const input = screen.getByLabelText('select an item')

    fireEvent.click(input)

    expect(toggleButton.getAttribute('aria-expanded')).toBe('true')
    expect(screen.queryByRole('listbox')).toBeVisible()
  })

  it('Can select an option', async () => {

    render(<StatefulMultiSelect label='select an item' options={options} />)

    const input = screen.getByLabelText('select an item')


    await act(async () => {
      fireEvent.click(input)
      fireEvent.input(input, {
        target: {
          value: "Roe"
        }
      })
    })

    await waitFor(() => {
      expect(screen.queryByRole('listbox')?.children.length).toBe(1)
      expect(screen.queryByRole('option')?.textContent).toBe("Roentgenium")

    })

  })
})
