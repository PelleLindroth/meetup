import { User } from '../db/models/User'

export type HeaderProps = {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export type SetTimeModalProps = {
  setShowSetTimeModal: React.Dispatch<React.SetStateAction<boolean>>
}

export type ProfileMenuItemProps = {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export type TimeBannerProps = {
  setShowSetTimeModal: React.Dispatch<React.SetStateAction<boolean>>
}
