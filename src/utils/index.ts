import { User } from '../db/users'
import { Meetup } from '../db/meetups'

export const formatDate = (date: Date) => {
  return `${new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date)}`
}

const sortChronologically = (array: Meetup[]) => {
  return array.sort((a, b) => a.date.getTime() - b.date.getTime())
}

export const createMeetupList = (
  meetups: Meetup[],
  listType: string,
  searchPhrase: string,
  searchFilter: string
) => {
  const meetupList = meetups.filter((meetup) => {
    if (listType === 'past') {
      return (
        meetup.date.getTime() < Date.now() &&
        meetup.title.toLowerCase().includes(searchPhrase.toLowerCase()) &&
        (searchFilter === listType || searchFilter === 'all')
      )
    } else {
      return (
        meetup.date.getTime() > Date.now() &&
        meetup.title.toLowerCase().includes(searchPhrase.toLowerCase()) &&
        (searchFilter === listType || searchFilter === 'all')
      )
    }
  })

  return sortChronologically(meetupList)
}

export const createUserLists = (user: User, meetups: Meetup[]) => {
  return {
    ownUpcoming: sortChronologically(
      meetups.filter(
        (meetup: Meetup) =>
          meetup.arranger.id === user!.id &&
          meetup.date.getTime() > new Date().getTime()
      )
    ),
    ownPast: sortChronologically(
      meetups.filter(
        (meetup: Meetup) =>
          meetup.arranger.id === user!.id &&
          meetup.date.getTime() < new Date().getTime()
      )
    ),
    upcomingAttending: sortChronologically(
      meetups.filter(
        (meetup: Meetup) =>
          user!.attending.includes(meetup.id) &&
          meetup.date.getTime() > new Date().getTime()
      )
    ),
    pastAttended: sortChronologically(
      meetups.filter(
        (meetup: Meetup) =>
          user!.attending.includes(meetup.id) &&
          meetup.date.getTime() < new Date().getTime()
      )
    ),
  }
}
