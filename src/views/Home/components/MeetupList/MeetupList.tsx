import MeetupCard from '../MeetupCard'
import styles from './MeetupList.module.scss'
import { MeetupListProps } from './types'

const MeetupList = (props: MeetupListProps) => {
  const { meetups, upcoming } = props

  return (
    <ul
      data-testid={upcoming ? 'upcoming-events' : 'past-events'}
      className={styles.meetupList}
    >
      {meetups.map((meetup) => (
        <MeetupCard
          key={meetup.id}
          meetup={meetup}
          upcoming={upcoming ? true : false}
        />
      ))}
    </ul>
  )
}

export default MeetupList
