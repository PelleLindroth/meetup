import { Meetup } from '../../db/meetups'

export type HomeProps = {
  meetups: Meetup[]
  setMeetups: React.Dispatch<React.SetStateAction<Meetup[]>>
}
