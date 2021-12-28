import { meetups, Meetup, Comment, Review } from './models/Meetup'
import { UserDetails, UserImpl } from './models/User'
import users from './seed'
import { parseDates, sortMeetupsChronologically } from '../utils/db-utils'

export const getAllMeetups = (): Meetup[] => {
  const storedMeetups: Meetup[] = JSON.parse(localStorage.getItem('meetups')!)
  const returnedMeetups: Meetup[] = []

  if (storedMeetups) {
    parseDates(storedMeetups)

    returnedMeetups.push(...storedMeetups)
  } else {
    localStorage.setItem('meetups', JSON.stringify(meetups))
    returnedMeetups.push(...meetups)
  }

  sortMeetupsChronologically(returnedMeetups)

  return returnedMeetups
}

export const getMeetupById = (id: string): Meetup | undefined => {
  return meetups.find((meetup) => meetup.id === id)
}

export const addComment = (meetupId: string, comment: Comment) => {
  const meetup = getMeetupById(meetupId)

  if (meetup) {
    meetup.comments.push(comment)
    updateMeetupInLocalStorage(meetup)
  }
}

export const addReview = (meetupId: string, userId: string, review: Review) => {
  const meetup = getMeetupById(meetupId)
  const user = users.getById(userId)
  if (!meetup || !user) return

  meetup.reviews.push(review)
  user.addReviewed(meetup.id)
  updateMeetupInLocalStorage(meetup)
}

export const addMeetup = (meetup: Meetup) => {
  meetups.push(meetup)
  saveMeetupToLocalStorage(meetup)
}

export const validateUser = (
  email: string,
  password: string
): UserImpl | null => {
  return users.validate(email, password)
}

export const signUpForEvent = (meetup: Meetup, user: UserImpl) => {
  user.addAttending(meetup.id)
  meetup.attending++
  updateMeetupInLocalStorage(meetup)
}

export const cancelSignUpForEvent = (meetup: Meetup, user: UserImpl) => {
  user.cancelAttending(meetup.id)
  meetup.attending--
  updateMeetupInLocalStorage(meetup)
}

const updateMeetupInLocalStorage = (meetup: Meetup) => {
  let meetups = getAllMeetups()

  const index = meetups.findIndex((item) => item.id === meetup.id)

  meetups.splice(index, 1, meetup)

  localStorage.setItem('meetups', JSON.stringify(meetups))
}

const saveMeetupToLocalStorage = (meetup: Meetup) => {
  const storedMeetups: Meetup[] = JSON.parse(localStorage.getItem('meetups')!)

  if (storedMeetups) {
    storedMeetups.push(meetup)

    localStorage.setItem('meetups', JSON.stringify(storedMeetups))
  } else {
    localStorage.setItem('meetups', JSON.stringify([meetup]))
  }
}

export const storeUser = (userId: string) => {
  const user = users.getById(userId)

  if (user) {
    user.store()
  }
}

export const getStoredUser = (): UserImpl | null => {
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

export const getUserById = (id: string): UserImpl | undefined => {
  return users.getById(id)
}

export const getUsers = () => {
  return users.getAll()
}

export const storeUserDetails = (userId: string) => {
  const user = users.getById(userId)

  if (user) {
    user.store()
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
