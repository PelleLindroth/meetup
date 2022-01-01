import DateTimePicker from 'react-datetime-picker'
import { useContext, useState } from 'react'
import { DateContext } from '../../contexts/DateContext'
import { SetTimeModalProps } from '../types'
import styles from '../Header.module.scss'

const SetTimeModal = (props: SetTimeModalProps) => {
  const { setShowSetTimeModal } = props
  const { setCustomDate } = useContext(DateContext)!
  const [date, setDate] = useState<Date>(new Date())

  const handleSetCustomDate = () => {
    setCustomDate(date)
    setShowSetTimeModal(false)
  }

  const handleUseRealTime = () => {
    setCustomDate(null)
    setShowSetTimeModal(false)
  }

  return (
    <section className={styles.setTimeModal}>
      <label>Set a custom date and time</label>
      <div className={styles.pickerWrapper}>
        <DateTimePicker
          className={styles.picker}
          disableClock={true}
          onChange={setDate}
          value={date!}
          nativeInputAriaLabel="Date"
        />
      </div>
      <div className={styles.modalButtons}>
        <button
          className={styles.cancelButton}
          type="button"
          onClick={handleUseRealTime}
        >
          Use real time
        </button>
        <button
          className={styles.mainButton}
          type="button"
          onClick={handleSetCustomDate}
        >
          Set time
        </button>
      </div>
    </section>
  )
}

export default SetTimeModal
