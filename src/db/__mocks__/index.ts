import { Meetup, Comment } from '../models/Meetup'
import { User, UserDetails } from '../models/User'
import { users, meetups } from '../seed'
import { sortMeetupsChronologically } from '../../utils/db-utils'

export const getAllMeetups = () => {
  sortMeetupsChronologically(meetups.getAll())

  return meetups.getAll()
}

export const getMeetupById = (id: string): Meetup | undefined => {
  return meetups.getById(id)
}

export const addComment = (meetup: Meetup, comment: Comment) => {
  meetup.comments.push(comment)
}

export const addReview = jest.fn()

export const addMeetup = (meetup: Meetup) => {
  meetups.add(meetup)
}

export const validateUser = (email: string, password: string): User | null => {
  return users.validate(email, password)
}

export const signUpForEvent = (meetup: Meetup, user: User) => {
  user.addAttending(meetup.id)
  meetup.increaseAttendants()
}

export const cancelSignUpForEvent = (meetup: Meetup, user: User) => {
  user.cancelAttending(meetup.id)
  meetup.decreaseAttendants()
}

export const storeUser = jest.fn()

export const getStoredUser = jest.fn()

export const clearStoredUser = jest.fn()

export const getUserById = (id: string): User | undefined => {
  return users.getById(id)
}

export const getUsers = () => {
  return users.getAll()
}

export const storeUserDetails = jest.fn()

export const getUserDetails = (userId: string): UserDetails | null => {
  const user = users.getById(userId)

  if (user) {
    return user.getDetails()
  } else {
    return null
  }
}
