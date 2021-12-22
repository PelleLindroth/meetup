import { meetups, Meetup, Comment, Review } from './meetups'
import { users, User } from './users'

export const getAllMeetups = (): Meetup[] => {
  const storedMeetups: Meetup[] = JSON.parse(localStorage.getItem('meetups')!)
  const returnedMeetups: Meetup[] = []

  if (storedMeetups) {
    storedMeetups.forEach((meetup) => {
      meetup.date = new Date(meetup.date)
      meetup.comments.forEach((comment) => {
        comment.submittedAt = new Date(comment.submittedAt)
      })
    })

    returnedMeetups.push(...storedMeetups)
  } else {
    localStorage.setItem('meetups', JSON.stringify(meetups))
    returnedMeetups.push(...meetups)
  }

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

const updateMeetup = (meetup: Meetup) => {
  let meetups = getAllMeetups()

  const index = meetups.findIndex((item) => item.id === meetup.id)

  meetups.splice(index, 1, meetup)

  localStorage.setItem('meetups', JSON.stringify(meetups))
}

export const addComment = (meetupId: string, comment: Comment) => {
  const meetup = getMeetupById(meetupId)

  if (meetup) {
    meetup.comments.push(comment)
    updateMeetup(meetup)
  }
}

export const addReview = (meetupId: string, userId: string, review: Review) => {
  const meetup = getMeetupById(meetupId)
  const user = getUserById(userId)
  if (!meetup || !user) return

  meetup.reviews.push(review)
  updateMeetup(meetup)
  user.reviewed.push(meetup.id)
}

export const addMeetup = (meetup: Meetup) => {
  meetups.push(meetup)
  saveMeetupToLocalStorage(meetup)
}

export const signUpForEvent = (meetup: Meetup, user: User) => {
  user.attending.push(meetup.id)
  meetup.attending++
  updateMeetup(meetup)
}

export const cancelSignUpForEvent = (meetup: Meetup, user: User) => {
  user.attending = user.attending.filter((item) => item !== meetup.id)
  meetup.attending--
  updateMeetup(meetup)
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
  const meetups = getAllMeetups()
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

export const storeUser = (userId: string) => {
  localStorage.setItem('user', userId)
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

export const getMockUsers = () => {
  return users
}
