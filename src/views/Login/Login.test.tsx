import { screen } from '@testing-library/react'
import { mountWithRouter, renderWithRouter } from '../../utils/testing-utils'
import Login from './index'
import userEvent from '@testing-library/user-event'
import { getMockUsers } from '../../db'

describe('Login Unit Tests', () => {
  it('renders login form with two empty inputs and a button', () => {
    const wrapper = mountWithRouter(<Login setUser={jest.fn()} />)

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
  it('enables login button when both input fields have text', () => {
    renderWithRouter(<Login setUser={jest.fn()} />)

    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /submit/i })

    userEvent.type(emailInput, 'tjalle')
    userEvent.type(passwordInput, 'grillkorv')

    expect(loginButton).toBeEnabled()
  })
  it('calls setUser once with user object if credentials are valid', () => {
    const setUserSpy = jest.fn()
    const mockUsers = getMockUsers()

    renderWithRouter(<Login setUser={setUserSpy} />)

    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /submit/i })

    userEvent.type(emailInput, mockUsers[0].email)
    userEvent.type(passwordInput, mockUsers[0].password)
    userEvent.click(loginButton)

    expect(setUserSpy).toHaveBeenCalledTimes(1)
    expect(setUserSpy).toHaveBeenCalledWith(mockUsers[0])
  })
  it('displays an error message if credentials are invalid', () => {
    renderWithRouter(<Login setUser={jest.fn()} />)

    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /submit/i })

    userEvent.type(emailInput, 'rolle@ica.se')
    userEvent.type(passwordInput, 'palsternacka123')
    userEvent.click(loginButton)

    const errorMessage = screen.getByText(/invalid/i)

    expect(errorMessage).toBeInTheDocument()
  })
})
