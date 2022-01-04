import { CapacitySectionProps } from '../types'
import styles from '../CreateMeetup.module.scss'

const CapacitySection = (props: CapacitySectionProps) => {
  const { maxCapacity, setMaxCapacity, hasMaxCapacity, setHasMaxCapacity } =
    props
  return (
    <section className={styles.capacityArea}>
      <div className={styles.checkboxRow}>
        <label>
          <input
            checked={hasMaxCapacity}
            onChange={() => setHasMaxCapacity(!hasMaxCapacity)}
            name="capacity-true"
            type="checkbox"
          />
          Max capacity
        </label>
      </div>
      {hasMaxCapacity ? (
        <div className={styles.inputRow}>
          <label htmlFor="max-capacity">Maximum number of attendants</label>
          <input
            value={maxCapacity}
            onChange={(e) => setMaxCapacity(+e.currentTarget.value)}
            aria-label="capacity-input"
            id="max-capacity"
            type="number"
            pattern="[0-9]*"
            min={0}
          />
        </div>
      ) : (
        <p>
          <strong>This meetup has unlimited capacity</strong>
        </p>
      )}
    </section>
  )
}

export default CapacitySection
