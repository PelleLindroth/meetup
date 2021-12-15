import { meetups, Meetup } from './meetups'
import { users, User } from './users'

export const getAllMeetups = (): Meetup[] => {
  const storedMeetups: Meetup[] = JSON.parse(localStorage.getItem('meetups')!)
  let returnedMeetups: Meetup[] = []

  if (storedMeetups) {
    returnedMeetups.push(...storedMeetups)
  } else returnedMeetups.push(...meetups)

  returnedMeetups.sort((a, b) => {
    if (a.date.getTime() > b.date.getTime()) {
      return 1
    } else if (b.date.getTime() > a.date.getTime()) {
      return -1
    } else {
      return 0
    }
  })

  return returnedMeetups
}

export const getMockMeetups = () => {
  meetups.sort((a, b) => {
    if (a.date.getTime() > b.date.getTime()) {
      return 1
    } else if (b.date.getTime() > a.date.getTime()) {
      return -1
    } else {
      return 0
    }
  })

  return meetups
}

export const saveMeetupToLocalStorage = (meetup: Meetup) => {
  const storedMeetups: Meetup[] = JSON.parse(localStorage.getItem('meetups')!)

  if (storedMeetups) {
    storedMeetups.push(meetup)

    localStorage.setItem('meetups', JSON.stringify(storedMeetups))
  } else {
    localStorage.setItem('meetups', JSON.stringify([meetup]))
  }
}

export const getMeetupById = (id: string): Meetup | undefined => {
  return meetups.find((meetup) => meetup.id === id)
}

export const validateUser = (email: string, password: string): User | null => {
  const user = users.find((user) => user.email === email)

  if (user) {
    return user.password === password ? user : null
  } else {
    return null
  }
}

export const getUserById = (id: string): User | undefined => {
  return users.find((user) => user.id === id)
}

export const getMockUsers = () => {
  return users
}
