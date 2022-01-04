import { useContext } from 'react'
import { DateContext } from '../../../contexts/DateContext'
import DateTimePicker from 'react-datetime-picker'
import { DetailsSectionProps } from '../types'
import styles from '../CreateMeetup.module.scss'

const DetailsSection = (props: DetailsSectionProps) => {
  const { title, setTitle, description, setDescription, date, setDate } = props
  const { customDate, realDate } = useContext(DateContext)!

  return (
    <section className={styles.detailsArea}>
      <div className={styles.inputRow}>
        <label htmlFor="title">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          maxLength={30}
          className={`${styles.textInput} ${styles.titleInput}`}
          id="title"
          type="text"
        />
      </div>
      <div className={styles.inputRow}>
        <label htmlFor="description">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          maxLength={75}
          className={styles.textInput}
          id="description"
        />
      </div>
      <div className={styles.inputRow}>
        <label>Date</label>
        <DateTimePicker
          disableClock={true}
          minDate={customDate || realDate}
          onChange={setDate}
          value={date!}
          nativeInputAriaLabel="Date"
        />
      </div>
    </section>
  )
}

export default DetailsSection
