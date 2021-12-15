import { Meetup } from '../../db/meetups'

export type MeetupListProps = {
  meetups: Meetup[]
  upcoming?: boolean
}
