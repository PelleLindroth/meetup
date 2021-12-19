export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  attending: string[]
  reviewed: string[]
}

export const users: User[] = [
  {
    id: '1',
    firstName: 'Tjalle',
    lastName: 'Bergkvist',
    email: 'tjalle@yahoo.com',
    password: 'grillkorv',
    attending: ['1', '2'],
    reviewed: ['1'],
  },
  {
    id: '2',
    firstName: 'Kenta',
    lastName: 'Andersson',
    email: 'kenta@yahoo.com',
    password: 'bananpaj',
    attending: ['1'],
    reviewed: ['1'],
  },
  {
    id: '3',
    firstName: 'Barbro',
    lastName: 'Lundborg',
    email: 'babsan@yahoo.com',
    password: 'password123',
    attending: [],
    reviewed: [],
  },
  {
    id: '4',
    firstName: 'Janne',
    lastName: 'Karlsson',
    email: 'loffe@yahoo.com',
    password: 'storstark',
    attending: ['1'],
    reviewed: [],
  },
]
