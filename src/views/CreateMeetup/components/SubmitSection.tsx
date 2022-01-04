import { SubmitSectionProps } from '../types'
import styles from '../CreateMeetup.module.scss'

const SubmitSection = (props: SubmitSectionProps) => {
  const { handleCancel, emptyFields } = props

  return (
    <section className={styles.buttons}>
      <button
        className={styles.cancelButton}
        onClick={handleCancel}
        type="button"
      >
        Cancel
      </button>
      <button className={styles.mainButton} disabled={emptyFields()}>
        Create
      </button>
    </section>
  )
}

export default SubmitSection
