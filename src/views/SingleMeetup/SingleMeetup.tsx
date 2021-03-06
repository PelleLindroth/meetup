import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { DateContext } from '../../contexts/DateContext'
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
  const { user, meetups } = props
  const { customDate, realDate } = useContext(DateContext)!
  const { id } = useParams()
  const meetup = meetups.find((item) => item.id === id)
  const [attending, setAttending] = useState<boolean>(false)
  const [isFullyBooked, setIsFullyBooked] = useState<boolean>(false)
  const [isUpcomingEvent, setIsUpcomingEvent] = useState<boolean>(false)

  useEffect(() => {
    if (user && meetup) {
      setAttending(user.attending.includes(meetup.id))
    }
    if (meetup && meetup.capacity) {
      if (meetup.capacity - meetup.attending < 1) {
        setIsFullyBooked(true)
      }
    }
  }, [meetup, meetup?.id, user])

  useEffect(() => {
    if (meetup) {
      setIsUpcomingEvent(
        meetup.date.getTime() > (customDate?.getTime() || realDate.getTime())
      )
    }
  }, [meetup, customDate, realDate])

  if (!meetup) {
    return <h2 className={styles.meetup}>Meetup not found</h2>
  }

  return (
    <main className={styles.meetup}>
      <MeetupHeader
        meetup={meetup}
        user={user}
        attending={attending}
        setAttending={setAttending}
        isUpcomingEvent={isUpcomingEvent}
        isFullyBooked={isFullyBooked}
      />
      <DetailsSection
        meetup={meetup}
        user={user}
        isUpcomingEvent={isUpcomingEvent}
        attending={attending}
        setAttending={setAttending}
      />
      <ArrangerSection meetup={meetup} />
      <CapacitySection
        meetup={meetup}
        isUpcomingEvent={isUpcomingEvent}
        isFullyBooked={isFullyBooked}
      />
      {!isUpcomingEvent && <ReviewsSection user={user} meetup={meetup} />}
      <CommentsSection meetup={meetup} user={user} />
      {!user && <LoginInfoSection />}
    </main>
  )
}

export default SingleMeetup
