import { User } from '../../db/users'
import { Meetup } from '../../db/meetups'

export type SingleMeetupProps = {
  user: User | null
}

export type MeetupHeaderProps = {
  attending: boolean
  setAttending: React.Dispatch<React.SetStateAction<boolean>>
  meetup: Meetup
  user: User | null
  isUpcomingEvent: boolean
}

export type ReviewsSectionProps = {
  meetup: Meetup
  user: User | null
}

export type DetailsSectionProps = {
  attending: boolean
  setAttending: React.Dispatch<React.SetStateAction<boolean>>
  meetup: Meetup
  user: User | null
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

export type CommentFormProps = {
  meetup: Meetup
  user: User | null
  setShowCommentForm: React.Dispatch<React.SetStateAction<boolean>>
}

export type RatingFormProps = {
  meetup: Meetup
  user: User
  setMedianRating: React.Dispatch<React.SetStateAction<number>>
  setShowSelectInput: React.Dispatch<React.SetStateAction<boolean>>
}
