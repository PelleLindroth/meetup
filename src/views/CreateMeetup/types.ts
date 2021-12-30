import { User } from '../../db/models/User'
import { Meetup } from '../../db/models/Meetup'

export type CreateMeetupProps = {
  user: User
  meetups: Meetup[]
  setMeetups: React.Dispatch<React.SetStateAction<Meetup[]>>
}
