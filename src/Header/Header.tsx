import { useContext, useState } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { HeaderProps } from './types'
import { DateContext } from '../contexts/DateContext'
import { formatDate } from '../utils'
import SubMenu from './components/SubMenu'
import SetTimeModal from './components/SetTimeModal'
import Logo from '../assets/logo.png'
import TimeIcon from '../assets/icons/time-white.png'
import UserIcon from '../assets/icons/user.png'
import styles from './Header.module.scss'
import '../views/CreateMeetup/create-meetup.scss'

const Header = (props: HeaderProps) => {
  const { customDate } = useContext(DateContext)!
  const { user, setUser } = props
  const [showSetTimeModal, setShowSetTimeModal] = useState<boolean>(false)
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
            <p>{`${user.getFullName()}`}</p>
            {showProfileMenu && <SubMenu user={user} setUser={setUser} />}
          </div>
        )}
      </div>
      {location.pathname === '/' && (
        <div
          className={styles.timeBar}
          onClick={() => setShowSetTimeModal(true)}
          title="Set custom time"
        >
          <div className={styles.innerContainer}>
            <img src={TimeIcon} alt="Time icon" />
            <p>{formatDate(customDate)}</p>
          </div>
        </div>
      )}
      {showSetTimeModal && location.pathname === '/' && (
        <SetTimeModal setShowSetTimeModal={setShowSetTimeModal} />
      )}
    </header>
  )
}

export default Header
