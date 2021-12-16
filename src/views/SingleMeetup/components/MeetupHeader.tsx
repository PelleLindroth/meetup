import { MeetupHeaderProps } from '../types'
import styles from '../SingleMeetup.module.scss'

const MeetupHeader = (props: MeetupHeaderProps) => {
  const { isUpcomingEvent, meetup } = props
  return (
    <>
      <h1
        className={isUpcomingEvent ? styles.upcomingHeader : styles.pastHeader}
      >
        {meetup.title}
      </h1>
      <h2>{meetup.description}</h2>
    </>
  )
}

export default MeetupHeader
