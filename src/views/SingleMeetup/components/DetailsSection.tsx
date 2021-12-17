import { DetailsSectionProps } from '../types'
import { formatDate } from '../../../utils'
import PinIcon from '../../../assets/icons/pin.png'
import TimeIcon from '../../../assets/icons/time.png'
import styles from '../SingleMeetup.module.scss'

const DetailsSection = (props: DetailsSectionProps) => {
  const { meetup, isUpcomingEvent } = props

  return (
    <section id="meetup-details" className={styles.details}>
      <div title="location" className={styles.headerRow}>
        <img src={PinIcon} alt="Map pin icon" />
        <p>
          {meetup.online
            ? 'Online event'
            : `${meetup!.location!.street}, ${meetup!.location!.city}`}
        </p>
      </div>
      <div title="date" className={styles.headerRow}>
        <img src={TimeIcon} alt="Time icon" />
        <p>
          {formatDate(meetup.date)}{' '}
          {!isUpcomingEvent && (
            <em className={styles.note}>(Event already took place)</em>
          )}
        </p>
      </div>
    </section>
  )
}

export default DetailsSection
