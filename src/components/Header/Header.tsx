import { Link } from 'react-router-dom'
import headerStyles from './Header.module.scss'
import Logo from '../../assets/logo.png'
import { useLocation } from 'react-router'
const Header = () => {
  const location = useLocation()

  return (
    <header className={headerStyles.header}>
      <Link to="/">
        <img src={Logo} alt="logo" />
      </Link>
      {location.pathname !== '/login' && (
        <Link to="/login">
          <button className={headerStyles.loginButton}>Log in</button>
        </Link>
      )}
    </header>
  )
}

export default Header
