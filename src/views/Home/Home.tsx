import { Meetup } from '../../db/meetups'
import MeetupList from '../../components/MeetupList'

type HomeProps = {
  meetups: Meetup[]
  setMeetups: React.Dispatch<React.SetStateAction<Meetup[]>>
}

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
