import { UserBank, User } from './models/User'
import { MeetupBank, Meetup } from './models/Meetup'

const user1 = new User(
  'Tjalle',
  'Bergkvist',
  'tjalle@yahoo.com',
  'grillkorv',
  '1'
)
user1.addAttending('1')
user1.addAttending('2')
user1.addReviewed('1')

const user2 = new User('Kenta', 'Andersson', 'kenta@yahoo.com', 'bananpaj', '2')
user2.addAttending('1')
user2.addReviewed('1')

const user3 = new User(
  'Barbro',
  'Lundborg',
  'babsan@yahoo.com',
  'password123',
  '3'
)

const user4 = new User('Janne', 'Karlsson', 'loffe@yahoo.com', 'storstark', '4')
user4.addAttending('1')

const users = new UserBank()

users.add(user1)
users.add(user2)
users.add(user3)
users.add(user4)

const meetup1 = new Meetup(
  'Pizza Picnic',
  'We meet in the park with pizzas and hang out all night',
  user1,
  new Date(1630170000000),
  {
    street: 'Vitabergsparken',
    city: 'Stockholm',
  },
  '1',
  false,
  null,
  null
)

for (let i = 0; i < 54; i++) {
  meetup1.increaseAttendants()
}

meetup1.addReview({
  id: '1',
  meetupId: '1',
  rating: 4,
})

meetup1.addReview({
  id: '2',
  meetupId: '1',
  rating: 5,
})

meetup1.addComment({
  id: '1',
  userId: '2',
  text: 'Great day!',
  submittedAt: new Date(1639666713837),
})

meetup1.addComment({
  id: '2',
  userId: '1',
  text: 'Yes, it was, thanks!',
  submittedAt: new Date(1639666762526),
})

meetup1.addComment({
  id: '3',
  userId: null,
  text: 'Damn, I missed this',
  submittedAt: new Date(1639744482949),
})

const meetup2 = new Meetup(
  'Rust course',
  'Learn a new programming language from the ground up',
  user3,
  new Date(1641808800000),
  null,
  '2',
  true,
  'https://www.udemy.com/course/rust-lang/',
  null
)

for (let i = 0; i < 234; i++) {
  meetup2.increaseAttendants()
}

const meetup3 = new Meetup(
  'Sevilla - Real Sociedad',
  'A classic football match between the south and the north',
  user2,
  new Date(1652457600000),
  {
    street: 'C. Sevilla Fútbol Club',
    city: '41005 Sevilla',
  },
  '3',
  false,
  'https://www.udemy.com/course/rust-lang/',
  43883
)

for (let i = 0; i < 23478; i++) {
  meetup3.increaseAttendants()
}

const meetup4 = new Meetup(
  'Kite festival',
  'Classic Kite festival at Gärdet, bring your own kite or just watch the pros',
  user1,
  new Date(1656774000000),
  {
    street: 'Gärdet',
    city: 'Stockholm',
  },
  '4',
  false,
  null,
  null
)

for (let i = 0; i < 126; i++) {
  meetup4.increaseAttendants()
}

const meetup5 = new Meetup(
  'Halloween Street Party',
  'Halloween party in the street, all night long',
  user3,
  new Date(1635703200000),
  {
    street: 'Strandvägen',
    city: 'Stockholm',
  },
  '5',
  false,
  null,
  500
)

for (let i = 0; i < 356; i++) {
  meetup5.increaseAttendants()
}

const meetups = new MeetupBank()

meetups.add(meetup1)
meetups.add(meetup2)
meetups.add(meetup3)
meetups.add(meetup4)
meetups.add(meetup5)

export { users, meetups }
