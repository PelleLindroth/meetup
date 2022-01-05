import { User } from '../db/models/User'
import { Meetup } from '../db/models/Meetup'

export const formatDate = (date: Date) => {
  return `${new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date)}`
}

const sortAndReturnMeetupsChronologically = (meetups: Meetup[]) => {
  return meetups.sort((a, b) => a.date.getTime() - b.date.getTime())
}

export type ListType = 'upcoming' | 'past' | 'all'

export const createMeetupList = (
  meetups: Meetup[],
  listType: ListType,
  searchPhrase: string,
  searchFilter: ListType,
  customDate: Date
) => {
  const meetupList = meetups.filter((meetup) => {
    if (listType === 'past') {
      return (
        meetup.date.getTime() <= customDate.getTime() &&
        (meetup.title.toLowerCase().includes(searchPhrase.toLowerCase()) ||
          matchesKeyword(meetup, searchPhrase)) &&
        (searchFilter === listType || searchFilter === 'all')
      )
    } else {
      return (
        meetup.date.getTime() > customDate.getTime() &&
        (meetup.title.toLowerCase().includes(searchPhrase.toLowerCase()) ||
          matchesKeyword(meetup, searchPhrase)) &&
        (searchFilter === listType || searchFilter === 'all')
      )
    }
  })

  return sortAndReturnMeetupsChronologically(meetupList)
}

export const createUserLists = (
  user: User,
  meetups: Meetup[],
  customDate: Date
) => {
  return {
    ownUpcoming: sortAndReturnMeetupsChronologically(
      meetups.filter(
        (meetup: Meetup) =>
          meetup.arranger.id === user!.id &&
          meetup.date.getTime() > customDate.getTime()
      )
    ),
    ownPast: sortAndReturnMeetupsChronologically(
      meetups.filter(
        (meetup: Meetup) =>
          meetup.arranger.id === user!.id &&
          meetup.date.getTime() <= customDate.getTime()
      )
    ),
    upcomingAttending: sortAndReturnMeetupsChronologically(
      meetups.filter(
        (meetup: Meetup) =>
          user!.attending.includes(meetup.id) &&
          meetup.date.getTime() > customDate.getTime()
      )
    ),
    pastAttended: sortAndReturnMeetupsChronologically(
      meetups.filter(
        (meetup: Meetup) =>
          user!.attending.includes(meetup.id) &&
          meetup.date.getTime() <= customDate.getTime()
      )
    ),
  }
}

const matchesKeyword = (meetup: Meetup, searchPhrase: string): boolean => {
  if (!searchPhrase.length) return true
  let matchesKeyword = false

  meetup.keywords.forEach((keyword) => {
    if (keyword.includes(searchPhrase.toLowerCase())) {
      matchesKeyword = true
    }
  })

  return matchesKeyword
}
