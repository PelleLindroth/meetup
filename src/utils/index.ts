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

const sortMeetupsChronologically = (meetups: Meetup[]) => {
  return meetups.sort((a, b) => a.date.getTime() - b.date.getTime())
}

export type list = 'upcoming' | 'past' | 'all'

export const createMeetupList = (
  meetups: Meetup[],
  listType: list,
  searchPhrase: string,
  searchFilter: list,
  customDate: Date
) => {
  const meetupList = meetups.filter((meetup) => {
    if (listType === 'past') {
      return (
        meetup.date.getTime() <= customDate.getTime() &&
        meetup.title.toLowerCase().includes(searchPhrase.toLowerCase()) &&
        (searchFilter === listType || searchFilter === 'all')
      )
    } else {
      return (
        meetup.date.getTime() > customDate.getTime() &&
        meetup.title.toLowerCase().includes(searchPhrase.toLowerCase()) &&
        (searchFilter === listType || searchFilter === 'all')
      )
    }
  })

  return sortMeetupsChronologically(meetupList)
}

export const createUserLists = (
  user: User,
  meetups: Meetup[],
  customDate: Date
) => {
  return {
    ownUpcoming: sortMeetupsChronologically(
      meetups.filter(
        (meetup: Meetup) =>
          meetup.arranger.id === user!.id &&
          meetup.date.getTime() > customDate.getTime()
      )
    ),
    ownPast: sortMeetupsChronologically(
      meetups.filter(
        (meetup: Meetup) =>
          meetup.arranger.id === user!.id &&
          meetup.date.getTime() <= customDate.getTime()
      )
    ),
    upcomingAttending: sortMeetupsChronologically(
      meetups.filter(
        (meetup: Meetup) =>
          user!.attending.includes(meetup.id) &&
          meetup.date.getTime() > customDate.getTime()
      )
    ),
    pastAttended: sortMeetupsChronologically(
      meetups.filter(
        (meetup: Meetup) =>
          user!.attending.includes(meetup.id) &&
          meetup.date.getTime() <= customDate.getTime()
      )
    ),
  }
}
