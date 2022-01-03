import { Meetup, Comment, Review } from './models/Meetup'
import { UserDetails, User } from './models/User'
import { users, meetups } from './seed'
import { parseDates, sortMeetupsChronologically } from '../utils/db-utils'

export const getAllMeetups = (): Meetup[] => {
  const storedMeetups: Meetup[] | null = getMeetupsFromLocalStorage()
  const returnedMeetups: Meetup[] = []

  if (storedMeetups) {
    parseDates(storedMeetups)

    returnedMeetups.push(...storedMeetups)
  } else {
    setMeetupsInLocalStorage(meetups.getAll())
    returnedMeetups.push(...meetups.getAll())
  }

  sortMeetupsChronologically(returnedMeetups)

  return returnedMeetups
}

const getMeetupsFromLocalStorage = (): Meetup[] | null => {
  return JSON.parse(localStorage.getItem('meetups')!)
}

const setMeetupsInLocalStorage = (meetups: Meetup[]): void => {
  localStorage.setItem('meetups', JSON.stringify(meetups))
}

export const getMeetupById = (id: string): Meetup | undefined => {
  return meetups.getById(id)
}

export const addComment = (meetup: Meetup, comment: Comment) => {
  meetup.comments.push(comment)
  updateMeetupInLocalStorage(meetup)
}

export const addReview = (
  meetupId: string,
  userId: string,
  review: Review
): void => {
  const meetup = getMeetupById(meetupId)
  const user = users.getById(userId)
  if (!meetup || !user) return

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
  console.log(meetup)

  meetup.attending++
  updateMeetupInLocalStorage(meetup)
}

export const cancelSignUpForEvent = (meetup: Meetup, user: User) => {
  user.cancelAttending(meetup.id)
  meetup.attending--
  updateMeetupInLocalStorage(meetup)
}

const updateMeetupInLocalStorage = (meetup: Meetup) => {
  let meetups = getAllMeetups()

  const index = meetups.findIndex((item) => item.id === meetup.id)

  meetups.splice(index, 1, meetup)

  setMeetupsInLocalStorage(meetups)
}

const saveMeetupToLocalStorage = (meetup: Meetup) => {
  const storedMeetups: Meetup[] | null = getMeetupsFromLocalStorage()

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

export const storeUserDetails = (userId: string) => {
  const user = users.getById(userId)

  if (user) {
    user.saveDetailsToLocalStorage()
  }
}

export const getUserDetails = (userId: string): UserDetails | null => {
  const user = users.getById(userId)

  if (user) {
    return user.getDetails()
  } else {
    return null
  }
}
