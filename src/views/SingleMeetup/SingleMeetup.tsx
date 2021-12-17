import { useParams } from 'react-router'
import { getMeetupById } from '../../db'
import {
  MeetupHeader,
  DetailsSection,
  ArrangerSection,
  CapacitySection,
  ReviewsSection,
  CommentsSection,
  LoginInfoSection,
} from './components'
import { SingleMeetupProps } from './types'
import styles from './SingleMeetup.module.scss'

const SingleMeetup = (props: SingleMeetupProps) => {
  const { id } = useParams()
  const meetup = getMeetupById(id!)
  const { user } = props

  if (!meetup) {
    return <h2>Meetup not found</h2>
  }

  const isUpcomingEvent = meetup.date.getTime() > Date.now()

  return (
    <main className={styles.meetup}>
      <MeetupHeader
        meetup={meetup}
        isUpcomingEvent={isUpcomingEvent}
        user={user}
      />
      <DetailsSection meetup={meetup} isUpcomingEvent={isUpcomingEvent} />
      <ArrangerSection meetup={meetup} />
      <CapacitySection meetup={meetup} isUpcomingEvent={isUpcomingEvent} />
      {!isUpcomingEvent && <ReviewsSection user={user} meetup={meetup} />}
      <CommentsSection meetup={meetup} user={user} />
      {!user && <LoginInfoSection />}
    </main>
  )
}

export default SingleMeetup
