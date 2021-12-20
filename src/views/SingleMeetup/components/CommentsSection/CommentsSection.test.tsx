import { renderWithPath } from '../../../../utils/testing-utils'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { getMeetupById, getUserById } from '../../../../db'
import CommentsSection from '.'

jest.mock('../../../../db')

describe('Comments section unit test', () => {
  const upcomingEvent = getMeetupById('2')
  const pastEvent = getMeetupById('1')
  const user = getUserById('1')

  it('renders an "Add comment" button in comments section of all events', () => {
    renderWithPath(
      <CommentsSection meetup={upcomingEvent!} user={null} />,
      '/meetup/4',
      'meetup/:id'
    )

    const addCommentButton = screen.getByRole('button', {
      name: /add comment/i,
    })

    expect(addCommentButton).toBeInTheDocument()
  })
  it('renders a comment form when clicking Add comment button', () => {
    renderWithPath(
      <CommentsSection meetup={upcomingEvent!} user={null} />,
      `/meetup/${upcomingEvent!.id}`,
      'meetup/:id'
    )

    const addCommentButton = screen.getByRole('button', {
      name: /add comment/i,
    })

    userEvent.click(addCommentButton)

    const commentForm = screen.getByRole('form')

    expect(commentForm).toBeInTheDocument()
  })
  it('disables form submit button by default', () => {
    renderWithPath(
      <CommentsSection meetup={upcomingEvent!} user={null} />,
      `/meetup/${upcomingEvent!.id}`,
      'meetup/:id'
    )

    const addCommentButton = screen.getByRole('button', {
      name: /add comment/i,
    })

    userEvent.click(addCommentButton)

    const submitButton = screen.getByRole('button', { name: /submit/i })

    expect(submitButton).toBeDisabled()
  })
  it('enables submit button when typing in textarea', () => {
    renderWithPath(
      <CommentsSection meetup={upcomingEvent!} user={null} />,
      `/meetup/${upcomingEvent!.id}`,
      'meetup/:id'
    )

    const addCommentButton = screen.getByRole('button', {
      name: /add comment/i,
    })

    userEvent.click(addCommentButton)

    const textInput = screen.getByRole('textbox')

    userEvent.type(textInput, 'hellooo')

    const submitButton = screen.getByRole('button', { name: /submit/i })

    expect(submitButton).toBeEnabled()
  })
  it('closes form when clicking cancel button', () => {
    renderWithPath(
      <CommentsSection meetup={upcomingEvent!} user={null} />,
      `/meetup/${upcomingEvent!.id}`,
      'meetup/:id'
    )

    const addCommentButton = screen.getByRole('button', {
      name: /add comment/i,
    })

    userEvent.click(addCommentButton)

    const cancelButton = screen.getByRole('button', { name: /cancel/i })

    userEvent.click(cancelButton)

    const addCommentInput = screen.queryByRole('textbox')

    expect(addCommentInput).not.toBeInTheDocument()
  })
  it('adds new comment to comments list after submitting', () => {
    renderWithPath(
      <CommentsSection meetup={upcomingEvent!} user={null} />,
      `/meetup/${upcomingEvent!.id}`,
      'meetup/:id'
    )

    const addCommentButton = screen.getByRole('button', {
      name: /add comment/i,
    })

    userEvent.click(addCommentButton)

    const textInput = screen.getByRole('textbox')

    userEvent.type(textInput, 'This is a comment')

    const submitButton = screen.getByRole('button', { name: /submit/i })

    userEvent.click(submitButton)

    const comment = screen.getByRole('listitem')

    expect(comment).toHaveTextContent('This is a comment')
  })
  it('shows user name under comment if user is logged in when submitting', () => {
    renderWithPath(
      <CommentsSection meetup={pastEvent!} user={user!} />,
      `/meetup/${upcomingEvent!.id}`,
      'meetup/:id'
    )

    const comments = screen.getAllByRole('listitem')

    const firstComment = comments[0]
    const userSignature = within(firstComment).getByText(/-\s/)

    expect(userSignature).toHaveTextContent('Kenta Andersson')
  })
  it('shows "You" under logged in user\'s own comments', () => {
    renderWithPath(
      <CommentsSection meetup={pastEvent!} user={user!} />,
      `/meetup/${upcomingEvent!.id}`,
      'meetup/:id'
    )

    const addCommentButton = screen.getByRole('button', {
      name: /add comment/i,
    })

    userEvent.click(addCommentButton)

    const textInput = screen.getByRole('textbox')

    userEvent.type(textInput, 'This is a comment')

    const submitButton = screen.getByRole('button', { name: /submit/i })

    userEvent.click(submitButton)

    const comments = screen.getAllByRole('listitem')

    const latestComment = comments[comments.length - 1]
    const userSignature = within(latestComment).getByText(/-\s/)

    expect(userSignature).toHaveTextContent('You')
  })
  it('shows "Anonymous" under comment if user is not logged in', () => {
    renderWithPath(
      <CommentsSection meetup={upcomingEvent!} user={null} />,
      `/meetup/${upcomingEvent!.id}`,
      'meetup/:id'
    )

    const addCommentButton = screen.getByRole('button', {
      name: /add comment/i,
    })

    userEvent.click(addCommentButton)

    const textInput = screen.getByRole('textbox')

    userEvent.type(textInput, 'This is a comment')

    const submitButton = screen.getByRole('button', { name: /submit/i })

    userEvent.click(submitButton)

    const comments = screen.getAllByRole('listitem')

    const latestComment = comments[comments.length - 1]
    const latestUserSignature = within(latestComment).getByText(/-\s/)

    expect(latestUserSignature).toHaveTextContent('Anonymous')
  })
})
