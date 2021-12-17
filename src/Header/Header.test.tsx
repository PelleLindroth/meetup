import { renderWithRouter } from '../utils/testing-utils'
import { screen } from '@testing-library/react'
import Header from '.'
import { getMockUsers } from '../db'
import userEvent from '@testing-library/user-event'

describe('Header unit tests', () => {
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
    const users = getMockUsers()
    const mockUser = users[0]
    renderWithRouter(<Header user={mockUser} setUser={jest.fn()} />)

    const header = screen.getByRole('banner')
    const logo = screen.getByRole('img', { name: /logo/i })
    const profileLink = screen.getByText(
      `${mockUser.firstName} ${mockUser.lastName}`
    )

    expect(header).toBeInTheDocument()
    expect(logo).toBeInTheDocument()
    expect(profileLink).toBeInTheDocument()
  })
  it('displays a menu with a link and a logout button when Profile link is clicked', () => {
    const users = getMockUsers()
    const mockUser = users[0]
    renderWithRouter(<Header user={mockUser} setUser={jest.fn()} />)

    const profile = screen.getByText(
      `${mockUser.firstName} ${mockUser.lastName}`
    )

    userEvent.click(profile)

    const profileMenu = screen.getByRole('navigation')
    const profileLink = screen.getByRole('link', { name: /view profile/i })
    const logoutButton = screen.getByRole('button', { name: /log out/i })

    expect(profileMenu).toBeInTheDocument()
    expect(profileLink).toBeInTheDocument()
    expect(logoutButton).toBeInTheDocument()
  })
  it('hides menu when Profile link is clicked twice', () => {
    const users = getMockUsers()
    const mockUser = users[0]
    renderWithRouter(<Header user={mockUser} setUser={jest.fn()} />)

    const profile = screen.getByText(
      `${mockUser.firstName} ${mockUser.lastName}`
    )

    userEvent.click(profile)
    userEvent.click(profile)

    const disappearedProfileMenu = screen.queryByRole('navigation')

    expect(disappearedProfileMenu).not.toBeInTheDocument()
  })
})
