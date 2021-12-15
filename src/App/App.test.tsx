import { mount } from 'enzyme'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../utils/testing-utils'
import { MemoryRouter } from 'react-router'
import App from '../App'
import Home from '../views/Home'
import userEvent from '@testing-library/user-event'

describe('App unit tests', () => {
  it('renders App correctly', () => {
    const wrapper = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    expect(wrapper.find(App)).toMatchSnapshot()
  })
  it('renders a Header with logo and login button', () => {
    renderWithRouter(<App />)

    const header = screen.getByRole('banner')
    const logo = screen.getByAltText('logo')
    const loginButton = screen.getByRole('button', { name: /log in/i })

    expect(header).toBeInTheDocument()
    expect(logo).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument()
  })
  it('initially renders Home view with 2 lists with a total of 4 meetups', () => {
    const wrapper = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    expect(wrapper.find(Home).find('ul')).toHaveLength(2)
    expect(wrapper.find(Home).find('li')).toHaveLength(4)
  })
})

describe('App integration tests', () => {
  it('renders login view when log in button is clicked', async () => {
    renderWithRouter(<App />)

    const loginButton = screen.getByRole('button', { name: /log in/i })

    userEvent.click(loginButton)

    const loginForm = await screen.findByRole('form')

    expect(loginForm).toBeInTheDocument()
  })
})

// App

// Home view
// shows meetup details on separate page when clicking arrow link
// renders existing comments and reviews on past events on detail page
