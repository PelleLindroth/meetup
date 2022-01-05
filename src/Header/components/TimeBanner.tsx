import { useContext } from 'react'
import { formatDate } from '../../utils'
import { DateContext } from '../../contexts/DateContext'
import { TimeBannerProps } from '../types'
import TimeIcon from '../../assets/icons/time-white.png'
import styles from '../Header.module.scss'

const TimeBanner = (props: TimeBannerProps) => {
  const { setShowSetTimeModal } = props
  const { customDate, realDate } = useContext(DateContext)!

  return (
    <div
      className={styles.timeBar}
      onClick={() => setShowSetTimeModal(true)}
      title="Set custom time"
    >
      <div className={styles.innerContainer}>
        <img src={TimeIcon} alt="Time icon" />
        <p>{formatDate(customDate || realDate)}</p>
      </div>
    </div>
  )
}

export default TimeBanner
