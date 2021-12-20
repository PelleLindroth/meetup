import { User } from '../../db/users'
import { Meetup } from '../../db/meetups'

export type CreateMeetupProps = {
  user: User
  meetups: Meetup[]
  setMeetups: React.Dispatch<React.SetStateAction<Meetup[]>>
}
