export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  attending: string[]
  attended: string[]
  reviewed: string[]
}

export const users: User[] = [
  {
    id: '1',
    firstName: 'Tjalle',
    lastName: 'Bergkvist',
    email: 'tjalle@yahoo.com',
    password: 'grillkorv',
    attending: ['2'],
    attended: ['1'],
    reviewed: ['1'],
  },
  {
    id: '2',
    firstName: 'Kenta',
    lastName: 'Andersson',
    email: 'kenta@yahoo.com',
    password: 'bananpaj',
    attending: [],
    attended: ['1'],
    reviewed: ['1'],
  },
  {
    id: '3',
    firstName: 'Barbro',
    lastName: 'Lundborg',
    email: 'babsan@yahoo.com',
    password: 'password123',
    attending: [],
    attended: [],
    reviewed: [],
  },
  {
    id: '4',
    firstName: 'Janne',
    lastName: 'Karlsson',
    email: 'loffe@yahoo.com',
    password: 'storstark',
    attending: [],
    attended: ['1'],
    reviewed: [],
  },
]
