import { User } from '../../db/models/User'
import { Meetup, IAddress } from '../../db/models/Meetup'

export type CreateMeetupProps = {
  user: User
  meetups: Meetup[]
  setMeetups: React.Dispatch<React.SetStateAction<Meetup[]>>
}

export type KeywordSectionProps = {
  keywords: string[]
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>
}

export type SubmitSectionProps = {
  handleCancel: () => void
  emptyFields: () => boolean
}

export type DetailsSectionProps = {
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  description: string
  setDescription: React.Dispatch<React.SetStateAction<string>>
  date: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
}

export type AddressSectionProps = {
  isOnlineEvent: boolean
  setIsOnlineEvent: React.Dispatch<React.SetStateAction<boolean>>
  url: string
  setUrl: React.Dispatch<React.SetStateAction<string>>
  address: IAddress
  setAddress: React.Dispatch<React.SetStateAction<IAddress>>
}

export type CapacitySectionProps = {
  maxCapacity: number
  setMaxCapacity: React.Dispatch<React.SetStateAction<number>>
  hasMaxCapacity: boolean
  setHasMaxCapacity: React.Dispatch<React.SetStateAction<boolean>>
}
