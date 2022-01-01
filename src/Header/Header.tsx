import { useState } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { HeaderProps } from './types'
import ProfileMenuItem from './components/ProfileMenuItem'
import TimeBanner from './components/TimeBanner'
import SetTimeModal from './components/SetTimeModal'
import Logo from '../assets/logo.png'
import styles from './Header.module.scss'
import '../views/CreateMeetup/create-meetup.scss'

const Header = (props: HeaderProps) => {
  const { user, setUser } = props
  const [showSetTimeModal, setShowSetTimeModal] = useState<boolean>(false)
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
        {user && <ProfileMenuItem user={user} setUser={setUser} />}
      </div>
      {location.pathname === '/' && (
        <TimeBanner setShowSetTimeModal={setShowSetTimeModal} />
      )}
      {showSetTimeModal && location.pathname === '/' && (
        <SetTimeModal setShowSetTimeModal={setShowSetTimeModal} />
      )}
    </header>
  )
}

export default Header
