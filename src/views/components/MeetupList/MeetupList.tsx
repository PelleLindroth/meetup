import MeetupCard from '../MeetupCard'
import styles from './MeetupList.module.scss'
import { MeetupListProps } from './types'

const MeetupList = (props: MeetupListProps) => {
  const { meetups, upcoming, own } = props

  return (
    <ul
      data-testid={
        own
          ? upcoming
            ? 'own-upcoming-events'
            : 'own-past-events'
          : upcoming
          ? 'upcoming-events'
          : 'past-events'
      }
      className={styles.meetupList}
    >
      {meetups.map((meetup) => (
        <MeetupCard key={meetup.id} meetup={meetup} upcoming={upcoming} />
      ))}
    </ul>
  )
}

export default MeetupList
