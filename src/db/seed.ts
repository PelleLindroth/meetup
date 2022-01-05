import { UserBank, IUser, User } from './models/User'
import { MeetupBank, Meetup, IMeetup } from './models/Meetup'

const tjalle: IUser = {
  id: '1',
  firstName: 'Tjalle',
  lastName: 'Bergkvist',
  email: 'tjalle@yahoo.com',
  password: 'grillkorv',
}
const user1 = new User(tjalle)
user1.addAttending('1')
user1.addAttending('2')
user1.addReviewed('1')

const kenta: IUser = {
  id: '2',
  firstName: 'Kenta',
  lastName: 'Andersson',
  email: 'kenta@yahoo.com',
  password: 'bananpaj',
}
const user2 = new User(kenta)
user2.addAttending('1')
user2.addReviewed('1')

const babsan: IUser = {
  id: '3',
  firstName: 'Barbro',
  lastName: 'Lundborg',
  email: 'babsan@yahoo.com',
  password: 'password123',
}
const user3 = new User(babsan)

const loffe: IUser = {
  id: '4',
  firstName: 'Janne',
  lastName: 'Karlsson',
  email: 'loffe@yahoo.com',
  password: 'storstark',
}
const user4 = new User(loffe)
user4.addAttending('1')

const users = new UserBank()

users.add(user1)
users.add(user2)
users.add(user3)
users.add(user4)

const pizzaPicnic: IMeetup = {
  id: '1',
  title: 'Pizza Picnic',
  description: 'We meet in the park with pizzas and eat them',
  arranger: user1,
  date: new Date(1630170000000),
  location: {
    street: 'Vitabergsparken',
    city: 'Stockholm',
  },
  attending: 54,
  online: false,
  url: null,
  capacity: null,
  keywords: ['food', 'pizza', 'picnic', 'park', 'stockholm'],
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
}

const rustCourse: IMeetup = {
  id: '2',
  title: 'Rust course',
  description: 'Learn a new programming language from the ground up',
  arranger: user3,
  date: new Date(1641808800000),
  location: null,
  online: true,
  url: 'https://www.udemy.com/course/rust-lang/',
  capacity: null,
  attending: 234,
  keywords: ['programming', 'it', 'learn', 'rust', 'tech'],
  comments: [],
  reviews: [],
}

const footballGame: IMeetup = {
  id: '3',
  title: 'Sevilla - Real Sociedad',
  description: 'A classic football match between the south and the north',
  arranger: user2,
  date: new Date(1652457600000),
  location: {
    street: 'C. Sevilla Fútbol Club',
    city: '41005 Sevilla',
  },
  online: false,
  url: null,
  capacity: 43883,
  attending: 23478,
  keywords: ['football', 'spain', 'sevilla', 'sports'],
  comments: [],
  reviews: [],
}

const kiteFestival: IMeetup = {
  id: '4',
  title: 'Kite festival',
  description: 'Classic Kite festival at Gärdet, bring your own kite!',
  arranger: user1,
  date: new Date(1656774000000),
  location: {
    street: 'Gärdet',
    city: 'Stockholm',
  },
  online: false,
  url: null,
  capacity: null,
  attending: 126,
  keywords: ['kite', 'picnic', 'hobby', 'stockholm', 'park', 'festival'],
  comments: [],
  reviews: [],
}

const halloweenParty: IMeetup = {
  id: '5',
  title: 'Halloween Street Party',
  description: 'Halloween party in the street',
  arranger: user3,
  date: new Date(1635703200000),
  location: {
    street: 'Strandvägen',
    city: 'Stockholm',
  },
  online: false,
  url: null,
  capacity: 500,
  attending: 356,
  keywords: ['halloween', 'masquerade', 'street', 'party', 'scary'],
  comments: [],
  reviews: [],
}

const smallParty: IMeetup = {
  id: '6',
  title: 'Small party',
  description: 'A small party',
  arranger: user3,
  date: new Date(1647363600000),
  location: {
    street: 'Storgatan 101',
    city: 'Stockholm',
  },
  online: false,
  url: null,
  capacity: 5,
  attending: 5,
  keywords: ['small', 'safe', 'party', 'babsan', 'limited'],
  comments: [],
  reviews: [],
}

const meetup1 = new Meetup(pizzaPicnic)
const meetup2 = new Meetup(rustCourse)
const meetup3 = new Meetup(footballGame)
const meetup4 = new Meetup(kiteFestival)
const meetup5 = new Meetup(halloweenParty)
const meetup6 = new Meetup(smallParty)

const meetups = new MeetupBank([
  meetup1,
  meetup2,
  meetup3,
  meetup4,
  meetup5,
  meetup6,
])

export { users, meetups }
