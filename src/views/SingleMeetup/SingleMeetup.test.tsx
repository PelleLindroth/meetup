import { renderWithPath, mountWithPath } from '../../utils/testing-utils'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { getMeetupById, getUserById, getAllMeetups } from '../../db'
import { formatDate } from '../../utils'
import SingleMeetup from './index'

const mockedUsedNavigate = jest.fn()
jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as any),
  useNavigate: () => mockedUsedNavigate,
}))
jest.mock('../../db')

describe('SingleMeetup unit tests for anonymous user', () => {
  const upcomingOnlineEvent = getMeetupById('2')
  const upcomingIRLEvent = getMeetupById('4')
  const upcomingLimitedCapacityEvent = getMeetupById('3')
  const pastEvent = getMeetupById('1')
  const meetups = getAllMeetups()

  it('renders Single Meetup view correctly for anonymous user (smoke test)', () => {
    const wrapper = mountWithPath(
      <SingleMeetup meetups={meetups} user={null} />,
      `/meetup/${upcomingOnlineEvent!.id}`,
      'meetup/:id'
    )

    expect(wrapper.find(SingleMeetup)).toMatchSnapshot()
  })
  it('renders upcoming event with correct date', () => {
    renderWithPath(
      <SingleMeetup meetups={meetups} user={null} />,
      `/meetup/${upcomingOnlineEvent!.id}`,
      'meetup/:id'
    )
    const date = screen.getByText(formatDate(upcomingOnlineEvent!.date))

    expect(date).toBeInTheDocument()
  })
  it('renders upcoming irl event with correct location', () => {
    renderWithPath(
      <SingleMeetup meetups={meetups} user={null} />,
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
      <SingleMeetup meetups={meetups} user={null} />,
      `/meetup/${upcomingOnlineEvent!.id}`,
      'meetup/:id'
    )
    const locationInfo = screen.getByTitle('location')

    expect(locationInfo).toHaveTextContent('Online event')
  })
  it('renders upcoming event with name and email of arranger', () => {
    renderWithPath(
      <SingleMeetup meetups={meetups} user={null} />,
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
      <SingleMeetup meetups={meetups} user={null} />,
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
      <SingleMeetup meetups={meetups} user={null} />,
      `/meetup/${upcomingIRLEvent!.id}`,
      'meetup/:id'
    )
    const capacityInfo = screen.getByText(/capacity/)

    expect(capacityInfo).toHaveTextContent(`This event has unlimited capacity`)
  })
  it('renders upcoming event with limited capacity correctly', () => {
    renderWithPath(
      <SingleMeetup meetups={meetups} user={null} />,
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
      <SingleMeetup meetups={meetups} user={null} />,
      `/meetup/${upcomingLimitedCapacityEvent!.id}`,
      'meetup/:id'
    )

    const regexp = new RegExp(`${upcomingLimitedCapacityEvent?.attending}`)
    const attendingInfo = screen.getByText(regexp)
    const avilable = screen.getByText(/available/i)

    expect(attendingInfo).toHaveTextContent(
      `${upcomingLimitedCapacityEvent!.attending}`
    )
    expect(avilable).toHaveTextContent(
      `${
        upcomingLimitedCapacityEvent!.capacity! -
        upcomingLimitedCapacityEvent!.attending
      }`
    )
  })
  it('renders past event with final number of attenders', () => {
    renderWithPath(
      <SingleMeetup meetups={meetups} user={null} />,
      `/meetup/${pastEvent!.id}`,
      'meetup/:id'
    )

    const attended = screen.getByText(/attended/i)

    expect(attended).toHaveTextContent(
      `${pastEvent?.attending} people attended this event`
    )
  })
  it('renders message if no meetup is found', () => {
    renderWithPath(
      <SingleMeetup meetups={meetups} user={null} />,
      '/meetup/123',
      'meetup/:id'
    )

    expect(screen.getByText(/meetup not found/i)).toBeInTheDocument()
  })
  it('renders section with login prompt and "Go to Login" button for anonymous users', () => {
    renderWithPath(
      <SingleMeetup meetups={meetups} user={null} />,
      `/meetup/${upcomingIRLEvent!.id}`,
      'meetup/:id'
    )

    const loginPrompt = screen.getByTitle(/log in/i)
    const goToLoginButton = screen.getByRole('button', { name: /login/i })

    expect(loginPrompt).toBeInTheDocument()
    expect(goToLoginButton).toBeInTheDocument()
  })
  it('calls navigate when goToLoginButton is clicked', () => {
    renderWithPath(
      <SingleMeetup meetups={meetups} user={null} />,
      `/meetup/${upcomingIRLEvent!.id}`,
      'meetup/:id'
    )

    const goToLoginButton = screen.getByRole('button', { name: /login/i })

    userEvent.click(goToLoginButton)

    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1)
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/login')
  })
})

describe('SingleMeetup unit tests for logged in user', () => {
  const pastEvent = getMeetupById('1')
  const user1 = getUserById('1')
  const user2 = getUserById('4')
  const meetups = getAllMeetups()

  it('renders Single Meetup view correctly for logged in user (smoke test)', () => {
    const wrapper = mountWithPath(
      <SingleMeetup meetups={meetups} user={user1!} />,
      `/meetup/${pastEvent!.id}`,
      'meetup/:id'
    )

    expect(wrapper.find(SingleMeetup)).toMatchSnapshot()
  })
  it('renders Rate button in reviews section if user attended and has not submitted a rating', () => {
    renderWithPath(
      <SingleMeetup meetups={meetups} user={user2!} />,
      `/meetup/${pastEvent!.id}`,
      'meetup/:id'
    )

    const rateButton = screen.getByRole('button', { name: /rate/i })

    expect(rateButton).toBeInTheDocument()
  })
  it('renders "Already rated" text in reviews section if user attended and already submitted a rating', () => {
    renderWithPath(
      <SingleMeetup meetups={meetups} user={user1!} />,
      `/meetup/${pastEvent!.id}`,
      'meetup/:id'
    )

    const alreadyRatedText = screen.getByText(/already rated/i)

    expect(alreadyRatedText).toBeInTheDocument()
  })
})
