import { mount } from 'enzyme'
import { screen } from '@testing-library/react'
import { Link, MemoryRouter } from 'react-router-dom'
import { DateContext, DateContextInterface } from '../../contexts/DateContext'
import { renderWithRouter } from '../../utils/testing-utils'
import Home from './Home'
import MeetupCard from './components/MeetupCard'
import { getMockMeetups } from '../../db'
import userEvent from '@testing-library/user-event'

const mockDateContext: DateContextInterface = {
  customDate: new Date(1640354400000),
  setCustomDate: jest.fn(),
}

describe('Home', () => {
  it('mounts Home view correctly with meetups', () => {
    const wrapper = mount(
      <DateContext.Provider value={mockDateContext}>
        <MemoryRouter>
          <Home meetups={getMockMeetups()} setMeetups={jest.fn()} />
        </MemoryRouter>
      </DateContext.Provider>
    )
    expect(wrapper.find(Home)).toMatchSnapshot()
  })
  it('renders a list of meetups', async () => {
    renderWithRouter(
      <DateContext.Provider value={mockDateContext}>
        <Home meetups={getMockMeetups()} setMeetups={jest.fn()} />
      </DateContext.Provider>
    )

    const meetupList = screen.getAllByRole('listitem')

    expect(meetupList).toHaveLength(5)
  })
  it('renders upcoming meetups chronologically (ascending)', async () => {
    renderWithRouter(
      <DateContext.Provider value={mockDateContext}>
        <Home meetups={getMockMeetups()} setMeetups={jest.fn()} />
      </DateContext.Provider>
    )

    const dates = screen.getAllByTitle('date')

    expect(dates[0]).toHaveTextContent('10 January 2022')
    expect(dates[2]).toHaveTextContent('02 July 2022')
  })
  it('renders an Upcoming Events list and a Past Events list according to current date', () => {
    renderWithRouter(
      <DateContext.Provider value={mockDateContext}>
        <Home meetups={getMockMeetups()} setMeetups={jest.fn()} />
      </DateContext.Provider>
    )

    const upcomingEventsList = screen.getByTestId('upcoming-events')
    const pastEventsList = screen.getByTestId('past-events')

    expect(upcomingEventsList).toBeInTheDocument()
    expect(pastEventsList).toBeInTheDocument()
    expect(upcomingEventsList.childNodes).toHaveLength(3)
    expect(pastEventsList.childNodes).toHaveLength(2)
  })
  it('separates upcoming and past events by background color on card headers', () => {
    renderWithRouter(
      <DateContext.Provider value={mockDateContext}>
        <Home meetups={getMockMeetups()} setMeetups={jest.fn()} />
      </DateContext.Provider>
    )

    const upcomingEventHeaders = screen.getAllByTitle('upcoming-event-header')
    const pastEventHeaders = screen.getAllByTitle('past-event-header')

    expect(upcomingEventHeaders[0]).toHaveStyle({ backgroundColor: '#0E81C9' })
    expect(pastEventHeaders[0]).toHaveStyle({ backgroundColor: '#DCDDDE' })
  })
  it('renders separate meetup card for every meetup with title, date, location, capacity and an img link to detail page', () => {
    const wrapper = mount(
      <DateContext.Provider value={mockDateContext}>
        <MemoryRouter>
          <Home meetups={getMockMeetups()} setMeetups={jest.fn()} />
        </MemoryRouter>
      </DateContext.Provider>
    )
    const meetupCard = wrapper.find(MeetupCard).at(0)

    expect(meetupCard.find('h2').text()).toBe('Rust course')
    expect(meetupCard.find('h3').at(0).text()).toBe(
      '10 January 2022, 11:00 CET'
    )
    expect(meetupCard.find('h3').at(1).text()).toMatch(/online event/i)
    expect(meetupCard.find('p').text()).toMatch('Capacity: Unlimited')
    expect(meetupCard.find(Link).find('.arrowIcon').type()).toBe('img')
    expect(meetupCard).toMatchSnapshot()
  })
  it('renders a search input field, empty by default', () => {
    renderWithRouter(
      <DateContext.Provider value={mockDateContext}>
        <Home meetups={getMockMeetups()} setMeetups={jest.fn()} />
      </DateContext.Provider>
    )

    const searchBox = screen.getByRole('searchbox')

    expect(searchBox).toBeInTheDocument()
    expect(searchBox).toHaveTextContent('')
  })
  it('renders a filter select input with "all" as default', () => {
    renderWithRouter(
      <DateContext.Provider value={mockDateContext}>
        <Home meetups={getMockMeetups()} setMeetups={jest.fn()} />
      </DateContext.Provider>
    )

    const selectInput = screen.getByRole('combobox')

    expect(selectInput).toBeInTheDocument()
    expect(selectInput).toHaveValue('all')
  })
  it('shows filtered events when typing in search field', () => {
    renderWithRouter(
      <DateContext.Provider value={mockDateContext}>
        <Home meetups={getMockMeetups()} setMeetups={jest.fn()} />
      </DateContext.Provider>
    )

    const searchBox = screen.getByRole('searchbox')

    userEvent.type(searchBox, 'pizza')

    const meetupList = screen.getAllByRole('listitem')

    expect(meetupList).toHaveLength(1)
    expect(meetupList[0]).toHaveTextContent(/pizza/i)
  })
  it('shows only past events when pastEvents filter is active', () => {
    renderWithRouter(
      <DateContext.Provider value={mockDateContext}>
        <Home meetups={getMockMeetups()} setMeetups={jest.fn()} />
      </DateContext.Provider>
    )

    const filterSelect = screen.getByRole('combobox')

    userEvent.selectOptions(filterSelect, 'past')

    const meetupList = screen.getAllByRole('listitem')

    expect(meetupList).toHaveLength(2)
    expect(meetupList[0]).toHaveTextContent(/pizza/i)
  })
  it('shows only upcoming events when upcomingEvents filter is active', () => {
    renderWithRouter(
      <DateContext.Provider value={mockDateContext}>
        <Home meetups={getMockMeetups()} setMeetups={jest.fn()} />
      </DateContext.Provider>
    )

    const filterSelect = screen.getByRole('combobox')

    userEvent.selectOptions(filterSelect, 'upcoming')

    const meetupList = screen.getAllByRole('listitem')

    expect(meetupList).toHaveLength(3)
    expect(meetupList[0]).toHaveTextContent(/rust/i)
  })
})
