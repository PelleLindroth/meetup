import { useParams } from 'react-router'
import { getUserById } from '../../db'
import styles from './Profile.module.scss'

const Profile = () => {
  const { id } = useParams()
  const user = getUserById(id!)

  return <div className={styles.profile}>{`Welcome ${user?.firstName}!`}</div>
}

export default Profile
