import { useState } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { HeaderProps } from './types'
import SubMenu from './components/SubMenu'
import Logo from '../assets/logo.png'
import UserIcon from '../assets/icons/user.png'
import styles from './Header.module.scss'

const Header = (props: HeaderProps) => {
  const { user, setUser } = props
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false)
  const location = useLocation()

  return (
    <header className={styles.header}>
      <div className={styles.innerContainer}>
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
        {location.pathname !== '/login' && !user && (
          <Link to="/login">
            <button className={styles.loginButton}>Log in</button>
          </Link>
        )}
        {user && (
          <div
            className={styles.profileWrapper}
            title="Profile menu"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <img src={UserIcon} alt="User profile icon" />
            <p>{`${user.firstName} ${user.lastName}`}</p>
            {showProfileMenu && <SubMenu user={user} setUser={setUser} />}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
