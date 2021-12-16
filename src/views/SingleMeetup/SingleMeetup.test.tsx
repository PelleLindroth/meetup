import { renderWithPath } from '../../utils/testing-utils'
import { screen } from '@testing-library/react'
import { getMeetupById } from '../../db'
import { formatDate } from '../../utils'
// import { mountWithPath } from '../../utils/testing-utils'
import SingleMeetup from './index'

describe('SingleMeetup unit tests for anonymous user', () => {
  const upcomingOnlineEvent = getMeetupById('2')
  const upcomingIRLEvent = getMeetupById('4')
  const upcomingLimitedCapacityEvent = getMeetupById('3')
  const pastEvent = getMeetupById('1')
  // it('renders Single Meetup view correctly (smoke test)', () => {
  //   const wrapper = mountWithPath(
  //     <SingleMeetup />,
  //     `/meetup/${upcomingOnlineEvent!.id}`,
  //     'meetup/:id'
  //   )

  //   expect(wrapper.find(SingleMeetup)).toMatchSnapshot()
  // })
  it('renders upcoming event with correct title', () => {
    renderWithPath(
      <SingleMeetup user={null} />,
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
      <SingleMeetup user={null} />,
      `/meetup/${upcomingOnlineEvent!.id}`,
      'meetup/:id'
    )
    const description = screen.getByRole('heading', {
      name: `${upcomingOnlineEvent!.description}`,
    })

    expect(description).toBeInTheDocument()
  })
  it('renders upcoming event with correct date', () => {
    renderWithPath(
      <SingleMeetup user={null} />,
      `/meetup/${upcomingOnlineEvent!.id}`,
      'meetup/:id'
    )
    const date = screen.getByText(formatDate(upcomingOnlineEvent!.date))

    expect(date).toBeInTheDocument()
  })
  it('renders upcoming irl event with correct location', () => {
    renderWithPath(
      <SingleMeetup user={null} />,
      `/meetup/${upcomingIRLEvent!.id}`,
      'meetup/:id'
    )
    const locationInfo = screen.getByTitle('location')

    expect(locationInfo).toHaveTextContent(
      `${upcomingIRLEvent!.location!.street}, ${
        upcomingIRLEvent!.location!.city
      }`
    )
  })
  it('renders upcoming online event with correct location information', () => {
    renderWithPath(
      <SingleMeetup user={null} />,
      `/meetup/${upcomingOnlineEvent!.id}`,
      'meetup/:id'
    )
    const locationInfo = screen.getByTitle('location')

    expect(locationInfo).toHaveTextContent('Online event')
  })
  it('renders upcoming event with name and email of arranger', () => {
    renderWithPath(
      <SingleMeetup user={null} />,
      `/meetup/${upcomingOnlineEvent!.id}`,
      'meetup/:id'
    )
    const arrangerName = screen.getByText(
      `${upcomingOnlineEvent!.arranger.firstName} ${
        upcomingOnlineEvent!.arranger.lastName
      }`
    )
    const arrangerEmail = screen.getByText(/email/i)

    expect(arrangerName).toBeInTheDocument()
    expect(arrangerEmail).toHaveTextContent(
      `${upcomingOnlineEvent!.arranger.email}`
    )
  })
  it('renders upcoming online event with unlimited capacity correctly', () => {
    renderWithPath(
      <SingleMeetup user={null} />,
      `/meetup/${upcomingOnlineEvent!.id}`,
      'meetup/:id'
    )
    const capacityInfo = screen.getByText(/capacity/)

    expect(capacityInfo).toHaveTextContent(
      `This is an online event with unlimited capacity`
    )
  })
  it('renders upcoming irl event with unlimited capacity correctly', () => {
    renderWithPath(
      <SingleMeetup user={null} />,
      `/meetup/${upcomingIRLEvent!.id}`,
      'meetup/:id'
    )
    const capacityInfo = screen.getByText(/capacity/)

    expect(capacityInfo).toHaveTextContent(`This event has unlimited capacity`)
  })
  it('renders upcoming event with limited capacity correctly', () => {
    renderWithPath(
      <SingleMeetup user={null} />,
      `/meetup/${upcomingLimitedCapacityEvent!.id}`,
      'meetup/:id'
    )
    const regexp = new RegExp(`${upcomingLimitedCapacityEvent?.capacity}`)
    const capacityInfo = screen.getByText(regexp)

    expect(capacityInfo).toHaveTextContent(
      `${upcomingLimitedCapacityEvent!.capacity}`
    )
  })
  it('renders upcoming limited capacity event with correct number of people attending and available seats', () => {
    renderWithPath(
      <SingleMeetup user={null} />,
      `/meetup/${upcomingLimitedCapacityEvent!.id}`,
      'meetup/:id'
    )

    const regexp = new RegExp(`${upcomingLimitedCapacityEvent?.attending}`)
    const attendingInfo = screen.getByText(regexp)
    const avilableSeats = screen.getByText(/available seats/i)

    expect(attendingInfo).toHaveTextContent(
      `${upcomingLimitedCapacityEvent!.attending}`
    )
    expect(avilableSeats).toHaveTextContent(
      `${
        upcomingLimitedCapacityEvent!.capacity! -
        upcomingLimitedCapacityEvent!.attending
      }`
    )
  })
  it('renders past event with final number of attenders', () => {
    renderWithPath(
      <SingleMeetup user={null} />,
      `/meetup/${pastEvent!.id}`,
      'meetup/:id'
    )

    const attended = screen.getByText(/attended/i)

    expect(attended).toHaveTextContent(
      `${pastEvent?.attending} people attended this event`
    )
  })
  it('renders section with login prompt and "Go to Login" button for anonymous users', () => {
    renderWithPath(
      <SingleMeetup user={null} />,
      `/meetup/${upcomingIRLEvent!.id}`,
      'meetup/:id'
    )

    const loginPrompt = screen.getByTitle(/log in/i)
    const goToLoginButton = screen.getByRole('button', { name: /login/i })

    expect(loginPrompt).toBeInTheDocument()
    expect(goToLoginButton).toBeInTheDocument()
  })
  it('renders a review score for for past event', () => {
    renderWithPath(
      <SingleMeetup user={null} />,
      `/meetup/${pastEvent!.id}`,
      'meetup/:id'
    )

    const score = screen.getByText(/score/i)

    expect(score).toHaveTextContent(
      'This event has a 4.5 score out of 5 possible after 2 votes'
    )
  })
  it('does not render a review score for for upcoming event', () => {
    renderWithPath(
      <SingleMeetup user={null} />,
      `/meetup/${upcomingIRLEvent!.id}`,
      'meetup/:id'
    )

    const score = screen.queryByText(/score/i)

    expect(score).not.toBeInTheDocument()
  })
  it('renders a list of comments for past event', () => {
    renderWithPath(
      <SingleMeetup user={null} />,
      `/meetup/${pastEvent!.id}`,
      'meetup/:id'
    )

    const comments = screen.getAllByRole('listitem', { name: /comment/ })

    expect(comments).toHaveLength(2)
    expect(comments[0]).toHaveTextContent(/great day/i)
  })
})

describe('SingleMeetup unit tests for logged in user', () => {})

// Past event:
// does not render a list of comments for upcoming event

// Logged in user:

// Upcoming events:
// Sign up for event button

// Past events:
// Add comment button if attended
// Add review button if attended no review submitted
// Message if attended and review submitted