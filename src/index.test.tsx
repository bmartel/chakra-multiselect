import { render, fireEvent, act, waitFor } from '../test-helpers'
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
    const { getByLabelText, getByText, queryByRole, queryByText } = render(
      <MultiSelect label='select an item' onChange={() => null} />
    )

    const toggleButton = getByLabelText('toggle menu')

    expect(toggleButton.getAttribute('aria-haspopup')).toBe('true')
    expect(toggleButton.getAttribute('aria-expanded')).toBe('false')
    expect(queryByText('select an item')).toBeInTheDocument()
    getByText('No results found')

    expect(queryByRole('listbox')).toBeNull()
  })

  it('Can toggle the list of options open and closed', () => {
    const { getByLabelText, queryByRole } = render(
      <MultiSelect label='select an item' onChange={() => null} />
    )
    const toggleButton = getByLabelText('toggle menu')

    expect(toggleButton.getAttribute('aria-expanded')).toBe('false')
    expect(queryByRole('listbox')).toBeNull()

    fireEvent.click(toggleButton)

    expect(toggleButton.getAttribute('aria-expanded')).toBe('true')
    expect(queryByRole('listbox')).toBeVisible()

    fireEvent.click(toggleButton)

    expect(toggleButton.getAttribute('aria-expanded')).toBe('false')
    expect(queryByRole('listbox')).toBeNull()

    const input = getByLabelText('select an item')

    fireEvent.click(input)

    expect(toggleButton.getAttribute('aria-expanded')).toBe('true')
    expect(queryByRole('listbox')).toBeVisible()
  })

  it('Can select an option', async () => {
    const { getByRole, getByLabelText, queryByRole, queryAllByRole } = render(
      <StatefulMultiSelect label='select an item' options={options} />
    )

    const input = getByLabelText('select an item') as HTMLInputElement

    await act(async () => {
      fireEvent.click(input)
      fireEvent.input(input, {
        target: {
          value: 'Roe',
        },
      })
    })

    await waitFor(() => {
      expect(queryByRole('listbox')?.children.length).toBe(1)
      expect(queryByRole('option')?.textContent).toBe('Roentgenium')
    })

    const selection = getByRole('option')

    fireEvent.click(selection)

    await waitFor(() => {
      expect(input.value).toBe('')
      const selected = queryByRole('listitem')

      expect(selected?.textContent).toBe('roentgenium')
      expect(
        queryAllByRole('option').find((o) => o.textContent === 'Roentgenium')
      ).toBeFalsy()
    })
  })

  it('Can select multiple options', async () => {
    const { queryAllByRole, getByLabelText } = render(
      <StatefulMultiSelect label='select an item' options={options} />
    )

    const input = getByLabelText('select an item') as HTMLInputElement

    fireEvent.click(input)
    fireEvent.click(
      queryAllByRole('option')?.find(
        (o) => o.textContent === 'Roentgenium'
      ) as HTMLElement
    )

    fireEvent.click(input)
    fireEvent.click(
      queryAllByRole('option')?.find(
        (o) => o.textContent === 'Tennessine'
      ) as HTMLElement
    )

    await waitFor(() => {
      const selected = queryAllByRole('listitem')

      expect(selected?.length).toBe(2)

      const expected = ['roentgenium', 'tennessine']
      selected.forEach((s, i) => {
        const value = s.textContent

        expect(value).toBe(expected[i])

        expect(
          queryAllByRole('option').find(
            (o) => o.textContent?.toLowerCase() === value
          )
        ).toBeFalsy()
      })
    })
  })

  it('Can only select one option in single mode', async () => {
    const { queryAllByRole, getByLabelText } = render(
      <StatefulMultiSelect label='select an item' options={options} single />
    )

    const input = getByLabelText('select an item') as HTMLInputElement

    fireEvent.click(input)
    fireEvent.click(
      queryAllByRole('option')?.find(
        (o) => o.textContent === 'Roentgenium'
      ) as HTMLElement
    )

    fireEvent.click(input)
    fireEvent.click(
      queryAllByRole('option')?.find(
        (o) => o.textContent === 'Tennessine'
      ) as HTMLElement
    )

    await waitFor(() => {
      const selected = queryAllByRole('listitem')

      expect(selected?.length).toBe(0)
      expect(input.value).toBe('Tennessine')
    })
  })

  it('Can create an option when create mode is on', async () => {
    const { queryAllByRole, getByLabelText } = render(
      <StatefulMultiSelect label='select an item' options={options} create />
    )

    const input = getByLabelText('select an item') as HTMLInputElement

    await act(async () => {
      fireEvent.click(input)
      fireEvent.input(input, {
        target: {
          value: 'Foobar',
        },
      })
      fireEvent.keyDown(input, {
        key: 'Enter',
      })
    })

    await waitFor(() => {
      const selected = queryAllByRole('listitem')

      expect(selected?.length).toBe(1)

      const expected = ['Foobar']
      selected.forEach((s, i) => {
        const value = s.textContent

        expect(value).toBe(expected[i])

        expect(
          queryAllByRole('option').find(
            (o) => o.textContent?.toLowerCase() === value
          )
        ).toBeFalsy()
      })
    })
  })

  it('Can create options in single mode when create mode is on', async () => {
    const { queryAllByRole, getByLabelText } = render(
      <StatefulMultiSelect
        label='select an item'
        options={options}
        single
        create
      />
    )

    const input = getByLabelText('select an item') as HTMLInputElement

    await act(async () => {
      fireEvent.click(input)
      fireEvent.input(input, {
        target: {
          value: 'Foobar',
        },
      })
      fireEvent.keyDown(input, {
        key: 'Enter',
      })
    })

    await waitFor(() => {
      const selected = queryAllByRole('listitem')

      expect(selected?.length).toBe(0)
      expect(input.value).toBe('Foobar')
    })
  })
})
