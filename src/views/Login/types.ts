import { User } from '../../db/models/User'

export type LoginProps = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}
