import { useEffect, useState } from 'react'
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
  const [attending, setAttending] = useState<boolean>(false)

  useEffect(() => {
    if (user && meetup) {
      setAttending(user.attending.includes(meetup.id))
    }
  }, [meetup, meetup?.id, user])

  if (!meetup) {
    return <h2 className={styles.meetup}>Meetup not found</h2>
  }

  const isUpcomingEvent = meetup.date.getTime() > Date.now()

  return (
    <main className={styles.meetup}>
      <MeetupHeader
        meetup={meetup}
        isUpcomingEvent={isUpcomingEvent}
        user={user}
        attending={attending}
        setAttending={setAttending}
      />
      <DetailsSection
        meetup={meetup}
        user={user}
        isUpcomingEvent={isUpcomingEvent}
        attending={attending}
        setAttending={setAttending}
      />
      <ArrangerSection meetup={meetup} />
      <CapacitySection meetup={meetup} isUpcomingEvent={isUpcomingEvent} />
      {!isUpcomingEvent && <ReviewsSection user={user} meetup={meetup} />}
      <CommentsSection meetup={meetup} user={user} />
      {!user && <LoginInfoSection />}
    </main>
  )
}

export default SingleMeetup
