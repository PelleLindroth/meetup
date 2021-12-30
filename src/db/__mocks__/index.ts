import { meetups, Meetup } from '../models/Meetup'
import { User, UserDetails } from '../models/User'
import { users } from '../seed'
import { sortMeetupsChronologically } from '../../utils/db-utils'

export const getAllMeetups = () => {
  sortMeetupsChronologically(meetups)

  return meetups
}

export const getMeetupById = (id: string): Meetup | undefined => {
  return meetups.find((meetup) => meetup.id === id)
}

export const addComment = jest.fn()

export const addReview = jest.fn()

export const addMeetup = (meetup: Meetup) => {
  meetups.push(meetup)
}

// export const validateUser = (email: string, password: string): User | null => {
//   const user = users.find((user) => user.email === email)

//   if (user) {
//     return user.password === password ? user : null
//   } else {
//     return null
//   }
// }

export const validateUser = (email: string, password: string): User | null => {
  return users.validate(email, password)
}

// export const signUpForEvent = (meetup: Meetup, user: User) => {
//   user.attending.push(meetup.id)
//   meetup.attending++
// }

export const signUpForEvent = (meetup: Meetup, user: User) => {
  user.addAttending(meetup.id)
  meetup.attending++
}

export const cancelSignUpForEvent = (meetup: Meetup, user: User) => {
  // user.attending = user.attending.filter((item) => item !== meetup.id)
  user.cancelAttending(meetup.id)
  meetup.attending--
}

export const storeUser = jest.fn()

export const getStoredUser = jest.fn()

export const clearStoredUser = jest.fn()

export const getUserById = (id: string): User | undefined => {
  // return users.find((user) => user.id === id)
  return users.getById(id)
}

export const getUsers = () => {
  return users.getAll()
}

export const storeUserDetails = jest.fn()

// export const getUserDetails = (
//   userId: string
// ): { reviewed: string[]; attending: string[] } => {
//   const { attending, reviewed } = getUserById(userId!)!

//   return {
//     attending,
//     reviewed,
//   }
// }

export const getUserDetails = (userId: string): UserDetails | null => {
  const user = users.getById(userId)

  if (user) {
    return user.getDetails()
  } else {
    return null
  }
}
