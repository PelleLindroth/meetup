import { useNavigate, useParams } from 'react-router'
import { getMeetupById, getUserById } from '../../db'
import { SingleMeetupProps } from './types'
import { formatDate } from '../../utils'
import Pin from '../../assets/icons/pin.png'
import Time from '../../assets/icons/time.png'
import User from '../../assets/icons/user.png'
import UserGroup from '../../assets/icons/user-group.png'
import House from '../../assets/icons/house.png'
import Star from '../../assets/icons/star-empty.png'
import Comment from '../../assets/icons/chat.png'
import styles from './SingleMeetup.module.scss'

const SingleMeetup = (props: SingleMeetupProps) => {
  const { user } = props
  const { id } = useParams()
  const meetup = getMeetupById(id!)
  const navigate = useNavigate()

  if (!meetup) {
    return <h2>Meetup not found</h2>
  }

  const isUpcomingEvent = meetup.date.getTime() > Date.now()

  return (
    <div className={styles.meetup}>
      <h1
        className={isUpcomingEvent ? styles.upcomingHeader : styles.pastHeader}
      >
        {meetup.title}
      </h1>
      <h2>{meetup.description}</h2>
      <section id="meetup-details" className={styles.details}>
        <div title="location" className={styles.locationRow}>
          <img src={Pin} alt="Map pin icon" />
          <p>
            {meetup.online
              ? 'Online event'
              : `${meetup!.location!.street}, ${meetup!.location!.city}`}
          </p>
        </div>
        <div title="date" className={styles.dateRow}>
          <img src={Time} alt="Time icon" />
          <p>
            {formatDate(meetup.date)}{' '}
            {!isUpcomingEvent && (
              <em className={styles.note}>(Event already took place)</em>
            )}
          </p>
        </div>
      </section>
      <section className={styles.arranger}>
        <div className={styles.arrangerHeaderRow}>
          <img src={User} alt="User icon" />
          <h3>Arranger:</h3>
        </div>
        <p>{`${meetup!.arranger.firstName} ${meetup!.arranger.lastName}`}</p>
        <p>Email: {meetup.arranger.email}</p>
      </section>
      <section className={styles.capacity}>
        {isUpcomingEvent && (
          <div className={styles.capacityRow}>
            <img src={House} alt="House icon" />
            <p className={styles.capacityInfo}>
              <strong>Capacity: </strong>
              {meetup.capacity
                ? meetup.capacity
                : meetup.online
                ? 'This is an online event with unlimited capacity'
                : 'This event has unlimited capacity'}
            </p>
          </div>
        )}
        <div className={styles.capacityInfo}>
          {meetup.capacity ? (
            <div className={styles.attendedRow}>
              <img src={UserGroup} alt="User group icon" />
              <p>
                <strong>Attending: </strong> {` ${meetup.attending}, `}
                <span className={styles.available}>
                  <em>{` ${meetup.capacity - meetup.attending} available`}</em>
                </span>
              </p>
            </div>
          ) : (
            <div className={styles.attendedRow}>
              <img src={UserGroup} alt="User group icon" />
              {isUpcomingEvent ? (
                <p>
                  <strong>{'Attending: '}</strong> {` ${meetup.attending}`}
                </p>
              ) : (
                `${meetup.attending} people attended this event`
              )}
            </div>
          )}
        </div>
      </section>
      {!isUpcomingEvent && (
        <section className={styles.reviews}>
          <div className={styles.reviewRow}>
            <img src={Star} alt="Star icon" />
            {meetup.reviews.length ? (
              <p>{`This event has a ${
                meetup.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
                meetup.reviews.length
              } score out of 5 possible after ${
                meetup.reviews.length
              } votes`}</p>
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
      )}
      <section className={styles.comments}>
        <div className={styles.commentHeaderRow}>
          <img src={Comment} alt="Comment icon" />
          <h3>Comments</h3>
        </div>

        {meetup.comments.length ? (
          <ul className={styles.commentList}>
            {meetup.comments.map((comment) => {
              const author = getUserById(comment.userId)

              return (
                <li
                  title="comment"
                  key={comment.id}
                  className={styles.commentCard}
                >
                  <p className={styles.commentText}>{comment.text}</p>
                  <p className={styles.commentSignature}>
                    <em>{`${`- ${author?.firstName} ${author?.lastName}`}, ${formatDate(
                      comment.submittedAt
                    )}`}</em>
                  </p>
                </li>
              )
            })}
          </ul>
        ) : (
          <p>This event has no comments yet</p>
        )}
        {user && user.attended.includes(meetup.id) && (
          <button>Add comment</button>
        )}
      </section>
      {!user && (
        <section
          className={styles.loginInfo}
          title="Log in to attend, comment and review Meetups"
        >
          <h3>Log in for a better experience</h3>
          <p>
            Logged in users can register for events, as well as comment and rate
            them!
          </p>
          <button onClick={() => navigate('/login')}>Go to Login page</button>
        </section>
      )}
    </div>
  )
}

export default SingleMeetup
