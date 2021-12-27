import { meetups, Meetup, Comment, Review } from './meetups'
import { users, User } from './users'
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

    storeUserDetails('attending', user.id, user.attending)
    storeUserDetails('reviewed', user.id, user.reviewed)
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

export const storeUserDetails = (
  detail: 'attending' | 'reviewed',
  userId: string,
  meetupIds: string[]
) => {
  const userDetails:
    | {
        [key: string]: string[]
      }
    | undefined = JSON.parse(localStorage.getItem(detail)!)

  if (userDetails) {
    userDetails[userId] = meetupIds
    localStorage.setItem(detail, JSON.stringify(userDetails))
  } else {
    localStorage.setItem(detail, JSON.stringify({ [userId]: [...meetupIds] }))
  }
}

export const getUserDetails = (
  userId: string
): { reviewed: string[]; attending: string[] } => {
  const userAttendingLists:
    | {
        [key: string]: string[]
      }
    | undefined = JSON.parse(localStorage.getItem('attending')!)

  const userReviewedLists:
    | {
        [key: string]: string[]
      }
    | undefined = JSON.parse(localStorage.getItem('reviewed')!)

  if (
    userAttendingLists &&
    userAttendingLists[userId] &&
    userReviewedLists &&
    userReviewedLists[userId]
  ) {
    return {
      attending: userAttendingLists[userId],
      reviewed: userReviewedLists[userId],
    }
  } else {
    const { attending, reviewed } = getUserById(userId!)!

    return {
      attending,
      reviewed,
    }
  }
}
