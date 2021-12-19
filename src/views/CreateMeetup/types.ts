import { User } from '../../db/users'
import { Meetup } from '../../db/meetups'

export type CreateMeetupProps = {
  user: User
  setMeetups: React.Dispatch<React.SetStateAction<Meetup[]>>
}
