import { renderWithPath } from '../../../../utils/testing-utils'
import { screen } from '@testing-library/react'
import { getMeetupById, getMockMeetups, getUserById } from '../../../../db'
import {
  DateContext,
  DateContextInterface,
} from '../../../../contexts/DateContext'
import MeetupHeader from './index'
import SingleMeetup from '../..'
import userEvent from '@testing-library/user-event'

jest.mock('../../../../db')

const mockDateContext: DateContextInterface = {
  customDate: new Date(1640354400000),
  setCustomDate: jest.fn(),
}

describe('MeetupHeader unit tests (anonymous)', () => {
  const upcomingOnlineEvent = getMeetupById('2')

  it('renders upcoming event with correct title', () => {
    renderWithPath(
      <DateContext.Provider value={mockDateContext}>
        <MeetupHeader
          attending={false}
          setAttending={jest.fn()}
          user={null}
          meetup={upcomingOnlineEvent!}
          isUpcomingEvent={true}
        />
      </DateContext.Provider>,
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
      <DateContext.Provider value={mockDateContext}>
        <MeetupHeader
          attending={false}
          setAttending={jest.fn()}
          user={null}
          meetup={upcomingOnlineEvent!}
          isUpcomingEvent={true}
        />
      </DateContext.Provider>,
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
  const user = getUserById('1')

  it('renders a "Sign up for Event" button on upcoming events', () => {
    renderWithPath(
      <DateContext.Provider value={mockDateContext}>
        <MeetupHeader
          attending={false}
          setAttending={jest.fn()}
          user={user!}
          meetup={upcomingIRLEvent!}
          isUpcomingEvent={true}
        />
      </DateContext.Provider>,
      `/meetup/${upcomingIRLEvent!.id}`,
      'meetup/:id'
    )

    const signUpButton = screen.getByRole('button', { name: /sign up/i })

    expect(signUpButton).toBeInTheDocument()
  })
  it('does not render sign up button on past events', () => {
    renderWithPath(
      <DateContext.Provider value={mockDateContext}>
        <MeetupHeader
          attending={false}
          setAttending={jest.fn()}
          user={user!}
          meetup={pastEvent!}
          isUpcomingEvent={false}
        />
      </DateContext.Provider>,
      `/meetup/${pastEvent!.id}`,
      'meetup/:id'
    )

    const signUpButton = screen.queryByRole('button', { name: /sign up/i })

    expect(signUpButton).not.toBeInTheDocument()
  })
})

describe('Meetup header integration tests', () => {
  const upcomingIRLEvent = getMeetupById('4')
  const upcomingOnlineEvent = getMeetupById('2')
  const user = getUserById('1')
  const meetups = getMockMeetups()

  it('shows "signed up" message on upcoming events that user is signed up for', () => {
    renderWithPath(
      <DateContext.Provider value={mockDateContext}>
        <SingleMeetup meetups={meetups} user={user!} />
      </DateContext.Provider>,
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
      <DateContext.Provider value={mockDateContext}>
        <SingleMeetup meetups={meetups} user={user!} />
      </DateContext.Provider>,
      `/meetup/${upcomingOnlineEvent!.id}`,
      'meetup/:id'
    )

    const cancelButton = screen.getByRole('button', { name: /cancel/i })

    expect(cancelButton).toBeInTheDocument()
  })
  it('renders "Signed in" message and removes "Sign up" button after clickng it', async () => {
    renderWithPath(
      <DateContext.Provider value={mockDateContext}>
        <SingleMeetup meetups={meetups} user={user!} />
      </DateContext.Provider>,
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
      <DateContext.Provider value={mockDateContext}>
        <SingleMeetup meetups={meetups} user={user!} />
      </DateContext.Provider>,
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
