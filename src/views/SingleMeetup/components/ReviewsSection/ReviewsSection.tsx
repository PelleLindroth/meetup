import { useEffect, useState } from 'react'
import { ReviewsSectionProps } from '../../types'
import StarIcon from '../../../../assets/icons/star-empty.png'
import RatingForm from './components/RatingForm'
import styles from '../../SingleMeetup.module.scss'

const ReviewsSection = (props: ReviewsSectionProps) => {
  const { user, meetup } = props
  const [showSelectInput, setShowSelectInput] = useState<boolean>(false)
  const [medianRating, setMedianRating] = useState<number>(0)

  useEffect(() => {
    setMedianRating(
      meetup.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
        meetup.reviews.length
    )
  }, [meetup.reviews])

  return (
    <section className={styles.reviews}>
      <div className={styles.headerRow}>
        <img src={StarIcon} alt="Star icon" />
        <h3>Ratings</h3>
      </div>
      {meetup.reviews.length ? (
        <p>
          {`This event has a `}
          <span className={styles.rating}>{`${(
            Math.round(medianRating * 100) / 100
          ).toFixed(1)}`}</span>
          {` score out of 5 possible after ${meetup.reviews.length} votes`}
        </p>
      ) : (
        <p>This event has no ratings yet</p>
      )}
      {user &&
        user.attended.includes(meetup.id) &&
        (!user.reviewed.includes(meetup.id) ? (
          <>
            {showSelectInput ? (
              <RatingForm
                meetup={meetup}
                user={user}
                setMedianRating={setMedianRating}
                setShowSelectInput={setShowSelectInput}
              />
            ) : (
              <button onClick={() => setShowSelectInput(true)}>
                Rate this event
              </button>
            )}
          </>
        ) : (
          <p>You already rated this event</p>
        ))}
    </section>
  )
}

export default ReviewsSection
