import { uid } from 'uid'

export interface IUser {
  id?: string
  firstName: string
  lastName: string
  email: string
  password: string
}
export class User {
  firstName: string
  lastName: string
  email: string
  password: string
  attending: string[] = []
  reviewed: string[] = []
  id: string

  constructor(user: IUser) {
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.email = user.email
    this.password = user.password
    this.id = user.id || uid()
  }

  saveIdToLocalStorage = (): void => {
    localStorage.setItem('user', this.id)
  }

  saveDetailsToLocalStorage = (): void => {
    const storedUserDetails: UserDetailsCollection | null = JSON.parse(
      localStorage.getItem('details')!
    )

    const currentUserDetails: UserDetails = {
      attending: this.attending,
      reviewed: this.reviewed,
    }

    if (storedUserDetails) {
      storedUserDetails[this.id] = currentUserDetails

      localStorage.setItem('details', JSON.stringify(storedUserDetails))
    } else {
      localStorage.setItem(
        'details',
        JSON.stringify({
          [this.id]: currentUserDetails,
        })
      )
    }
  }

  getDetails = (): UserDetails => {
    const userDetails: UserDetailsCollection | null = JSON.parse(
      localStorage.getItem('details')!
    )

    if (userDetails && userDetails[this.id]) {
      return userDetails[this.id]
    } else {
      return {
        attending: this.attending,
        reviewed: this.reviewed,
      }
    }
  }

  addAttending = (meetupId: string): void => {
    this.attending.push(meetupId)
  }

  cancelAttending = (meetupId: string): void => {
    const index = this.attending.findIndex((id) => id === meetupId)

    this.attending.splice(index, 1)
  }

  addReviewed = (meetupId: string): void => {
    this.reviewed.push(meetupId)
  }

  getFullName = (): string => {
    return `${this.firstName} ${this.lastName}`
  }
}

export type UserDetails = {
  attending: string[]
  reviewed: string[]
}

type UserDetailsCollection = {
  [key: string]: UserDetails
}

export class UserBank {
  private users: User[]

  constructor() {
    this.users = []
  }

  getById = (id: string): User | undefined => {
    return this.users.find((user) => user.id === id)
  }

  getAll = (): User[] => {
    return this.users
  }

  add = (user: User): void => {
    this.users.push(user)
  }

  validate = (email: string, password: string): User | null => {
    const user = this.users.find((user) => user.email === email)

    if (user) {
      return user.password === password ? user : null
    } else {
      return null
    }
  }
}
