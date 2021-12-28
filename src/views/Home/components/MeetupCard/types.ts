import { Meetup } from '../../../../db/models/Meetup'

export type MeetupCardProps = {
  meetup: Meetup
  upcoming?: boolean
}
