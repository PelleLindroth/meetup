import { useContext } from 'react'
import { useParams } from 'react-router'
import { getUserById } from '../../db'
import { createUserLists } from '../../utils'
import { DateContext } from '../../contexts/DateContext'
import { Meetup } from '../../db/models/Meetup'
import MeetupList from '../Home/components/MeetupList'
import styles from './Profile.module.scss'

const Profile = (props: { meetups: Meetup[] }) => {
  const { customDate } = useContext(DateContext)!
  const { id } = useParams()
  const user = getUserById(id!)
  const { meetups } = props

  const { ownUpcoming, ownPast, upcomingAttending, pastAttended } =
    createUserLists(user!, meetups, customDate)

  return (
    <main>
      <div className={styles.profile}>{`Welcome ${user!.firstName}!`}</div>
      {!!ownUpcoming.length && (
        <section>
          <h2>Upcoming meetups you're arranging</h2>
          <MeetupList
            own
            upcoming
            aria-label="user-meetups"
            meetups={ownUpcoming}
          />
          <hr />
        </section>
      )}
      {!!ownPast.length && (
        <section>
          <h2>Past meetups you've arranged</h2>
          <MeetupList own aria-label="user-meetups" meetups={ownPast} />
          <hr />
        </section>
      )}
      {!!upcomingAttending.length && (
        <section>
          <h2>Upcoming meetups you're attending</h2>
          <MeetupList
            upcoming
            aria-label="user-meetups"
            meetups={upcomingAttending}
          />
          <hr />
        </section>
      )}
      {!!pastAttended.length && (
        <section>
          <h2>Past meetups you attended</h2>
          <MeetupList aria-label="user-meetups" meetups={pastAttended} />
        </section>
      )}
    </main>
  )
}

export default Profile
