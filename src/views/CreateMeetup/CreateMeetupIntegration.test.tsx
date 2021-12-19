import { getUserById } from '../../db'
import { renderWithRouter } from '../../utils/testing-utils'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'

describe('Create meetup integration tests', () => {
  const user = getUserById('1')

  it('creates new meetup and renders profile page with new meetup after creating', async () => {
    renderWithRouter(<App />)

    const loginButton = screen.getByRole('button', { name: /log in/i })

    userEvent.click(loginButton)

    const emailInput = await screen.findByRole('textbox', { name: /email/i })
    const passwordInput = await screen.findByLabelText('Password')
    const submitButton = await screen.findByRole('button', { name: /submit/i })

    userEvent.type(emailInput, user!.email)
    userEvent.type(passwordInput, user!.password)
    userEvent.click(submitButton)

    const profileIcon = screen.getByRole('img', { name: /profile/i })

    userEvent.click(profileIcon)

    const createMeetupLink = screen.getByText(/create/i)

    userEvent.click(createMeetupLink)

    const titleInput = screen.getByRole('textbox', { name: /title/i })
    const descriptionInput = screen.getByRole('textbox', {
      name: /description/i,
    })
    const onlineCheckbox = screen.getByRole('checkbox', { name: /online/i })

    userEvent.type(titleInput, 'New Meetup')
    userEvent.type(descriptionInput, 'A new meetup to test functionality')
    userEvent.click(onlineCheckbox)

    const urlInput = screen.getByRole('textbox', { name: /url/i })

    userEvent.type(urlInput, 'https://github.com/PelleLindroth/meetup')

    const createButton = screen.getByRole('button', { name: /create/i })

    userEvent.click(createButton)

    const welcomeMessage = await screen.findByText(/welcome/i)
    const listItems = await screen.findAllByRole('listitem')

    const newMeetup = listItems.find(
      (item) => !!item.textContent!.match(/new meetup/i)
    )

    expect(welcomeMessage).toHaveTextContent(`Welcome ${user!.firstName}`)
    expect(newMeetup).toBeInTheDocument()
  })
  it('goes back to profile page if cancel button is clicked', async () => {
    renderWithRouter(<App />)

    const loginButton = screen.getByRole('button', { name: /log in/i })

    userEvent.click(loginButton)

    const emailInput = await screen.findByRole('textbox', { name: /email/i })
    const passwordInput = await screen.findByLabelText('Password')
    const submitButton = await screen.findByRole('button', { name: /submit/i })

    userEvent.type(emailInput, user!.email)
    userEvent.type(passwordInput, user!.password)
    userEvent.click(submitButton)

    const profileIcon = screen.getByRole('img', { name: /profile/i })

    userEvent.click(profileIcon)

    const createMeetupLink = screen.getByText(/create/i)

    userEvent.click(createMeetupLink)

    const cancelButton = screen.getByRole('button', { name: /cancel/i })

    userEvent.click(cancelButton)

    const welcomeMessage = screen.getByText(/welcome/i)

    expect(welcomeMessage).toBeInTheDocument()
  })
})
