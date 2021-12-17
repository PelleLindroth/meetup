import { Meetup } from '../../../../db/meetups'

export type MeetupCardProps = {
  meetup: Meetup
  upcoming?: boolean
}
