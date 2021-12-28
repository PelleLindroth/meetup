import { User } from './User'
import users from '../seed'

export interface Meetup {
  id: string
  title: string
  description: string
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

export const meetups: Meetup[] = [
  {
    id: '1',
    title: 'Pizza Picnic',
    description: 'We meet in the park with pizzas and hang out all night',
    date: new Date(1630170000000),
    location: {
      street: 'Vitabergsparken',
      city: 'Stockholm',
    },
    online: false,
    capacity: null,
    attending: 54,
    arranger: users.getById('1')!,
    reviews: [
      {
        id: '1',
        meetupId: '1',
        rating: 4,
      },
      {
        id: '2',
        meetupId: '1',
        rating: 5,
      },
    ],
    comments: [
      {
        id: '1',
        userId: '2',
        text: 'Great day!',
        submittedAt: new Date(1639666713837),
      },
      {
        id: '2',
        userId: '1',
        text: 'Yes, it was, thanks!',
        submittedAt: new Date(1639666762526),
      },
      {
        id: '3',
        userId: null,
        text: 'Damn, I missed this',
        submittedAt: new Date(1639744482949),
      },
    ],
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
    arranger: users.getById('3')!,
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
    },
    online: false,
    capacity: 43883,
    attending: 23478,
    arranger: users.getById('2')!,
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
    },
    online: false,
    capacity: null,
    attending: 126,
    arranger: users.getById('1')!,
    reviews: [],
    comments: [],
  },
  {
    id: '5',
    title: 'Halloween Street Party',
    description: 'Halloween party in the street, all night long',
    date: new Date(1635703200000),
    location: {
      street: 'Strandvägen',
      city: 'Stockholm',
    },
    online: false,
    capacity: 500,
    attending: 356,
    arranger: users.getById('3')!,
    reviews: [],
    comments: [],
  },
]
