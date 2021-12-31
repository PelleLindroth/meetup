import {
  signUpForEvent,
  cancelSignUpForEvent,
  storeUserDetails,
} from '../../../../db'
import { MeetupHeaderProps } from '../../types'
import styles from '../../SingleMeetup.module.scss'

const MeetupHeader = (props: MeetupHeaderProps) => {
  const {
    meetup,
    user,
    isUpcomingEvent,
    isFullyBooked,
    attending,
    setAttending,
  } = props

  const handleSignUp = () => {
    signUpForEvent(meetup, user!)
    setAttending(true)
    storeUserDetails(user!.id)
  }

  const handleCancel = () => {
    cancelSignUpForEvent(meetup, user!)
    setAttending(false)
    storeUserDetails(user!.id)
  }

  return (
    <section>
      <h1
        className={isUpcomingEvent ? styles.upcomingHeader : styles.pastHeader}
      >
        {meetup.title}
      </h1>
      <h2>{meetup.description}</h2>
      {isFullyBooked ? (
        <p className={styles.red}>This event is fully booked</p>
      ) : (
        <>
          {isUpcomingEvent && user && !attending && (
            <button onClick={handleSignUp} className={styles.signUpButton}>
              Sign up for this event
            </button>
          )}
          {isUpcomingEvent && user && attending && (
            <div className={styles.signedUpMessage}>
              <p>You have signed up for this event!</p>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default MeetupHeader
