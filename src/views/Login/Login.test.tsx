import { mount } from 'enzyme'
import { screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { renderWithRouter } from '../../utils/testing-utils'
import Login from './index'
import userEvent from '@testing-library/user-event'

describe('Login', () => {
  it('renders login form with two empty inputs and a button', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Login setUser={jest.fn()} />
      </MemoryRouter>
    )

    expect(wrapper.find(Login)).toMatchSnapshot()
    expect(wrapper.find(Login).find('input').at(0).text()).toBe('')
    expect(wrapper.find(Login).find('input').at(1).text()).toBe('')
    expect(wrapper.find(Login).find('button').text()).toBe('Submit')
  })
  it('disables login button by default', () => {
    renderWithRouter(<Login setUser={jest.fn()} />)

    const loginButton = screen.getByRole('button', { name: /submit/i })

    expect(loginButton).toBeDisabled()
  })
  it('calls setUser once if email and password are correct', () => {
    const setUserSpy = jest.fn()

    renderWithRouter(<Login setUser={setUserSpy} />)

    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /submit/i })

    userEvent.type(emailInput, 'kenta@yahoo.com')
    userEvent.type(passwordInput, 'bananpaj')
    userEvent.click(loginButton)

    expect(setUserSpy).toHaveBeenCalled()
  })
})

// it displays an error message if credentials are invalid
