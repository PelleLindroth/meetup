import { Meetup } from '../../../db/models/Meetup'

export type MeetupListProps = {
  meetups: Meetup[]
  upcoming?: boolean
  own?: boolean
}
