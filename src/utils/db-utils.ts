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
  meetups.sort((a, b) => a.date.getTime() - b.date.getTime())
}
