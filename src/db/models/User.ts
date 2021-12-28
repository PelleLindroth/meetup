import { uid } from 'uid'

export type UserDetails = {
  attending: string[]
  reviewed: string[]
}

type UserDetailsCollection = {
  [key: string]: UserDetails
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  attending: string[]
  reviewed: string[]
}

export class UserImpl implements User {
  firstName: string
  lastName: string
  email: string
  password: string
  attending: string[] = []
  reviewed: string[] = []
  id: string

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    id?: string
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.password = password
    this.id = id || uid()
  }

  saveIdToLocalStorage = () => {
    localStorage.setItem('user', this.id)
  }

  saveDetailsToLocalStorage = () => {
    const storedUserDetails: UserDetailsCollection | null = JSON.parse(
      localStorage.getItem('details')!
    )

    const currentUserDetails = {
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

  addAttending = (meetupId: string) => {
    this.attending.push(meetupId)
  }

  cancelAttending = (meetupId: string) => {
    const index = this.attending.findIndex((id) => id === meetupId)

    this.attending.splice(index, 0)
  }

  addReviewed = (meetupId: string) => {
    this.reviewed.push(meetupId)
  }

  getFullName = (): string => {
    return `${this.firstName} ${this.lastName}`
  }
}

export class UserBank {
  users: UserImpl[]

  constructor() {
    this.users = []
  }

  getById = (id: string): UserImpl | undefined => {
    return this.users.find((user) => user.id === id)
  }

  getAll = () => {
    return this.users
  }

  add = (user: UserImpl) => {
    this.users.push(user)
  }

  validate = (email: string, password: string): UserImpl | null => {
    const user = this.users.find((user) => user.email === email)

    if (user) {
      return user.password === password ? user : null
    } else {
      return null
    }
  }
}
