import { User } from '../db/users'

export type HeaderProps = {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}
