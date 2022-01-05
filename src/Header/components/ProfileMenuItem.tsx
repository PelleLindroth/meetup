import { useState } from 'react'
import SubMenu from './SubMenu'
import UserIcon from '../../assets/icons/user.png'
import { ProfileMenuItemProps } from '../types'
import styles from '../Header.module.scss'

const ProfileMenuItem = (props: ProfileMenuItemProps) => {
  const { user, setUser } = props
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false)

  return (
    <div
      className={styles.profileWrapper}
      title="Profile menu"
      onClick={() => setShowProfileMenu(!showProfileMenu)}
    >
      <img src={UserIcon} alt="User profile icon" />
      <p>{`${user.getFullName()}`}</p>
      {showProfileMenu && <SubMenu user={user} setUser={setUser} />}
    </div>
  )
}

export default ProfileMenuItem
