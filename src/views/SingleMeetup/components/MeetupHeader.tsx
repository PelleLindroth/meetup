import { MeetupHeaderProps } from '../types'
import styles from '../SingleMeetup.module.scss'

const MeetupHeader = (props: MeetupHeaderProps) => {
  const { meetup, user, isUpcomingEvent } = props
  return (
    <>
      <h1
        className={isUpcomingEvent ? styles.upcomingHeader : styles.pastHeader}
      >
        {meetup.title}
      </h1>
      <h2>{meetup.description}</h2>
      {isUpcomingEvent && user && !user.attending.includes(meetup.id) && (
        <button className={styles.signUpButton}>Sign up for this event</button>
      )}
      {isUpcomingEvent && user && user.attending.includes(meetup.id) && (
        <div className={styles.signedUpMessage}>
          <p>You have signed up for this event!</p>
        </div>
      )}
    </>
  )
}

export default MeetupHeader
