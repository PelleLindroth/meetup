import { UserImpl } from '../../db/models/User'
import { Meetup } from '../../db/models/Meetup'

export type CreateMeetupProps = {
  user: UserImpl
  meetups: Meetup[]
  setMeetups: React.Dispatch<React.SetStateAction<Meetup[]>>
}
