import { User, users } from './users'

export interface Meetup {
  id: string
  title: string
  description?: string
  date: Date
  location?: Address
  url?: string
  online: boolean
  capacity: number | null
  attending: number
  arranger: User
  reviews: Review[]
  comments: Comment[]
}

interface Address {
  street: string
  city: string
  country: string
}

interface Review {
  id: string
  meetupId: string
  rating: number
  submittedAt: Date
}

interface Comment {
  id: string
  meetupId: string
  title: string
  body: string
  submittedAt: Date
}

export const meetups: Meetup[] = [
  {
    id: '1',
    title: 'Pizza Picnic',
    description: 'We meet in the park with pizzas and hang out all night',
    date: new Date(1630170000000),
    location: {
      street: 'Vitabergsparken',
      city: 'Stockholm',
      country: 'Sweden',
    },
    online: false,
    url: 'https://www.udemy.com/course/rust-lang/',
    capacity: null,
    attending: 54,
    arranger: users[0],
    reviews: [],
    comments: [],
  },
  {
    id: '2',
    title: 'Rust course',
    description: 'Learn a new programming language from the ground up',
    date: new Date(1641808800000),
    online: true,
    url: 'https://www.udemy.com/course/rust-lang/',
    capacity: null,
    attending: 234,
    arranger: users[2],
    reviews: [],
    comments: [],
  },
  {
    id: '3',
    title: 'Sevilla - Real Sociedad',
    description: 'A classic football match between the south and the north',
    date: new Date(1652457600000),
    location: {
      street: 'C. Sevilla Fútbol Club',
      city: '41005 Sevilla',
      country: 'Spain',
    },
    online: false,
    capacity: 43883,
    attending: 23478,
    arranger: users[1],
    reviews: [],
    comments: [],
  },
  {
    id: '4',
    title: 'Kite festival',
    description:
      'Classic Kite festival at Gärdet, bring your own kite or just watch the pros',
    date: new Date(1656774000000),
    location: {
      street: 'Gärdet',
      city: 'Stockholm',
      country: 'Sweden',
    },
    online: false,
    capacity: null,
    attending: 126,
    arranger: users[3],
    reviews: [],
    comments: [],
  },
]
