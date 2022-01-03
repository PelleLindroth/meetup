import { mount } from 'enzyme'
import { screen, within } from '@testing-library/react'
import { getUserById } from '../db'
import { renderWithRouter } from '../utils/testing-utils'
import { MemoryRouter } from 'react-router'
import App from './App'
import Home from '../views/Home'
import userEvent from '@testing-library/user-event'

jest.mock('../db')

describe('App unit tests', () => {
  it('renders App correctly', () => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(new Date(2021, 11, 24))
    const wrapper = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    expect(wrapper.find(App)).toMatchSnapshot()

    jest.useRealTimers()
  })
  it('initially renders Home view with 2 lists with a total of 4 meetups', () => {
    const wrapper = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    expect(wrapper.find(Home).find('ul')).toHaveLength(2)
    expect(wrapper.find(Home).find('li')).toHaveLength(6)
  })
})

describe('App integration tests', () => {
  const user = getUserById('1')

  it('renders login view with form when log in button is clicked', () => {
    renderWithRouter(<App />)

    userEvent.click(screen.getByRole('button', { name: /log in/i }))

    expect(screen.getByRole('form')).toBeInTheDocument()
  })
  it('renders login button in header when log out button is clicked after logging in', async () => {
    renderWithRouter(<App />)

    userEvent.click(screen.getByRole('button', { name: /log in/i }))

    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const passwordInput = screen.getByLabelText('password')
    const submitButton = screen.getByRole('button', { name: /submit/i })

    userEvent.type(emailInput, user!.email)
    userEvent.type(passwordInput, user!.password)
    userEvent.click(submitButton)
    userEvent.click(screen.getByText(`${user!.firstName} ${user!.lastName}`))
    userEvent.click(screen.getByRole('button', { name: /log out/i }))

    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument()
  })
})

describe('Happy paths', () => {
  const user = getUserById('1')

  test('happy path for creating new meetup', () => {
    renderWithRouter(<App />)

    // Log in
    userEvent.click(screen.getByRole('button', { name: /log in/i }))
    userEvent.type(screen.getByRole('textbox', { name: /email/i }), user!.email)
    userEvent.type(screen.getByLabelText('password'), user!.password)
    userEvent.click(screen.getByRole('button', { name: /submit/i }))

    // Click on Create new meetup
    userEvent.click(screen.getByText(`${user!.firstName} ${user!.lastName}`))
    userEvent.click(screen.getByText(/create meetup/i))

    // Fill out Meetup form
    userEvent.type(
      screen.getByRole('textbox', { name: /title/i }),
      'New meetup'
    )
    userEvent.type(
      screen.getByRole('textbox', { name: /description/i }),
      'A short description'
    )
    userEvent.type(
      screen.getByRole('textbox', { name: /street/i }),
      'Main street 321'
    )
    userEvent.type(screen.getByRole('textbox', { name: /city/i }), 'Smallville')

    const capacityInput = screen.getByRole('spinbutton', {
      name: 'capacity-input',
    })
    userEvent.clear(capacityInput)
    userEvent.type(capacityInput, '60')
    expect(capacityInput).toHaveValue(60)

    // Click on create button
    userEvent.click(screen.getByRole('button', { name: /create/i }))

    // Find new meetup on profile page
    expect(screen.getByText('New meetup')).toBeInTheDocument()

    // Click logo to return to Home view
    userEvent.click(screen.getByRole('img', { name: /logo/i }))

    // Find new meetup on Home view
    expect(screen.getByText('New meetup')).toBeInTheDocument()
  })
  test('happy path to register for Sevilla - Real Sociedad meetup', async () => {
    renderWithRouter(<App />)

    // Log in
    userEvent.click(screen.getByRole('button', { name: /log in/i }))
    userEvent.type(screen.getByRole('textbox', { name: /email/i }), user!.email)
    userEvent.type(screen.getByLabelText('password'), user!.password)
    userEvent.click(screen.getByRole('button', { name: /submit/i }))

    // Click on third upcoming Meetup link
    const upcomingMeetupsList = await screen.findByTestId('upcoming-events')
    userEvent.click(within(upcomingMeetupsList).getAllByRole('link')[2])

    // // Click on Sign up for this event button
    userEvent.click(screen.getByRole('button', { name: /sign up/i }))

    // Find "You have signed up for this event" text
    expect(
      screen.getByText('You have signed up for this event!')
    ).toBeInTheDocument()

    // Click on profile name in Header
    userEvent.click(screen.getByText(`${user!.firstName} ${user!.lastName}`))

    // Click on View Profile
    userEvent.click(screen.getByText(/view profile/i))

    // Find event under "Upcoming events you\'re attending"
    const upcomingAttendingList = await screen.findByTestId('upcoming-events')
    within(upcomingAttendingList).getByRole('heading', {
      name: /sevilla - real sociedad/i,
    })
  })
  test('Happy path for adding a comment', async () => {
    renderWithRouter(<App />)

    // Click on upcoming Meetup link
    const upcomingMeetupsList = await screen.findByTestId('upcoming-events')
    userEvent.click(within(upcomingMeetupsList).getAllByRole('link')[0])

    // Add comment
    const addCommentButton = await screen.findByRole('button', {
      name: /add comment/i,
    })

    userEvent.click(addCommentButton)

    const textInput = screen.getByRole('textbox')

    userEvent.type(textInput, 'This is a comment')

    const submitButton = screen.getByRole('button', { name: /submit/i })

    userEvent.click(submitButton)

    // Find comment

    const comment = screen.getByRole('listitem')

    expect(comment).toHaveTextContent('This is a comment')
  })
})
