import { useNavigate } from 'react-router'
import styles from '../SingleMeetup.module.scss'

const LoginInfoSection = () => {
  const navigate = useNavigate()

  return (
    <section
      className={styles.loginInfo}
      title="Log in to attend, comment and review Meetups"
    >
      <h3>Log in for a better experience</h3>
      <p>
        Logged in users can register for events, as well as comment and rate
        them!
      </p>
      <button onClick={() => navigate('/login')}>Go to Login page</button>
    </section>
  )
}

export default LoginInfoSection
