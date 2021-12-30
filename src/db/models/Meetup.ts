import { User } from './User'
import { uid } from 'uid'

interface Address {
  street: string
  city: string
}

export interface Review {
  id: string
  meetupId: string
  rating: number
}

export interface Comment {
  id: string
  userId: string | null
  text: string
  submittedAt: Date
}

export class Meetup {
  id: string
  title: string
  description: string
  arranger: User
  date: Date
  location: Address | null
  url: string | null
  online: boolean
  capacity: number | null
  attending: number
  reviews: Review[]
  comments: Comment[]

  constructor(
    title: string,
    description: string,
    arranger: User,
    date: Date,
    location: Address | null,
    id: string | null,
    online: boolean,
    url: string | null,
    capacity: number | null
  ) {
    this.id = id || uid()
    this.title = title
    this.description = description
    this.arranger = arranger
    this.date = date
    this.location = location
    this.online = online || false
    this.url = url || null
    this.capacity = capacity || null
    this.attending = 0
    this.reviews = []
    this.comments = []
  }

  addComment = (comment: Comment) => {
    this.comments.push(comment)
  }

  addReview = (review: Review) => {
    this.reviews.push(review)
  }

  increaseAttendants = () => {
    this.attending++
  }

  decreaseAttendants = () => {
    this.attending--
  }

  // update in local storage

  // save in local storage
}

export class MeetupBank {
  meetups: Meetup[]

  constructor() {
    this.meetups = []
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
