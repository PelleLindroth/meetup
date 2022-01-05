import { renderWithRouter } from '../utils/testing-utils'
import { screen } from '@testing-library/react'
import { getUsers } from '../db'
import Header from '.'
import userEvent from '@testing-library/user-event'

jest.mock('../db')

describe('Header unit tests', () => {
  const users = getUsers()
  const user = users[0]
  it('renders a Header with logo and Login button if user is not logged in', () => {
    renderWithRouter(<Header user={null} setUser={jest.fn()} />)

    const header = screen.getByRole('banner')
    const logo = screen.getByAltText('logo')
    const loginButton = screen.getByRole('button', { name: /log in/i })

    expect(header).toBeInTheDocument()
    expect(logo).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument()
  })
  it('renders a Header with logo and Profile link if user is logged in', () => {
    renderWithRouter(<Header user={user} setUser={jest.fn()} />)

    const header = screen.getByRole('banner')
    const logo = screen.getByRole('img', { name: /logo/i })
    const profileLink = screen.getByText(`${user.getFullName()}`)

    expect(header).toBeInTheDocument()
    expect(logo).toBeInTheDocument()
    expect(profileLink).toBeInTheDocument()
  })
  it('displays a menu with a link and a logout button when Profile link is clicked', () => {
    renderWithRouter(<Header user={user} setUser={jest.fn()} />)

    const profile = screen.getByText(`${user.getFullName()}`)

    userEvent.click(profile)

    const profileMenu = screen.getByRole('navigation')
    const profileLink = screen.getByRole('link', { name: /view profile/i })
    const logoutButton = screen.getByRole('button', { name: /log out/i })

    expect(profileMenu).toBeInTheDocument()
    expect(profileLink).toBeInTheDocument()
    expect(logoutButton).toBeInTheDocument()
  })
  it('hides menu when Profile link is clicked twice', () => {
    renderWithRouter(<Header user={user} setUser={jest.fn()} />)

    const profile = screen.getByText(`${user.getFullName()}`)

    userEvent.click(profile)
    userEvent.click(profile)

    const disappearedProfileMenu = screen.queryByRole('navigation')

    expect(disappearedProfileMenu).not.toBeInTheDocument()
  })
})

describe('Header integration tests', () => {
  it('renders TimeBanner correctly', () => {
    renderWithRouter(<Header user={null} setUser={jest.fn()} />)

    const timeBanner = screen.getByTitle(/custom time/i)

    expect(timeBanner).toBeInTheDocument()
  })
  it('shows SetTimeModal with datepicker and two buttons when TimeBanner is clicked', () => {
    renderWithRouter(<Header user={null} setUser={jest.fn()} />)

    const timeBanner = screen.getByTitle(/custom time/i)

    userEvent.click(timeBanner)

    expect(screen.getByTitle(/set a custom date/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Date')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Use real time' })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Set time' })).toBeInTheDocument()
  })
  it('closes SetTimeModal when "Use real time" button is clicked', () => {
    renderWithRouter(<Header user={null} setUser={jest.fn()} />)

    const timeBanner = screen.getByTitle(/custom time/i)

    userEvent.click(timeBanner)

    expect(screen.getByTitle(/set a custom date/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Date')).toBeInTheDocument()

    userEvent.click(screen.getByRole('button', { name: 'Use real time' }))

    expect(screen.queryByLabelText('Date')).not.toBeInTheDocument()
  })
})
