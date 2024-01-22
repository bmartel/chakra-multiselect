import {
  render,
  fireEvent,
  userEvent,
  act,
  waitFor,
  within,
} from '../test-helpers'
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
const optionsWithIdValues = options.map((option) => ({
  ...option,
  value: `${option.value.slice(0, 1)}-${option.value.slice(2, 3)}`,
}))

const StatefulMultiSelect: React.FC<
  Omit<MultiSelectProps, 'onChange' | 'value'> &
    Partial<Pick<MultiSelectProps, 'onChange' | 'value'>>
> = ({ onChange: _onChange, value: _value, options: __options, ...props }) => {
  const {
    value,
    options: options_,
    onChange,
  } = useMultiSelect({
    value: _value || props.single ? '' : [],
    options: __options!,
    onChange: _onChange,
  })

  return (
    <MultiSelect
      value={value}
      options={options_}
      onChange={onChange!}
      {...props}
    />
  )
}

describe('MultiSelect', () => {
  beforeEach(() => {
    userEvent.setup()
  })

  it('Correctly renders', () => {
    const { getByLabelText, queryByRole, queryByText } = render(
      <MultiSelect label='select an item' onChange={() => null} />
    )

    const toggleButton = getByLabelText('toggle menu')

    expect(toggleButton.getAttribute('aria-haspopup')).toBe('true')
    expect(toggleButton.getAttribute('aria-expanded')).toBe('false')
    expect(queryByText('select an item')).toBeInTheDocument()

    expect(queryByRole('listbox')).toBeNull()
  })

  it('Can toggle the list of options open and closed', async () => {
    const { getByLabelText, queryByRole } = render(
      <MultiSelect label='select an item' onChange={() => null} />
    )

    expect(getByLabelText('toggle menu').getAttribute('aria-expanded')).toBe(
      'false'
    )
    expect(queryByRole('listbox')).toBeNull()

    await act(async () => {
      fireEvent.click(getByLabelText('toggle menu'))
    })

    await waitFor(() => {
      expect(getByLabelText('toggle menu').getAttribute('aria-expanded')).toBe(
        'true'
      )
      expect(queryByRole('listbox')).toBeVisible()
    })

    // await act(async () => {
    fireEvent.click(getByLabelText('toggle menu'))
    // })

    await waitFor(() => {
      expect(getByLabelText('toggle menu').getAttribute('aria-expanded')).toBe(
        'false'
      )
      expect(queryByRole('listbox')).toBeNull()
    })

    const input = getByLabelText('select an item')

    await act(async () => {
      fireEvent.click(input)
    })

    expect(getByLabelText('toggle menu').getAttribute('aria-expanded')).toBe(
      'true'
    )
    expect(queryByRole('listbox')).toBeVisible()
  })

  it('Can select an option', async () => {
    const { getByRole, getByLabelText, queryByRole, queryAllByRole } = render(
      <StatefulMultiSelect label='select an item' options={options} />
    )

    const input = getByLabelText('select an item') as HTMLInputElement

    await act(async () => {
      fireEvent.click(input)
    })
    await act(async () => {
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

    await act(async () => {
      fireEvent.click(selection)
    })

    await waitFor(() => {
      expect(input.value).toBe('')
      const selected = queryByRole('listitem')

      expect(selected?.textContent).toBe('Roentgenium')
      expect(
        queryAllByRole('option').find((o) => o.textContent === 'Roentgenium')
      ).toBeFalsy()
    })
  })

  it('receives no results found message when search yields no value', async () => {
    const { getByText, getByLabelText } = render(
      <StatefulMultiSelect label='select an item' options={options} />
    )

    const input = getByLabelText('select an item') as HTMLInputElement

    await act(async () => {
      userEvent.type(input, 'abcdef')
    })

    await waitFor(() => {
      getByText('No results found')
    })
  })

  it('receives custom no results found message when search yields no value and emptyResultsLabel is provided', async () => {
    const emptyResultsLabel = 'Nothing Found!'
    const listProps = { emptyResultsLabel }

    const { getByText, getByLabelText } = render(
      <StatefulMultiSelect
        label='select an item'
        listProps={listProps}
        options={options}
      />
    )

    const input = getByLabelText('select an item') as HTMLInputElement

    await act(async () => {
      userEvent.type(input, 'abcdef')
    })

    await waitFor(() => {
      getByText(emptyResultsLabel)
    })
  })

  it('Can select multiple options', async () => {
    const { queryAllByRole, getByLabelText } = render(
      <StatefulMultiSelect label='select an item' options={options} />
    )

    const input = getByLabelText('select an item') as HTMLInputElement

    await act(async () => {
      userEvent.type(input, 'Roe')
    })

    await waitFor(() => {
      expect(input.value).toBe('Roe')
      within(document.querySelector('[role="listbox"]')!).getByText(
        'Roentgenium'
      )
    })

    await act(async () => {
      fireEvent.click(
        within(document.querySelector('[role="listbox"]')!).getByText(
          'Roentgenium'
        )
      )
    })

    await act(async () => {
      userEvent.type(input, 'Tenn')
    })

    await waitFor(() => {
      expect(input.value).toBe('Tenn')
      within(document.querySelector('[role="listbox"]')!).getByText(
        'Tennessine'
      )
    })

    await act(async () => {
      fireEvent.click(
        within(document.querySelector('[role="listbox"]')!).getByText(
          'Tennessine'
        )
      )
    })

    await waitFor(() => {
      const selected = queryAllByRole('listitem')

      expect(selected?.length).toBe(2)

      const expected = ['Roentgenium', 'Tennessine']
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

    await act(async () => {
      userEvent.type(input, 'Roe')
    })

    await waitFor(() => {
      expect(input.value).toBe('Roe')
      within(document.querySelector('[role="listbox"]')!).getByText(
        'Roentgenium'
      )
    })

    await act(async () => {
      fireEvent.click(
        within(document.querySelector('[role="listbox"]')!).getByText(
          'Roentgenium'
        )
      )
    })
    await act(async () => {
      userEvent.click(input)
    })
    await act(async () => {
      userEvent.keyboard('{backspace}')
    })
    await act(async () => {
      userEvent.type(input, 'Tenn')
    })

    await waitFor(() => {
      expect(input.value).toBe('Tenn')
      within(document.querySelector('[role="listbox"]')!).getByText(
        'Tennessine'
      )
    })

    await act(async () => {
      fireEvent.click(
        within(document.querySelector('[role="listbox"]')!).getByText(
          'Tennessine'
        )
      )
    })

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
    })
    await act(async () => {
      fireEvent.input(input, {
        target: {
          value: 'Foobar',
        },
      })
    })
    await act(async () => {
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
    })
    await act(async () => {
      fireEvent.input(input, {
        target: {
          value: 'Foobar',
        },
      })
    })
    await act(async () => {
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

  it('Allows an optional filter function that can override the search filter behaviour of the options', async () => {
    const { queryAllByRole, getByLabelText } = render(
      <StatefulMultiSelect
        label='select an item'
        options={optionsWithIdValues}
        filterFn={(options, searchValue, getOption) => {
          return options.filter((value) => {
            return getOption(value)
              .label.toLocaleLowerCase()
              .includes(searchValue.toLocaleString().toLocaleLowerCase())
          })
        }}
      />
    )

    const input = getByLabelText('select an item') as HTMLInputElement

    await act(async () => {
      userEvent.type(input, 'Roe')
    })

    await waitFor(() => {
      expect(input.value).toBe('Roe')
      within(document.querySelector('[role="listbox"]')!).getByText(
        'Roentgenium'
      )
    })

    await act(async () => {
      fireEvent.click(
        within(document.querySelector('[role="listbox"]')!).getByText(
          'Roentgenium'
        )
      )
    })

    await act(async () => {
      userEvent.type(input, 'Tenn')
    })

    await waitFor(() => {
      expect(input.value).toBe('Tenn')
      within(document.querySelector('[role="listbox"]')!).getByText(
        'Tennessine'
      )
    })

    await act(async () => {
      fireEvent.click(
        within(document.querySelector('[role="listbox"]')!).getByText(
          'Tennessine'
        )
      )
    })

    await waitFor(() => {
      const selected = queryAllByRole('listitem')

      expect(selected?.length).toBe(2)

      const expected = ['Roentgenium', 'Tennessine']
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
})
