import { UserImpl } from '../../db/models/User'
import { Meetup } from '../../db/models/Meetup'

export type SingleMeetupProps = {
  meetups: Meetup[]
  user: UserImpl | null
}

export type MeetupHeaderProps = {
  attending: boolean
  setAttending: React.Dispatch<React.SetStateAction<boolean>>
  meetup: Meetup
  user: UserImpl | null
  isUpcomingEvent: boolean
}

export type ReviewsSectionProps = {
  meetup: Meetup
  user: UserImpl | null
}

export type DetailsSectionProps = {
  attending: boolean
  setAttending: React.Dispatch<React.SetStateAction<boolean>>
  meetup: Meetup
  user: UserImpl | null
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
  user: UserImpl | null
}

export type CommentFormProps = {
  meetup: Meetup
  user: UserImpl | null
  setShowCommentForm: React.Dispatch<React.SetStateAction<boolean>>
}

export type RatingFormProps = {
  meetup: Meetup
  user: UserImpl
  setMedianRating: React.Dispatch<React.SetStateAction<number>>
  setShowSelectInput: React.Dispatch<React.SetStateAction<boolean>>
}
