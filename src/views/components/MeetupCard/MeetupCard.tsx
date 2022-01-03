import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'
import { formatDate } from '../../../utils'
import CloudIcon from '../../../assets/icons/cloud.png'
import TimeIcon from '../../../assets/icons/time.png'
import PinIcon from '../../..//assets/icons/pin.png'
import ArrowIcon from '../../../assets/icons/arrow.png'
import styles from './MeetupCard.module.scss'
import { MeetupCardProps } from './types'

const MeetupCard = (props: MeetupCardProps) => {
  const location = useLocation()
  const { meetup, upcoming } = props

  return (
    <li aria-label="meetup-card" className={styles.cardWrapper}>
      <div
        title={upcoming ? 'upcoming-event-header' : 'past-event-header'}
        style={{ backgroundColor: upcoming ? '#0E81C9' : '#DCDDDE' }}
        className={styles.cardHeader}
      >
        <h2>{meetup.title}</h2>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.leftColumn}>
          <div className={styles.dateRow}>
            <img src={TimeIcon} alt="Time icon" className={styles.icon} />
            <h3 title="date">{formatDate(meetup.date)} CET</h3>
          </div>
          <div className={styles.locationRow}>
            {meetup.online ? (
              <>
                <img src={CloudIcon} alt="Cloud icon" className={styles.icon} />
                <h3 title="location">
                  {location.pathname.match(/^\/profile\/[0-9]$/) ? (
                    <a target="_blank" rel="noreferrer" href={meetup.url!}>
                      {meetup.url}
                    </a>
                  ) : (
                    'Online event'
                  )}
                </h3>
              </>
            ) : (
              <>
                <img src={PinIcon} alt="Map pin icon" className={styles.icon} />
                <h3 title="location">{`${meetup.location?.street}, ${meetup.location?.city}`}</h3>
              </>
            )}
          </div>
          <p title="capacity" className={styles.capacityRow}>
            <strong>Capacity: </strong>
            {meetup.capacity ? (
              <>
                <span>{`${meetup.capacity}, `}</span>
                <span
                  className={
                    meetup.capacity - meetup.attending > 0
                      ? styles.available
                      : styles.unavailable
                  }
                >{`${meetup.capacity - meetup.attending} available`}</span>
              </>
            ) : (
              <span className={styles.available}>Unlimited</span>
            )}
          </p>
        </div>

        <div className={styles.rightColumn}>
          <Link to={`/meetup/${meetup.id}`}>
            <img
              src={ArrowIcon}
              alt="Arrow icon"
              className={styles.arrowIcon}
              title="See meetup details"
            />
          </Link>
        </div>
      </div>
    </li>
  )
}

export default MeetupCard
