import { User } from '../../db/users'
import { Meetup } from '../../db/meetups'

export type SingleMeetupProps = {
  user: User | null
}

export type MeetupHeaderProps = {
  meetup: Meetup
  isUpcomingEvent: boolean
}

export type ReviewsSectionProps = {
  meetup: Meetup
  user: User | null
}

export type DetailsSectionProps = {
  meetup: Meetup
  isUpcomingEvent: boolean
}

export type ArrangerSectionprops = {
  meetup: Meetup
}

export type CapacitySectionProps = {
  meetup: Meetup
  isUpcomingEvent: boolean
}

export type CommentsSectionProps = {
  meetup: Meetup
  user: User | null
}
