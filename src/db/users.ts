import { Meetup } from './meetups'

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  attending: Meetup[]
  attended: Meetup[]
}

export const users: User[] = [
  {
    id: '1',
    firstName: 'Tjalle',
    lastName: 'Bergkvist',
    email: 'tjalle@yahoo.com',
    password: 'grillkorv',
    attending: [],
    attended: [],
  },
  {
    id: '2',
    firstName: 'Kenta',
    lastName: 'Andersson',
    email: 'kenta@yahoo.com',
    password: 'bananpaj',
    attending: [],
    attended: [],
  },
  {
    id: '3',
    firstName: 'Barbro',
    lastName: 'Lundborg',
    email: 'babsan@yahoo.com',
    password: 'password123',
    attending: [],
    attended: [],
  },
  {
    id: '4',
    firstName: 'Janne',
    lastName: 'Karlsson',
    email: 'loffe@yahoo.com',
    password: 'storstark',
    attending: [],
    attended: [],
  },
]
