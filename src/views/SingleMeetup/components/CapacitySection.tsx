import HouseIcon from '../../../assets/icons/house.png'
import UserGroupIcon from '../../../assets/icons/user-group.png'
import { CapacitySectionProps } from '../types'
import styles from '../SingleMeetup.module.scss'

const CapacitySection = (props: CapacitySectionProps) => {
  const { meetup, isUpcomingEvent } = props
  return (
    <section className={styles.capacity}>
      {isUpcomingEvent && (
        <div className={styles.headerRow}>
          <img src={HouseIcon} alt="House icon" />
          <p className={styles.capacityInfo}>
            <strong>Capacity: </strong>
            {meetup.capacity
              ? meetup.capacity
              : meetup.online
              ? 'This is an online event with unlimited capacity'
              : 'This event has unlimited capacity'}
          </p>
        </div>
      )}
      <div className={styles.capacityInfo}>
        {meetup.capacity ? (
          <div className={styles.attendedRow}>
            <img src={UserGroupIcon} alt="User group icon" />
            {isUpcomingEvent ? (
              <p>
                <strong>Attending: </strong> {` ${meetup.attending}, `}
                <span className={styles.available}>
                  <em>{` ${meetup.capacity - meetup.attending} available`}</em>
                </span>
              </p>
            ) : (
              `${meetup.attending} people attended this event`
            )}
          </div>
        ) : (
          <div className={styles.attendedRow}>
            <img src={UserGroupIcon} alt="User group icon" />
            {isUpcomingEvent ? (
              <p>
                <strong>{'Attending: '}</strong> {` ${meetup.attending}`}
              </p>
            ) : (
              `${meetup.attending} people attended this event`
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default CapacitySection
