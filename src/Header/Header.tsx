import { useContext, useState } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { HeaderProps } from './types'
import { DateContext } from '../contexts/DateContext'
import { formatDate } from '../utils'
import DateTimePicker from 'react-datetime-picker'
import SubMenu from './components/SubMenu'
import Logo from '../assets/logo.png'
import TimeIcon from '../assets/icons/time.png'
import UserIcon from '../assets/icons/user.png'
import styles from './Header.module.scss'
import '../views/CreateMeetup/create-meetup.scss'

const Header = (props: HeaderProps) => {
  const { customDate, setCustomDate } = useContext(DateContext)!
  const { user, setUser } = props
  const [date, setDate] = useState<Date>(new Date())
  const [showSetTimeModal, setShowSetTimeModal] = useState<boolean>(false)
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false)
  const location = useLocation()

  const handleSetCustomDate = () => {
    setCustomDate(date)
    setShowSetTimeModal(false)
  }

  return (
    <header className={styles.header}>
      <div className={styles.innerContainer}>
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
        <div
          className={styles.timeButton}
          onClick={() => setShowSetTimeModal(true)}
        >
          <img src={TimeIcon} alt="Time icon" />
          <p>{formatDate(customDate)}</p>
        </div>
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
      {showSetTimeModal && (
        <section className={styles.setTimeModal}>
          <label>Set a custom date and time</label>
          <DateTimePicker
            disableClock={true}
            onChange={setDate}
            value={date!}
            nativeInputAriaLabel="Date"
          />
          <div className={styles.modalButtons}>
            <button
              className={styles.cancelButton}
              type="button"
              onClick={() => setShowSetTimeModal(false)}
            >
              Cancel
            </button>
            <button
              className={styles.mainButton}
              type="button"
              onClick={handleSetCustomDate}
            >
              Set time
            </button>
          </div>
        </section>
      )}
    </header>
  )
}

export default Header
