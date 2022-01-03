import { screen } from '@testing-library/react'
import { Link } from 'react-router-dom'
import { renderWithRouter, mountWithRouter } from '../../utils/testing-utils'
import Home from './Home'
import MeetupCard from '../components/MeetupCard'
import { getAllMeetups } from '../../db'
import userEvent from '@testing-library/user-event'

describe('Home', () => {
  it('mounts Home view correctly with meetups', () => {
    const wrapper = mountWithRouter(
      <Home meetups={getAllMeetups()} setMeetups={jest.fn()} />
    )

    expect(wrapper.find(Home)).toMatchSnapshot()
  })
  it('renders a list of meetups', async () => {
    renderWithRouter(<Home meetups={getAllMeetups()} setMeetups={jest.fn()} />)

    const meetupList = screen.getAllByRole('listitem')

    expect(meetupList).toHaveLength(6)
  })
  it('renders upcoming meetups chronologically (ascending)', async () => {
    renderWithRouter(<Home meetups={getAllMeetups()} setMeetups={jest.fn()} />)

    const dates = screen.getAllByTitle('date')

    expect(dates[0]).toHaveTextContent('10 January 2022')
    expect(dates[3]).toHaveTextContent('02 July 2022')
  })
  it('renders an Upcoming Events list and a Past Events list according to current date', () => {
    renderWithRouter(<Home meetups={getAllMeetups()} setMeetups={jest.fn()} />)

    const upcomingEventsList = screen.getByTestId('upcoming-events')
    const pastEventsList = screen.getByTestId('past-events')

    expect(upcomingEventsList).toBeInTheDocument()
    expect(pastEventsList).toBeInTheDocument()
    expect(upcomingEventsList.childNodes).toHaveLength(4)
    expect(pastEventsList.childNodes).toHaveLength(2)
  })
  it('separates upcoming and past events by background color on card headers', () => {
    renderWithRouter(<Home meetups={getAllMeetups()} setMeetups={jest.fn()} />)

    const upcomingEventHeaders = screen.getAllByTitle('upcoming-event-header')
    const pastEventHeaders = screen.getAllByTitle('past-event-header')

    expect(upcomingEventHeaders[0]).toHaveStyle({ backgroundColor: '#0E81C9' })
    expect(pastEventHeaders[0]).toHaveStyle({ backgroundColor: '#DCDDDE' })
  })
  it('renders separate meetup card for every meetup with title, date, location, capacity and an img link to detail page', () => {
    const wrapper = mountWithRouter(
      <Home meetups={getAllMeetups()} setMeetups={jest.fn()} />
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
    renderWithRouter(<Home meetups={getAllMeetups()} setMeetups={jest.fn()} />)

    const searchBox = screen.getByRole('searchbox')

    expect(searchBox).toBeInTheDocument()
    expect(searchBox).toHaveTextContent('')
  })
  it('renders a filter select input with "all" as default', () => {
    renderWithRouter(<Home meetups={getAllMeetups()} setMeetups={jest.fn()} />)

    const selectInput = screen.getByRole('combobox')

    expect(selectInput).toBeInTheDocument()
    expect(selectInput).toHaveValue('all')
  })
  it('shows filtered events with matching title correctly when typing in search field', () => {
    renderWithRouter(<Home meetups={getAllMeetups()} setMeetups={jest.fn()} />)

    const searchBox = screen.getByRole('searchbox')

    userEvent.type(searchBox, 'pizza')

    const meetupList = screen.getAllByRole('listitem')

    expect(meetupList).toHaveLength(1)
    expect(meetupList[0]).toHaveTextContent(/pizza/i)
  })
  it('shows filtered events with matching keyword correctly when typing in search field', () => {
    renderWithRouter(<Home meetups={getAllMeetups()} setMeetups={jest.fn()} />)

    const searchBox = screen.getByRole('searchbox')

    userEvent.type(searchBox, 'foo')

    const meetupList = screen.getAllByRole('listitem')

    expect(meetupList).toHaveLength(2)
    expect(meetupList[0]).toHaveTextContent(/sevilla/i)
    expect(meetupList[1]).toHaveTextContent(/pizza/i)

    userEvent.type(searchBox, 't')

    expect(screen.getAllByRole('listitem')).toHaveLength(1)

    expect(screen.getAllByRole('listitem')[0]).toHaveTextContent(/sevilla/i)
  })
  it('shows only past events when pastEvents filter is active', () => {
    renderWithRouter(<Home meetups={getAllMeetups()} setMeetups={jest.fn()} />)

    const filterSelect = screen.getByRole('combobox')

    userEvent.selectOptions(filterSelect, 'past')

    const meetupList = screen.getAllByRole('listitem')

    expect(meetupList).toHaveLength(2)
    expect(meetupList[0]).toHaveTextContent(/pizza/i)
  })
  it('shows only upcoming events when upcomingEvents filter is active', () => {
    renderWithRouter(<Home meetups={getAllMeetups()} setMeetups={jest.fn()} />)

    const filterSelect = screen.getByRole('combobox')

    userEvent.selectOptions(filterSelect, 'upcoming')

    const meetupList = screen.getAllByRole('listitem')

    expect(meetupList).toHaveLength(4)
    expect(meetupList[0]).toHaveTextContent(/rust/i)
  })
})
