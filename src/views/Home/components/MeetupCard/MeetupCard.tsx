import { Link } from 'react-router-dom'
import Cloud from '../../../../assets/icons/cloud.png'
import Time from '../../../../assets/icons/time.png'
import Pin from '../../../../assets/icons/pin.png'
import Arrow from '../../../../assets/icons/arrow.png'
import styles from './MeetupCard.module.scss'
import { MeetupCardProps } from './types'

const MeetupCard = (props: MeetupCardProps) => {
  const { meetup, upcoming } = props

  return (
    <li className={styles.cardWrapper}>
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
            <img src={Time} alt="Time icon" className={styles.icon} />
            <h3 title="date">
              {new Intl.DateTimeFormat('en-GB', {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
                hour: 'numeric',
                minute: 'numeric',
              }).format(meetup.date)}{' '}
              CET
            </h3>
          </div>
          <div className={styles.locationRow}>
            {meetup.online ? (
              <>
                <img src={Cloud} alt="Cloud icon" className={styles.icon} />
                <h3 title="location">Online event</h3>
              </>
            ) : (
              <>
                <img src={Pin} alt="Map pin icon" className={styles.icon} />
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
              src={Arrow}
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
