import MeetupList from '../../components/MeetupList'
import { HomeProps } from './types'

const Home = (props: HomeProps) => {
  const { meetups } = props

  return (
    <section>
      <h2>UPCOMING EVENTS</h2>
      <MeetupList
        meetups={meetups.filter((meetup) => meetup.date.getTime() > Date.now())}
        upcoming
      />
      <h2>PAST EVENTS</h2>
      <MeetupList
        meetups={meetups.filter((meetup) => meetup.date.getTime() < Date.now())}
      />
    </section>
  )
}

export default Home
