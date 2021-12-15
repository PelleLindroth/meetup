import { Meetup } from '../../db/meetups'

export type SingleMeetupProps = {
  setMeetups: React.Dispatch<React.SetStateAction<Meetup[]>>
}
