import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { HeaderProps } from '../types'
import { clearStoredUser } from '../../db'
import styles from '../Header.module.scss'

const SubMenu = (props: HeaderProps) => {
  const { user, setUser } = props
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    clearStoredUser()
    navigate('/', { replace: true })
  }

  return (
    <nav className={styles.profileMenu}>
      {location.pathname !== `/profile/${user!.id}` && (
        <Link className={styles.linkButton} to={`/profile/${user!.id}`}>
          View profile
        </Link>
      )}
      {location.pathname !== '/create' && (
        <Link className={styles.linkButton} to={'/create'}>
          Create meetup
        </Link>
      )}

      <button onClick={handleLogout} className={styles.logoutButton}>
        Log out
      </button>
    </nav>
  )
}

export default SubMenu
