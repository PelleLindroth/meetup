import { User } from './User'

export interface IMeetup {
  id: string
  title: string
  description: string
  arranger: User
  date: Date
  location: IAddress | null
  url: string | null
  online: boolean
  capacity: number | null
  attending: number
  keywords: string[]
  comments: IComment[]
  reviews: IReview[]
}
export class Meetup implements IMeetup {
  id: string
  title: string
  description: string
  arranger: User
  date: Date
  location: IAddress | null
  url: string | null
  online: boolean
  capacity: number | null
  attending: number
  keywords: string[]
  comments: IComment[]
  reviews: IReview[]

  constructor(meetup: IMeetup) {
    this.id = meetup.id
    this.title = meetup.title
    this.description = meetup.description
    this.arranger = meetup.arranger
    this.date = meetup.date
    this.location = meetup.location
    this.online = meetup.online
    this.url = meetup.url
    this.capacity = meetup.capacity
    this.attending = meetup.attending
    this.keywords = meetup.keywords
    this.reviews = meetup.reviews
    this.comments = meetup.comments
  }

  addComment = (comment: IComment) => {
    this.comments.push(comment)
  }

  addReview = (review: IReview) => {
    this.reviews.push(review)
  }

  increaseAttendants = () => {
    this.attending++
  }

  decreaseAttendants = () => {
    this.attending--
  }
}

export interface IAddress {
  street: string
  city: string
}

export interface IReview {
  id: string
  meetupId: string
  rating: number
}

export interface IComment {
  id: string
  userId: string | null
  text: string
  submittedAt: Date
}

export class MeetupBank {
  private meetups: Meetup[] = []

  constructor(meetupArray: IMeetup[]) {
    meetupArray.forEach((meetup) => {
      const newMeetup = new Meetup(meetup)
      this.meetups.push(newMeetup)
    })
  }

  getById = (id: string): Meetup | undefined => {
    return this.meetups.find((meetup) => meetup.id === id)
  }

  getAll = (): Meetup[] => {
    return this.meetups
  }

  add = (meetup: Meetup): void => {
    this.meetups.push(meetup)
  }
}
