import { UserBank, User } from './models/User'

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

export { users }
