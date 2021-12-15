import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import { useLocation } from 'react-router'
import { User } from '../../db/users'
import UserIcon from '../../assets/icons/user.png'
import { useState } from 'react'
import styles from './Header.module.scss'

type HeaderProps = {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const Header = (props: HeaderProps) => {
  const { user, setUser } = props
  const location = useLocation()
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false)

  const handleLogout = () => {
    setUser(null)
  }

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
        {user && location.pathname !== `/profile/${user.id}` && (
          <div
            className={styles.profileWrapper}
            title="Profile menu"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <img src={UserIcon} alt="User profile icon" />
            <p>{`${user.firstName} ${user.lastName}`}</p>
            {showProfileMenu && (
              <nav className={styles.profileMenu}>
                <Link
                  className={styles.viewProfileButton}
                  to={`/profile/${user!.id}`}
                >
                  View profile
                </Link>
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Log out
                </button>
              </nav>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header