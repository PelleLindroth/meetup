import UserIcon from '../../../assets/icons/user.png'
import { ArrangerSectionprops } from '../types'
import styles from '../SingleMeetup.module.scss'

const ArrangerSection = (props: ArrangerSectionprops) => {
  const { meetup } = props
  return (
    <section className={styles.arranger}>
      <div className={styles.headerRow}>
        <img src={UserIcon} alt="User icon" />
        <h3>Arranger:</h3>
      </div>
      <p>{`${meetup.arranger.firstName} ${meetup.arranger.lastName}`}</p>
      <p>Email: {meetup.arranger.email}</p>
    </section>
  )
}

export default ArrangerSection
