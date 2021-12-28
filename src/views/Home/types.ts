import { Meetup } from '../../db/models/Meetup'

export type HomeProps = {
  meetups: Meetup[]
  setMeetups: React.Dispatch<React.SetStateAction<Meetup[]>>
}
