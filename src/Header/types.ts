import { UserImpl } from '../db/models/User'

export type HeaderProps = {
  user: UserImpl | null
  setUser: React.Dispatch<React.SetStateAction<UserImpl | null>>
}
