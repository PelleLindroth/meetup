import { Meetup } from '../../db/models/Meetup'
import { ListType } from '../../utils'

export type HomeProps = {
  meetups: Meetup[]
}

export type MeetupSectionProps = {
  meetups: Meetup[]
  filter: ListType
  searchFilter: ListType
  searchPhrase: string
}
