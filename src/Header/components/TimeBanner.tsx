import { useContext } from 'react'
import { DateContext } from '../../contexts/DateContext'
import TimeIcon from '../../assets/icons/time-white.png'
import { formatDate } from '../../utils'
import styles from '../Header.module.scss'

type TimeBannerProps = {
  setShowSetTimeModal: React.Dispatch<React.SetStateAction<boolean>>
}

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
