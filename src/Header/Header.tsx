import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { User } from '../db/users'
import Logo from '../assets/logo.png'
import UserIcon from '../assets/icons/user.png'
import styles from './Header.module.scss'

type HeaderProps = {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const Header = (props: HeaderProps) => {
  const { user, setUser } = props
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    navigate('/', { replace: true })
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
        {user && (
          <div
            className={styles.profileWrapper}
            title="Profile menu"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <img src={UserIcon} alt="User profile icon" />
            <p>{`${user.firstName} ${user.lastName}`}</p>
            {showProfileMenu && (
              <nav className={styles.profileMenu}>
                {location.pathname !== `/profile/${user.id}` && (
                  <Link
                    className={styles.viewProfileButton}
                    to={`/profile/${user!.id}`}
                  >
                    View profile
                  </Link>
                )}
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
