import { renderWithPath, mountWithPath } from '../../../../utils/testing-utils'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { getMeetupById, getUserById } from '../../../../db'
import ReviewsSection from './index'

describe('ReviewsSection unit tests', () => {
  const kiteEvent = getMeetupById('4')
  const halloweenEvent = getMeetupById('5')
  const pizzaEvent = getMeetupById('1')
  const userLoffe = getUserById('4')

  it('renders ReviewsSection correctly (smoke test)', () => {
    const wrapper = mountWithPath(
      <ReviewsSection meetup={pizzaEvent!} user={null} />,
      `/meetup/${pizzaEvent!.id}`,
      'meetup/:id'
    )

    expect(wrapper.find(ReviewsSection)).toMatchSnapshot()
  })
  it('renders a median rating for past event', () => {
    renderWithPath(
      <ReviewsSection meetup={pizzaEvent!} user={null} />,
      `/meetup/${pizzaEvent!.id}`,
      'meetup/:id'
    )

    const score = screen.getByText(/score/i)

    expect(score).toHaveTextContent(
      'This event has a 4.5 score out of 5 possible after 2 votes'
    )
  })
  it('renders a message if no reviews were submitted', () => {
    renderWithPath(
      <ReviewsSection meetup={halloweenEvent!} user={null} />,
      `/meetup/${halloweenEvent!.id}`,
      'meetup/:id'
    )

    const noRatingsMessage = screen.getByText(/no ratings/i)

    expect(noRatingsMessage).toHaveTextContent('This event has no ratings yet')
  })
  it('does not render a review score for upcoming event', () => {
    renderWithPath(
      <ReviewsSection meetup={kiteEvent!} user={null} />,
      `/meetup/${kiteEvent!.id}`,
      'meetup/:id'
    )

    const score = screen.queryByText(/score/i)

    expect(score).not.toBeInTheDocument()
  })
  it('renders a Rate this event button if user is logged in and has attended', () => {
    renderWithPath(
      <ReviewsSection meetup={pizzaEvent!} user={userLoffe!} />,
      `/meetup/${pizzaEvent!.id}`,
      'meetup/:id'
    )

    const rateButton = screen.getByRole('button')

    expect(rateButton).toBeInTheDocument()
  })
  it('renders a review form with select input when add review button is clicked', () => {
    renderWithPath(
      <ReviewsSection meetup={pizzaEvent!} user={userLoffe!} />,
      `/meetup/${pizzaEvent!.id}`,
      'meetup/:id'
    )

    const rateButton = screen.getByRole('button')

    userEvent.click(rateButton)

    const reviewSelectInput = screen.getByRole('combobox')

    expect(reviewSelectInput).toBeInTheDocument()
  })
  it('updates after submitted review to display new median value and number of submitted ratings', () => {
    renderWithPath(
      <ReviewsSection meetup={pizzaEvent!} user={userLoffe!} />,
      `/meetup/${pizzaEvent!.id}`,
      'meetup/:id'
    )

    const rateButton = screen.getByRole('button', { name: /rate/i })

    userEvent.click(rateButton)

    const reviewSelectInput = screen.getByRole('combobox')

    userEvent.selectOptions(reviewSelectInput, '1 - Awful')

    const submitButton = screen.getByRole('button', { name: /submit/i })

    userEvent.click(submitButton)

    const score = screen.getByText(/score/i)

    expect(score).toHaveTextContent(
      'This event has a 3.3 score out of 5 possible after 3 votes'
    )
  })
})
