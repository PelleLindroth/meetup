import { Meetup } from '../db/models/Meetup'

export const parseDates = (meetups: Meetup[]) => {
  meetups.forEach((meetup) => {
    meetup.date = new Date(meetup.date)
    meetup.comments.forEach((comment) => {
      comment.submittedAt = new Date(comment.submittedAt)
    })
  })
}

export const sortMeetupsChronologically = (meetups: Meetup[]) => {
  meetups.sort((a, b) => {
    if (a.date.getTime() > b.date.getTime()) {
      return 1
    } else if (b.date.getTime() > a.date.getTime()) {
      return -1
    } else {
      return 0
    }
  })
}
