import { ReviewsSectionProps } from '../types'
import styles from '../SingleMeetup.module.scss'
import StarIcon from '../../../assets/icons/star-empty.png'

const ReviewsSection = (props: ReviewsSectionProps) => {
  const { user, meetup } = props

  return (
    <section className={styles.reviews}>
      <div className={styles.reviewRow}>
        <img src={StarIcon} alt="Star icon" />
        {meetup.reviews.length ? (
          <p>{`This event has a ${
            meetup.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
            meetup.reviews.length
          } score out of 5 possible after ${meetup.reviews.length} votes`}</p>
        ) : (
          <p>This event has no ratings yet</p>
        )}
      </div>
      {user &&
        user.attended.includes(meetup.id) &&
        (!user.reviewed.includes(meetup.id) ? (
          <button>Rate this event</button>
        ) : (
          <p>You already rated this event</p>
        ))}
    </section>
  )
}

export default ReviewsSection
