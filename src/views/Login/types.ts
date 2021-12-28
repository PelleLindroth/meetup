import { UserImpl } from '../../db/models/User'

export type LoginProps = {
  setUser: React.Dispatch<React.SetStateAction<UserImpl | null>>
}
