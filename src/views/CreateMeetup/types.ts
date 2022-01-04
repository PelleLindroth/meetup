import { User } from '../../db/models/User'
import { Meetup } from '../../db/models/Meetup'

export type CreateMeetupProps = {
  user: User
  meetups: Meetup[]
  setMeetups: React.Dispatch<React.SetStateAction<Meetup[]>>
}

export type KeywordSectionProps = {
  keywords: string[]
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>
}
