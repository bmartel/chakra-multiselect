import { render, screen, fireEvent } from '../test-helpers'
import { MultiSelect } from '.'

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
  })
})
