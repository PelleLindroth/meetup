import { uid } from 'uid'
import { useState } from 'react'
import { Review } from '../../../../../db/meetups'
import { addReview } from '../../../../../db'
import styles from '../../../SingleMeetup.module.scss'
import { RatingFormProps } from '../../../types'

const RatingForm = (props: RatingFormProps) => {
  const { meetup, user, setMedianRating, setShowSelectInput } = props
  const [rating, setRating] = useState<number>(1)

  const handleRateEvent = (e: React.SyntheticEvent) => {
    e.preventDefault()

    const review: Review = {
      id: uid(),
      meetupId: meetup.id,
      rating,
    }

    addReview(meetup.id, user!.id, review)
    meetup.reviews.push(review)

    setMedianRating(
      meetup.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
        meetup.reviews.length
    )
    setShowSelectInput(false)
  }

  return (
    <form className={styles.ratingForm} onSubmit={handleRateEvent}>
      <label htmlFor="rate-event">How do you rate this event?</label>
      <select
        value={rating}
        onChange={(e) => setRating(+e.currentTarget.value)}
        name="rate-event"
        id="rate-event"
      >
        <option value={1}>1 - Awful</option>
        <option value={2}>2 - Not so good</option>
        <option value={3}>3 - It was ok</option>
        <option value={4}>4 - Nice meetup!</option>
        <option value={5}>5 - Fantastic!!</option>
      </select>
      <button>Submit</button>
    </form>
  )
}

export default RatingForm
