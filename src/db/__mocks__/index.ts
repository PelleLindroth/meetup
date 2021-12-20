import { meetups, Meetup, Review, Comment } from '../meetups'
import { users, User } from '../users'

export const getAllMeetups = () => {
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

export const getUserById = (id: string): User | undefined => {
  return users.find((user) => user.id === id)
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

export const addComment = (meetupId: string, comment: Comment) => {
  const meetup = getMeetupById(meetupId)

  if (meetup) {
    meetup.comments.push(comment)
  }
}

export const addReview = (meetupId: string, userId: string, rating: number) => {
  const meetup = getMeetupById(meetupId)
  const user = getUserById(userId)
  if (!meetup || !user) return

  const review: Review = {
    id: `${Math.floor(Math.random() * 10)}`,
    meetupId,
    rating,
  }

  meetup.reviews.push(review)
  user.reviewed.push(meetup.id)
}

export const addMeetup = (meetup: Meetup) => {
  meetups.push(meetup)
}

export const signUpForEvent = (meetup: Meetup, user: User) => {
  user.attending.push(meetup.id)
  meetup.attending++
}

export const cancelSignUpForEvent = (meetup: Meetup, user: User) => {
  user.attending = user.attending.filter((item) => item !== meetup.id)
  meetup.attending--
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

export const getMockUsers = () => {
  return users
}
