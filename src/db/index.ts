import { Meetup, IMeetup, IComment, IReview, MeetupBank } from './models/Meetup'
import { UserDetails, User } from './models/User'
import { users, meetups } from './seed'
import { parseDates, sortMeetupsChronologically } from '../utils/db-utils'

export const getAllMeetups = (): Meetup[] => {
  const storedMeetups: IMeetup[] | null = getMeetupsFromLocalStorage()

  if (storedMeetups) {
    parseDates(storedMeetups)

    const meetupBank = new MeetupBank([...storedMeetups])
    const meetups = meetupBank.getAll()
    sortMeetupsChronologically(meetups)

    return meetups
  } else {
    setMeetupsInLocalStorage(meetups.getAll())
    const seededMeetups = meetups.getAll()
    sortMeetupsChronologically(seededMeetups)

    return seededMeetups
  }
}

const getMeetupsFromLocalStorage = (): IMeetup[] | null => {
  return JSON.parse(localStorage.getItem('meetups')!)
}

const setMeetupsInLocalStorage = (meetups: IMeetup[]): void => {
  localStorage.setItem('meetups', JSON.stringify(meetups))
}

export const getMeetupById = (id: string): Meetup | undefined => {
  return meetups.getById(id)
}

export const addComment = (meetup: Meetup, comment: IComment) => {
  meetup.addComment(comment)
  updateMeetupInLocalStorage(meetup)
}

export const addReview = (
  meetup: Meetup,
  user: User,
  review: IReview
): void => {
  meetup.addReview(review)
  user.addReviewed(meetup.id)
  updateMeetupInLocalStorage(meetup)
}

export const addMeetup = (meetup: Meetup) => {
  meetups.add(meetup)
  saveMeetupToLocalStorage(meetup)
}

export const validateUser = (email: string, password: string): User | null => {
  return users.validate(email, password)
}

export const signUpForEvent = (meetup: Meetup, user: User) => {
  user.addAttending(meetup.id)

  meetup.increaseAttendants()
  updateMeetupInLocalStorage(meetup)
}

export const cancelSignUpForEvent = (meetup: Meetup, user: User) => {
  user.cancelAttending(meetup.id)
  meetup.decreaseAttendants()
  updateMeetupInLocalStorage(meetup)
}

const updateMeetupInLocalStorage = (meetup: Meetup) => {
  let meetups = getAllMeetups()

  const index = meetups.findIndex((item) => item.id === meetup.id)

  meetups.splice(index, 1, meetup)

  setMeetupsInLocalStorage(meetups)
}

const saveMeetupToLocalStorage = (meetup: Meetup) => {
  const storedMeetups: IMeetup[] | null = getMeetupsFromLocalStorage()

  if (storedMeetups) {
    storedMeetups.push(meetup)

    setMeetupsInLocalStorage(storedMeetups)
  } else {
    setMeetupsInLocalStorage([meetup])
  }
}

export const storeUser = (userId: string) => {
  const user = users.getById(userId)

  if (user) {
    user.saveIdToLocalStorage()
    user.saveDetailsToLocalStorage()
  }
}

export const getStoredUser = (): User | null => {
  const storedUserId = localStorage.getItem('user')

  if (storedUserId) {
    const user = users.getById(storedUserId)

    return user || null
  }

  return null
}

export const clearStoredUser = () => {
  localStorage.removeItem('user')
}

export const getUserById = (id: string): User | undefined => {
  return users.getById(id)
}

export const getUsers = () => {
  return users.getAll()
}

export const storeUserDetails = (user: User) => {
  user.saveDetailsToLocalStorage()
}

export const getUserDetails = (userId: string): UserDetails | null => {
  const user = users.getById(userId)

  if (user) {
    return user.getDetails()
  } else {
    return null
  }
}
