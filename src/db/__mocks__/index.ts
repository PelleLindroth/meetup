import { meetups, Meetup, Comment } from '../meetups'
import { users, User } from '../users'
import { sortMeetupsChronologically } from '../../utils/db-utils'

export const getAllMeetups = () => {
  sortMeetupsChronologically(meetups)

  return meetups
}

export const getMeetupById = (id: string): Meetup | undefined => {
  return meetups.find((meetup) => meetup.id === id)
}

export const addComment = (meetup: Meetup, comment: Comment) => {
  meetup.comments.push(comment)
}

export const addReview = jest.fn()

export const addMeetup = (meetup: Meetup) => {
  meetups.push(meetup)
}

export const validateUser = (email: string, password: string): User | null => {
  const user = users.find((user) => user.email === email)

  if (user) {
    return user.password === password ? user : null
  } else {
    return null
  }
}

export const signUpForEvent = (meetup: Meetup, user: User) => {
  user.attending.push(meetup.id)
  meetup.attending++
}

export const cancelSignUpForEvent = (meetup: Meetup, user: User) => {
  user.attending = user.attending.filter((item) => item !== meetup.id)
  meetup.attending--
}

export const storeUser = jest.fn()

export const getStoredUser = jest.fn()

export const clearStoredUser = jest.fn()

export const getUserById = (id: string): User | undefined => {
  return users.find((user) => user.id === id)
}

export const getUsers = () => {
  return users
}

export const storeUserDetails = jest.fn()

export const getUserDetails = (
  userId: string
): { reviewed: string[]; attending: string[] } => {
  const { attending, reviewed } = getUserById(userId!)!

  return {
    attending,
    reviewed,
  }
}
