import { meetups, Meetup, Comment, Review } from './meetups'
import { users, User } from './users'
import { parseDates, sortMeetupsChronologically } from './dbutils'

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
  const user = getUserById(userId)
  if (!meetup || !user) return

  meetup.reviews.push(review)
  updateMeetupInLocalStorage(meetup)
  user.reviewed.push(meetup.id)
}

export const addMeetup = (meetup: Meetup) => {
  meetups.push(meetup)
  saveMeetupToLocalStorage(meetup)
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
  updateMeetupInLocalStorage(meetup)
}

export const cancelSignUpForEvent = (meetup: Meetup, user: User) => {
  user.attending = user.attending.filter((item) => item !== meetup.id)
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
  const user = getUserById(userId)

  if (user) {
    localStorage.setItem('user', user.id)
    storeUserAttending(user.id, user.attending)
  }
}

export const getStoredUser = (): User | null => {
  const storedUserId = localStorage.getItem('user')

  if (storedUserId) {
    const user = getUserById(storedUserId)

    return user || null
  }

  return null
}

export const clearStoredUser = () => {
  localStorage.removeItem('user')
}

export const getUserById = (id: string): User | undefined => {
  return users.find((user) => user.id === id)
}

export const getUsers = () => {
  return users
}

export const storeUserAttending = (userId: string, meetupIds: string[]) => {
  const userAttendingLists: {
    [key: string]: string[]
  } = JSON.parse(localStorage.getItem('attendingLists')!)

  if (userAttendingLists) {
    userAttendingLists[userId] = meetupIds
    localStorage.setItem('attendingLists', JSON.stringify(userAttendingLists))
  } else {
    localStorage.setItem(
      'attendingLists',
      JSON.stringify({ [userId]: [...meetupIds] })
    )
  }
}

export const getUserAttending = (userId: string): string[] => {
  const userAttendingLists: {
    [key: string]: string[]
  } = JSON.parse(localStorage.getItem('attendingLists')!)

  if (userAttendingLists[userId]) {
    return userAttendingLists[userId]
  } else {
    return getUserById(userId)?.attending!
  }
}

export const storeUserReviewed = (userId: string, meetupIds: string[]) => {
  const userReviedLists: {
    [key: string]: string[]
  } = JSON.parse(localStorage.getItem('reviewedLists')!)

  if (userReviedLists) {
    userReviedLists[userId] = meetupIds
    localStorage.setItem('reviewedLists', JSON.stringify(userReviedLists))
  } else {
    localStorage.setItem(
      'reviewedLists',
      JSON.stringify({ [userId]: [...meetupIds] })
    )
  }
}

export const getUserReviewed = (userId: string): string[] => {
  const userReviewedLists: {
    [key: string]: string[]
  } = JSON.parse(localStorage.getItem('reviewedLists')!)

  if (userReviewedLists[userId]) {
    return userReviewedLists[userId]
  } else {
    return getUserById(userId)?.reviewed!
  }
}
