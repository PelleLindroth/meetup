import { mount } from 'enzyme'
import { screen } from '@testing-library/react'
import { Link, MemoryRouter } from 'react-router-dom'
import { renderWithRouter } from '../../utils/testing-utils'
import Home from './Home'
import MeetupCard from '../../components/MeetupCard'
import { getMockMeetups } from '../../db'

describe('Home', () => {
  it('mounts Home view correctly with meetups', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Home meetups={getMockMeetups()} setMeetups={jest.fn()} />
      </MemoryRouter>
    )
    expect(wrapper.find(Home)).toMatchSnapshot()
  })
  it('renders a list of meetups', async () => {
    renderWithRouter(<Home meetups={getMockMeetups()} setMeetups={jest.fn()} />)

    const meetupList = screen.getAllByRole('listitem')

    expect(meetupList).toHaveLength(4)
  })
  it('renders upcoming meetups chronologically (ascending)', async () => {
    renderWithRouter(<Home meetups={getMockMeetups()} setMeetups={jest.fn()} />)

    const dates = screen.getAllByTitle('date')

    expect(dates[0]).toHaveTextContent('10 January 2022')
    expect(dates[2]).toHaveTextContent('02 July 2022')
  })
  it('renders an Upcoming Events list and a Past Events list according to current date', () => {
    renderWithRouter(<Home meetups={getMockMeetups()} setMeetups={jest.fn()} />)

    const upcomingEventsList = screen.getByTestId('upcoming-events')
    const pastEventsList = screen.getByTestId('past-events')

    expect(upcomingEventsList).toBeInTheDocument()
    expect(pastEventsList).toBeInTheDocument()
    expect(upcomingEventsList.childNodes).toHaveLength(3)
    expect(pastEventsList.childNodes).toHaveLength(1)
  })
  it('separates upcoming and past events by background color on card headers', () => {
    renderWithRouter(<Home meetups={getMockMeetups()} setMeetups={jest.fn()} />)

    const upcomingEventHeaders = screen.getAllByTitle('upcoming-event-header')
    const pastEventHeaders = screen.getAllByTitle('past-event-header')

    expect(upcomingEventHeaders[0]).toHaveStyle({ backgroundColor: '#0E81C9' })
    expect(pastEventHeaders[0]).toHaveStyle({ backgroundColor: '#DCDDDE' })
  })
  it('renders separate meetup card for every meetup with title, date, location, capacity and an img link to detail page', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Home meetups={getMockMeetups()} setMeetups={jest.fn()} />
      </MemoryRouter>
    )
    const meetupCard = wrapper.find(MeetupCard).at(0)

    expect(meetupCard.find('h2').text()).toBe('Rust course')
    expect(meetupCard.find('h3').at(0).text()).toBe(
      '10 January 2022, 11:00 CET'
    )
    expect(meetupCard.find('h3').at(1).text()).toMatch(/online event/i)
    expect(meetupCard.find('p').text()).toMatch(/capacity/i)
    expect(meetupCard.find(Link).find('.arrowIcon').type()).toBe('img')
    expect(meetupCard).toMatchSnapshot()
  })
  it('renders a search input field, empty by default', () => {
    renderWithRouter(<Home meetups={getMockMeetups()} setMeetups={jest.fn()} />)

    const searchBox = screen.getByRole('searchbox')

    expect(searchBox).toBeInTheDocument()
    expect(searchBox).toHaveTextContent('')
  })
  // it('renders a filter select input with "view all" as default', () => {})
})

// User
// shows filtered events when typing in search field
// shows only past events when pastEvents filter is active
// shows only upcoming events when upcomingEvents filter is active

// Logged in User

// renders sign up button on all upcoming events
// renders Comment and Leave Review buttons on past events that the user has attended
// does not render Comment or Leave Review buttons on past events that the user has not attended
// renders a Create New Meetup Button
// shows New Meetup Form when Create New Button is clicked
// renders new Meetup corectly in Meetup list when form is submitted
