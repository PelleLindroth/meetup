import { renderWithPath } from '../../../../utils/testing-utils'
import { screen } from '@testing-library/react'
import { getMeetupById, getAllMeetups, getUserById } from '../../../../db'
import MeetupHeader from './index'
import SingleMeetup from '../..'
import userEvent from '@testing-library/user-event'

jest.mock('../../../../db')

describe('MeetupHeader unit tests (anonymous)', () => {
  const upcomingOnlineEvent = getMeetupById('2')

  it('renders upcoming event with correct title', () => {
    renderWithPath(
      <MeetupHeader
        attending={false}
        setAttending={jest.fn()}
        user={null}
        meetup={upcomingOnlineEvent!}
        isUpcomingEvent={true}
      />,
      `/meetup/${upcomingOnlineEvent!.id}`,
      'meetup/:id'
    )
    const title = screen.getByRole('heading', {
      name: `${upcomingOnlineEvent!.title}`,
    })

    expect(title).toBeInTheDocument()
  })
  it('renders upcoming event with correct description', () => {
    renderWithPath(
      <MeetupHeader
        attending={false}
        setAttending={jest.fn()}
        user={null}
        meetup={upcomingOnlineEvent!}
        isUpcomingEvent={true}
      />,
      `/meetup/${upcomingOnlineEvent!.id}`,
      'meetup/:id'
    )
    const description = screen.getByRole('heading', {
      name: `${upcomingOnlineEvent!.description}`,
    })

    expect(description).toBeInTheDocument()
  })
})

describe('MeetupHeader unit tests (logged in)', () => {
  const pastEvent = getMeetupById('1')
  const upcomingIRLEvent = getMeetupById('4')
  const fullyBookedEvent = getMeetupById('6')
  const user = getUserById('1')

  it('renders a "Sign up for Event" button on upcoming events', () => {
    renderWithPath(
      <MeetupHeader
        attending={false}
        setAttending={jest.fn()}
        user={user!}
        meetup={upcomingIRLEvent!}
        isUpcomingEvent={true}
      />,
      `/meetup/${upcomingIRLEvent!.id}`,
      'meetup/:id'
    )

    const signUpButton = screen.getByRole('button', { name: /sign up/i })

    expect(signUpButton).toBeInTheDocument()
  })
  it('does not render sign up button on past events', () => {
    renderWithPath(
      <MeetupHeader
        attending={false}
        setAttending={jest.fn()}
        user={user!}
        meetup={pastEvent!}
        isUpcomingEvent={false}
      />,
      `/meetup/${pastEvent!.id}`,
      'meetup/:id'
    )

    const signUpButton = screen.queryByRole('button', { name: /sign up/i })

    expect(signUpButton).not.toBeInTheDocument()
  })
  it('does not render sign up button if event is fully booked', () => {
    renderWithPath(
      <MeetupHeader
        attending={false}
        setAttending={jest.fn()}
        user={user!}
        meetup={fullyBookedEvent!}
        isUpcomingEvent={true}
      />,
      `/meetup/${fullyBookedEvent!.id}`,
      'meetup/:id'
    )

    const signUpButton = screen.queryByRole('button', { name: /sign up/i })

    expect(signUpButton).not.toBeInTheDocument()
  })
  it('renders "fully booked" message is event is fully booked', () => {
    renderWithPath(
      <MeetupHeader
        attending={false}
        setAttending={jest.fn()}
        user={user!}
        meetup={fullyBookedEvent!}
        isUpcomingEvent={true}
      />,
      `/meetup/${fullyBookedEvent!.id}`,
      'meetup/:id'
    )

    const fullyBookedMessage = screen.getByText(/fully booked/i)

    expect(fullyBookedMessage).toBeInTheDocument()
  })
})

describe('Meetup header integration tests', () => {
  const upcomingIRLEvent = getMeetupById('4')
  const upcomingOnlineEvent = getMeetupById('2')
  const user = getUserById('1')
  const meetups = getAllMeetups()

  it('shows "signed up" message on upcoming events that user is signed up for', () => {
    renderWithPath(
      <SingleMeetup meetups={meetups} user={user!} />,
      `/meetup/${upcomingOnlineEvent!.id}`,
      'meetup/:id'
    )

    const signedUpMessage = screen.getByText(/signed up/i)

    expect(signedUpMessage).toHaveTextContent(
      'You have signed up for this event!'
    )
  })
  it('renders "cancel" button on signed up message', () => {
    renderWithPath(
      <SingleMeetup meetups={meetups} user={user!} />,
      `/meetup/${upcomingOnlineEvent!.id}`,
      'meetup/:id'
    )

    const cancelButton = screen.getByRole('button', { name: /cancel/i })

    expect(cancelButton).toBeInTheDocument()
  })
  it('renders "Signed in" message and removes "Sign up" button after clickng it', async () => {
    renderWithPath(
      <SingleMeetup meetups={meetups} user={user!} />,
      `/meetup/${upcomingIRLEvent!.id}`,
      'meetup/:id'
    )

    const signUpButton = screen.getByRole('button', { name: /sign up/i })

    userEvent.click(signUpButton)

    const signedUpMessage = screen.getByText(/signed up/i)

    expect(signedUpMessage).toHaveTextContent(
      'You have signed up for this event!'
    )

    expect(signUpButton).not.toBeInTheDocument()
  })
  it('renders "Sign up" button and removes "Signed in" message after canceling', () => {
    renderWithPath(
      <SingleMeetup meetups={meetups} user={user!} />,
      `/meetup/${upcomingOnlineEvent!.id}`,
      'meetup/:id'
    )

    const cancelButton = screen.getByRole('button', { name: /cancel/i })

    userEvent.click(cancelButton)

    const signUpButton = screen.getByRole('button', { name: /sign up/i })

    expect(signUpButton).toBeInTheDocument()
    expect(cancelButton).not.toBeInTheDocument()
  })
})
