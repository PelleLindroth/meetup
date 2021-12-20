import { renderWithPath } from '../../utils/testing-utils'
import { screen, within } from '@testing-library/react'
import Profile from '.'
import { getMockMeetups, getUserById } from '../../db'

describe('Profile unit tests', () => {
  const user = getUserById('1')
  const meetups = getMockMeetups()

  it("shows welcome message with user's first name", () => {
    renderWithPath(
      <Profile meetups={meetups} />,
      `/profile/${user!.id}`,
      '/profile/:id'
    )

    const welcomeMessage = screen.getByText(/welcome/i)

    expect(welcomeMessage).toHaveTextContent(`Welcome ${user!.firstName}`)
  })
  it("renders lists of user's own upcoming and past meetups first", () => {
    renderWithPath(
      <Profile meetups={meetups} />,
      `/profile/${user!.id}`,
      '/profile/:id'
    )

    const ownUpcoming = screen.getByTestId('own-upcoming-events')
    const ownPast = screen.getByTestId('own-past-events')

    expect(ownUpcoming).toBeInTheDocument()
    expect(ownPast).toBeInTheDocument()
  })
  it('then renders list of upcoming meetups user is attending', () => {
    renderWithPath(
      <Profile meetups={meetups} />,
      `/profile/${user!.id}`,
      '/profile/:id'
    )

    const upcomingAttending = screen.getByTestId('upcoming-events')

    expect(upcomingAttending).toBeInTheDocument()
  })
  it('finally renders list of past meetups user has attended', () => {
    renderWithPath(
      <Profile meetups={meetups} />,
      `/profile/${user!.id}`,
      '/profile/:id'
    )

    const pastAttended = screen.getByTestId('past-events')

    expect(pastAttended).toBeInTheDocument()
  })
  it('renders meetup cards for each meetup with link to meetup detail page', () => {
    renderWithPath(
      <Profile meetups={meetups} />,
      `/profile/${user!.id}`,
      '/profile/:id'
    )

    const meetupCards = screen.getAllByLabelText('meetup-card')

    const link = within(meetupCards[0]).getByRole('link')

    expect(meetupCards).toHaveLength(4)
    expect(link).toBeInTheDocument()
  })
  it('renders all lists chronologically', () => {
    renderWithPath(
      <Profile meetups={meetups} />,
      `/profile/${user!.id}`,
      '/profile/:id'
    )
  })
})
