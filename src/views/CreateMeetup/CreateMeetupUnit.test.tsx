import { getUserById } from '../../db'
import { renderWithRouter, mountWithPath } from '../../utils/testing-utils'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateMeetup from '.'

describe('Create Meetup unit tests', () => {
  const user = getUserById('1')

  it('renders Create Meetup page correctly (smoke test)', () => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(new Date(2021, 11, 24))

    const wrapper = mountWithPath(
      <CreateMeetup setMeetups={jest.fn()} user={user!} />,
      '/create',
      '/create'
    )

    expect(wrapper.find(CreateMeetup)).toMatchSnapshot()

    jest.useRealTimers()
  })
  it('renders a form with inputs and a submit button', () => {
    renderWithRouter(<CreateMeetup setMeetups={jest.fn()} user={user!} />)

    const createForm = screen.getByRole('form', { name: /create/ })

    expect(createForm).toBeInTheDocument()
  })
  it('renders empty inputs for title and description', () => {
    renderWithRouter(<CreateMeetup setMeetups={jest.fn()} user={user!} />)

    const titleInput = screen.getByRole('textbox', { name: /title/i })
    const descriptionInput = screen.getByRole('textbox', {
      name: /description/i,
    })

    expect(titleInput).toBeInTheDocument()
    expect(descriptionInput).toBeInTheDocument()
  })
  it('renders Datetimepicker with Christmas Eve 2021 as default', () => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(new Date(2021, 11, 24))

    renderWithRouter(<CreateMeetup setMeetups={jest.fn()} user={user!} />)

    const date = screen.getByLabelText('Date')

    expect(date).toHaveValue('2021-12-24T00:00')

    jest.useRealTimers()
  })
  it('renders unchecked checkbox for online event and empty text inputs for street and city', () => {
    renderWithRouter(<CreateMeetup setMeetups={jest.fn()} user={user!} />)

    const onlineCheckbox = screen.getByRole('checkbox', { name: /online/i })

    expect(onlineCheckbox).toBeInTheDocument()
    expect(onlineCheckbox).not.toBeChecked()

    const streetInput = screen.getByRole('textbox', { name: /street/i })
    const cityInput = screen.getByRole('textbox', { name: /city/i })

    expect(streetInput).toHaveTextContent('')
    expect(cityInput).toHaveTextContent('')
  })
  it('renders checked checkbox for max capacity and number input for max attendants with 100 as default', () => {
    renderWithRouter(<CreateMeetup setMeetups={jest.fn()} user={user!} />)

    const maxCapacityCheckbox = screen.getByRole('checkbox', {
      name: /max capacity/i,
    })
    const maxCapacityInput = screen.getByRole('spinbutton', {
      name: /capacity-input/,
    })

    expect(maxCapacityCheckbox).toBeChecked()
    expect(maxCapacityInput).toHaveValue(100)
  })
  it('renders an enabled cancel button and a disabled create button', () => {
    renderWithRouter(<CreateMeetup setMeetups={jest.fn()} user={user!} />)

    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    const createButton = screen.getByRole('button', { name: /create/i })

    expect(cancelButton).toBeEnabled()
    expect(createButton).toBeDisabled()
  })
  it('shows url text input and hides address inputs if "online event" is checked', () => {
    renderWithRouter(<CreateMeetup setMeetups={jest.fn()} user={user!} />)

    const onlineCheckbox = screen.getByRole('checkbox', { name: /online/i })

    const streetInput = screen.getByRole('textbox', { name: /street/i })
    const cityInput = screen.getByRole('textbox', { name: /city/i })

    userEvent.click(onlineCheckbox)

    const urlInput = screen.getByRole('textbox', { name: /url/i })

    expect(urlInput).toBeInTheDocument()
    expect(streetInput).not.toBeInTheDocument()
    expect(cityInput).not.toBeInTheDocument()
  })
  it('hides number input for max capacity if "max capacity" is unchecked', () => {
    renderWithRouter(<CreateMeetup setMeetups={jest.fn()} user={user!} />)

    const maxCapacityCheckbox = screen.getByRole('checkbox', {
      name: /max capacity/i,
    })
    const maxCapacityInput = screen.getByRole('spinbutton', {
      name: /capacity-input/,
    })

    userEvent.click(maxCapacityCheckbox)

    expect(maxCapacityInput).not.toBeInTheDocument()
  })
  it('enables create button if no inputs on screen are empty', () => {
    renderWithRouter(<CreateMeetup setMeetups={jest.fn()} user={user!} />)

    const textInputs = screen.getAllByRole('textbox')

    textInputs.forEach((input: any) => {
      userEvent.type(input, 'hey')
    })

    const createButton = screen.getByRole('button', { name: /create/i })

    expect(createButton).toBeEnabled()
  })
})
